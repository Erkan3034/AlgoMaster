// Translation service using MyMemory Translation API (free, no API key required)
// Alternative: LibreTranslate, but it may have CORS issues
// MyMemory: 10,000 characters/day free tier

const MYMEMORY_API = "https://api.mymemory.translated.net/get";
const CACHE_PREFIX = "translation_cache_";
const CACHE_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days

// Rate limiting: max 1 concurrent request, 2000ms delay between requests
// Very conservative settings to avoid hitting MyMemory's 10k chars/day free tier limit
const MAX_CONCURRENT = 1;
const REQUEST_DELAY = 2000; // ms between requests (2 seconds)
const RATE_LIMIT_FLAG_KEY = "translation_rate_limit_hit";
const RATE_LIMIT_FLAG_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

let activeRequests = 0;
let rateLimitHit = false; // Flag to stop making requests when 429 is received

// Check if rate limit was hit (persisted in localStorage)
function checkRateLimitFlag(): boolean {
  if (typeof window === "undefined") return false;
  const flagData = localStorage.getItem(RATE_LIMIT_FLAG_KEY);
  if (!flagData) return false;
  
  try {
    const { timestamp } = JSON.parse(flagData);
    const now = Date.now();
    // If flag is older than 24 hours, remove it
    if (now - timestamp > RATE_LIMIT_FLAG_EXPIRY) {
      localStorage.removeItem(RATE_LIMIT_FLAG_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Set rate limit flag in localStorage
function setRateLimitFlag(): void {
  if (typeof window === "undefined") return;
  const flagData = {
    timestamp: Date.now(),
  };
  localStorage.setItem(RATE_LIMIT_FLAG_KEY, JSON.stringify(flagData));
}

// Initialize rate limit flag on module load
if (typeof window !== "undefined") {
  rateLimitHit = checkRateLimitFlag();
}
const requestQueue: Array<{
  resolve: (value: string) => void;
  reject: (error: Error) => void;
  text: string;
  from: string;
  to: string;
}> = [];

// Process request queue with rate limiting
async function processQueue() {
  // If rate limit was hit, cancel all remaining requests
  if (rateLimitHit) {
    while (requestQueue.length > 0) {
      const request = requestQueue.shift();
      if (request) {
        request.resolve(request.text); // Return original text
      }
    }
    return;
  }

  if (activeRequests >= MAX_CONCURRENT || requestQueue.length === 0) {
    return;
  }

  const request = requestQueue.shift();
  if (!request) return;

  activeRequests++;
  try {
    const translated = await translateTextDirect(request.text, request.from, request.to);
    request.resolve(translated);
  } catch (error) {
    // On rate limit (429), set flag and cancel all remaining requests
    if (error instanceof Error && error.message.includes("429")) {
      console.warn(
        "⚠️ MyMemory Translation API günlük limiti (10,000 karakter) aşıldı. " +
        "Limit 24 saat sonra sıfırlanacak. Şu an İngilizce metinler gösteriliyor."
      );
      rateLimitHit = true;
      setRateLimitFlag(); // Persist the flag
      // Cancel all remaining requests in queue
      while (requestQueue.length > 0) {
        const queuedRequest = requestQueue.shift();
        if (queuedRequest) {
          queuedRequest.resolve(queuedRequest.text);
        }
      }
    }
    request.resolve(request.text); // Return original text on error
  } finally {
    activeRequests--;
    // Only continue processing if rate limit wasn't hit
    if (!rateLimitHit) {
      setTimeout(() => processQueue(), REQUEST_DELAY);
    }
  }
}

interface TranslationCache {
  text: string;
  translated: string;
  timestamp: number;
}

// Get cached translation
function getCachedTranslation(text: string, from: string, to: string): string | null {
  if (typeof window === "undefined") return null;
  
  const cacheKey = `${CACHE_PREFIX}${from}_${to}_${hashString(text)}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (!cached) return null;
  
  try {
    const data: TranslationCache = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is expired
    if (now - data.timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    return data.translated;
  } catch {
    return null;
  }
}

// Cache translation
function cacheTranslation(text: string, translated: string, from: string, to: string): void {
  if (typeof window === "undefined") return;
  
  const cacheKey = `${CACHE_PREFIX}${from}_${to}_${hashString(text)}`;
  const data: TranslationCache = {
    text,
    translated,
    timestamp: Date.now(),
  };
  
  try {
    localStorage.setItem(cacheKey, JSON.stringify(data));
  } catch (e) {
    // localStorage might be full, try to clear old entries
    if (e instanceof DOMException && e.name === "QuotaExceededError") {
      clearOldCacheEntries();
      try {
        localStorage.setItem(cacheKey, JSON.stringify(data));
      } catch {
        // Still failing, skip caching
      }
    }
  }
}

// Clear old cache entries (keep last 1000)
function clearOldCacheEntries(): void {
  if (typeof window === "undefined") return;
  
  const keys = Object.keys(localStorage).filter((key) =>
    key.startsWith(CACHE_PREFIX)
  );
  
  if (keys.length > 1000) {
    // Sort by timestamp and remove oldest
    const entries = keys
      .map((key) => {
        const item = localStorage.getItem(key);
        if (!item) return null;
        try {
          const data: TranslationCache = JSON.parse(item);
          return { key, timestamp: data.timestamp };
        } catch {
          return { key, timestamp: 0 };
        }
      })
      .filter((e): e is { key: string; timestamp: number } => e !== null)
      .sort((a, b) => a.timestamp - b.timestamp);
    
    // Remove oldest 500 entries
    entries.slice(0, 500).forEach((entry) => {
      localStorage.removeItem(entry.key);
    });
  }
}

// Simple string hash function
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

// Direct translation (used by queue processor)
async function translateTextDirect(
  text: string,
  from: string = "en",
  to: string = "tr"
): Promise<string> {
  // MyMemory Translation API (free, no API key, supports CORS)
  const response = await fetch(
    `${MYMEMORY_API}?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
  );
  
  if (!response.ok) {
    // Check if it's a rate limit error (429)
    if (response.status === 429) {
      // Try to get more info from response
      let errorMessage = "429 Too Many Requests";
      try {
        const errorData = await response.json().catch(() => null);
        if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // If response body can't be parsed, use default message
      }
      
      // Check for Retry-After header to know when to retry
      const retryAfter = response.headers.get("Retry-After");
      if (retryAfter) {
        const hours = Math.ceil(parseInt(retryAfter) / 3600);
        console.warn(
          `MyMemory API rate limit exceeded (10,000 chars/day). ` +
          `Please wait ${hours} hour(s) or use cached translations.`
        );
      } else {
        console.warn(
          `MyMemory API daily limit (10,000 characters) exceeded. ` +
          `Limit resets in 24 hours. Using original text for now.`
        );
      }
      
      throw new Error(`Translation API error: 429`);
    }
    
    throw new Error(`Translation API error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // MyMemory returns translatedText in responseData
  const translated = data.responseData?.translatedText || text;
  
  // Check if translation is successful (MyMemory returns original text if translation fails)
  if (translated === text && data.responseData?.match !== 100) {
    // Translation might have failed, but use it anyway
    console.warn("Translation may have failed, match score:", data.responseData?.match);
  }
  
  // Cache the translation
  cacheTranslation(text, translated, from, to);
  
  return translated;
}

// Translate text using rate-limited queue
export async function translateText(
  text: string,
  from: string = "en",
  to: string = "tr"
): Promise<string> {
  // Empty or very short text doesn't need translation
  if (!text || text.trim().length === 0) return text;
  
  // Skip translation if source and target are the same
  if (from === to) return text;
  
  // If rate limit was hit, return original text immediately (skip cache check to avoid delays)
  if (rateLimitHit) {
    return text;
  }
  
  // Check cache first
  const cached = getCachedTranslation(text, from, to);
  if (cached) return cached;
  
  // Use rate-limited queue for API requests
  // The queue processor handles errors gracefully by returning original text
  return new Promise<string>((resolve) => {
    requestQueue.push({ 
      resolve, 
      reject: () => {}, // Not used since we always resolve with original text on error
      text, 
      from, 
      to 
    });
    processQueue();
  });
}

// Translate an object's string fields recursively
export async function translateObject<T extends Record<string, any>>(
  obj: T,
  from: string = "en",
  to: string = "tr",
  fieldsToTranslate?: (keyof T)[]
): Promise<T> {
  const result = { ...obj } as T;
  
  // If specific fields are provided, only translate those
  const fields = fieldsToTranslate || Object.keys(obj);
  
  const translationPromises: Promise<void>[] = [];
  
  for (const key of fields) {
    const value = obj[key];
    
    if (typeof value === "string" && value.trim().length > 0) {
      translationPromises.push(
        translateText(value, from, to).then((translated) => {
          result[key] = translated as T[keyof T];
        })
      );
    } else if (Array.isArray(value) && value.length > 0) {
      // Translate array of strings
      translationPromises.push(
        Promise.all(
          value.map((item: unknown) =>
            typeof item === "string"
              ? translateText(item, from, to)
              : Promise.resolve(item)
          )
        ).then((translated) => {
          result[key] = translated as T[keyof T];
        })
      );
    }
  }
  
  await Promise.all(translationPromises);
  return result;
}

// Batch translate multiple texts (more efficient)
export async function translateBatch(
  texts: string[],
  from: string = "en",
  to: string = "tr"
): Promise<string[]> {
  // Check cache for all texts first
  const cached: (string | null)[] = texts.map((text) =>
    getCachedTranslation(text, from, to)
  );
  
  // Find texts that need translation
  const toTranslate: { index: number; text: string }[] = [];
  cached.forEach((cachedText, index) => {
    if (!cachedText) {
      toTranslate.push({ index, text: texts[index] });
    }
  });
  
  // If all are cached, return cached results
  if (toTranslate.length === 0) {
    return cached as string[];
  }
  
  // Translate missing texts
  const translated = await Promise.all(
    toTranslate.map(({ text }) => translateText(text, from, to))
  );
  
  // Rebuild the array with correct order: use cached when available, otherwise use translated
  const finalResult: string[] = texts.map((text, index) => {
    const cachedText = cached[index];
    if (cachedText) return cachedText;
    const translateIndex = toTranslate.findIndex((t) => t.index === index);
    if (translateIndex >= 0) return translated[translateIndex];
    return text; // Fallback (shouldn't happen)
  });
  
  return finalResult;
}

