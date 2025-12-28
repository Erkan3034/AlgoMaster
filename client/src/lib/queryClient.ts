import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { supabase, isSupabaseConfigured } from "./supabase";
// Fallback to static data when Supabase is not configured
import { dataStructures, algorithms, glossaryTerms, faqItems } from "@shared/schema";
import { translateObject, translateBatch } from "./translation";

// Get current language from localStorage
function getCurrentLanguage(): "en" | "tr" {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("dsa-master-language");
  if (saved === "en" || saved === "tr") {
    return saved;
  }
  const browserLang = navigator.language.slice(0, 2);
  return browserLang === "tr" ? "tr" : "en";
}

// Transform database rows to frontend types with translation support
async function transformDataStructure(row: any) {
  const base = {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    icon: row.icon,
    complexity: row.complexity,
    definition: row.definition,
    useCases: row.use_cases || [],
    pros: row.pros || [],
    cons: row.cons || [],
    visualExplanation: row.visual_explanation || "",
    codeExample: row.code_example || "",
    experimentScenario: row.experiment_scenario || "",
  };
  
  // Translate if Turkish is selected
  const lang = getCurrentLanguage();
  if (lang === "tr") {
    return await translateObject(base, "en", "tr", [
      "name",
      "description",
      "definition",
      "useCases",
      "pros",
      "cons",
      "visualExplanation",
      "codeExample",
      "experimentScenario",
    ]);
  }
  
  return base;
}

async function transformAlgorithm(row: any) {
  const base = {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    icon: row.icon,
    category: row.category,
    timeComplexity: row.time_complexity,
    spaceComplexity: row.space_complexity,
    definition: row.definition,
    steps: row.steps || [],
    visualDiagram: row.visual_diagram || "",
    inputOutputExamples: row.input_output_examples || [],
    codeImplementation: row.code_implementation || "",
  };
  
  const lang = getCurrentLanguage();
  if (lang === "tr") {
    return await translateObject(base, "en", "tr", [
      "name",
      "description",
      "definition",
      "steps",
      "visualDiagram",
      "codeImplementation",
    ]);
  }
  
  return base;
}

async function transformGlossaryTerm(row: any) {
  const base = {
    id: row.id,
    term: row.term,
    definition: row.definition,
    relatedTerms: row.related_terms || [],
    category: row.category,
  };
  
  const lang = getCurrentLanguage();
  if (lang === "tr") {
    return await translateObject(base, "en", "tr", [
      "term",
      "definition",
      "relatedTerms",
    ]);
  }
  
  return base;
}

async function transformFAQItem(row: any) {
  const base = {
    id: row.id,
    question: row.question,
    answer: row.answer,
    category: row.category,
  };
  
  const lang = getCurrentLanguage();
  if (lang === "tr") {
    return await translateObject(base, "en", "tr", [
      "question",
      "answer",
    ]);
  }
  
  return base;
}

// Query function that uses Supabase or falls back to static data
const queryFn: QueryFunction = async ({ queryKey }) => {
  const [path, slug] = queryKey as [string, string?];

  // If Supabase is configured, use it
  if (isSupabaseConfigured && supabase) {
    // Data Structures
    if (path === "/api/data-structures" && !slug) {
      const { data, error } = await supabase
        .from("data_structures")
        .select("*")
        .order("name");
      if (error) throw error;
      return Promise.all(data.map(transformDataStructure));
    }

    if (path === "/api/data-structures" && slug) {
      const { data, error } = await supabase
        .from("data_structures")
        .select("*")
        .eq("slug" as any, slug)
        .single();
      if (error) throw error;
      return transformDataStructure(data);
    }

    // Algorithms
    if (path === "/api/algorithms" && !slug) {
      const { data, error } = await supabase
        .from("algorithms")
        .select("*")
        .order("name");
      if (error) throw error;
      return Promise.all(data.map(transformAlgorithm));
    }

    if (path === "/api/algorithms" && slug) {
      const { data, error } = await supabase
        .from("algorithms")
        .select("*")
        .eq("slug" as any, slug)
        .single();
      if (error) throw error;
      return transformAlgorithm(data);
    }

    // Glossary
    if (path === "/api/glossary") {
      const { data, error } = await supabase
        .from("glossary_terms")
        .select("*")
        .order("term");
      if (error) throw error;
      return Promise.all(data.map(transformGlossaryTerm));
    }

    // FAQ
    if (path === "/api/faq") {
      const { data, error } = await supabase
        .from("faq_items")
        .select("*")
        .order("category");
      if (error) throw error;
      return Promise.all(data.map(transformFAQItem));
    }
  }

  // Fallback to static data
  console.log("Using static data for:", path, slug);
  
  const lang = getCurrentLanguage();

  // Data Structures
  if (path === "/api/data-structures" && !slug) {
    if (lang === "tr") {
      return Promise.all(dataStructures.map((ds) => transformDataStructure(ds as any)));
    }
    return dataStructures;
  }
  if (path === "/api/data-structures" && slug) {
    const ds = dataStructures.find((d) => d.slug === slug);
    if (!ds) throw new Error("Data structure not found");
    if (lang === "tr") {
      return transformDataStructure(ds as any);
    }
    return ds;
  }

  // Algorithms
  if (path === "/api/algorithms" && !slug) {
    if (lang === "tr") {
      return Promise.all(algorithms.map((alg) => transformAlgorithm(alg as any)));
    }
    return algorithms;
  }
  if (path === "/api/algorithms" && slug) {
    const alg = algorithms.find((a) => a.slug === slug);
    if (!alg) throw new Error("Algorithm not found");
    if (lang === "tr") {
      return transformAlgorithm(alg as any);
    }
    return alg;
  }

  // Glossary
  if (path === "/api/glossary") {
    if (lang === "tr") {
      return Promise.all(glossaryTerms.map((term) => transformGlossaryTerm(term as any)));
    }
    return glossaryTerms;
  }

  // FAQ
  if (path === "/api/faq") {
    if (lang === "tr") {
      return Promise.all(faqItems.map((item) => transformFAQItem(item as any)));
    }
    return faqItems;
  }

  throw new Error(`Unknown endpoint: ${path}`);
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Export static data for direct imports (navigation search, etc.)
export const staticData = {
  dataStructures,
  algorithms,
  glossaryTerms,
  faqItems,
};
