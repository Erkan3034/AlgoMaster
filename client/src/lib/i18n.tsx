import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Language = "en" | "tr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.dataStructures": "Data Structures",
    "nav.algorithms": "Algorithms",
    "nav.visualizer": "Visualizer",
    "nav.playground": "Playground",
    "nav.glossary": "Glossary",
    "nav.search": "Search",
    "nav.toggleTheme": "Toggle theme",
    "nav.toggleLanguage": "Toggle language",
    "nav.searchTitle": "Search DSA Master",
    "nav.searchPlaceholder": "Search data structures & algorithms...",
    "nav.noResults": "No results found for",
    "nav.dataStructure": "Data Structure",
    "nav.algorithm": "Algorithm",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "lang.english": "English",
    "lang.turkish": "Turkce",

    "home.badge": "Interactive Learning Platform",
    "home.title": "Master",
    "home.titleHighlight1": "Data Structures",
    "home.titleAnd": "&",
    "home.titleHighlight2": "Algorithms",
    "home.description":
      "Learn DSA interactively with visualizations, step-by-step explanations, and hands-on code examples. From arrays to graphs, from bubble sort to DFS.",
    "home.startLearning": "Start Learning",
    "home.tryVisualizer": "Try Visualizer",
    "home.dataStructuresCount": "14 Data Structures",
    "home.algorithmsCount": "13 Algorithms",
    "home.interactiveVisualizers": "Interactive Visualizers",

    "home.features.title": "Everything You Need to Master DSA",
    "home.features.subtitle":
      "A comprehensive platform designed to make learning data structures and algorithms intuitive and engaging.",
    "home.features.dataStructures.title": "Data Structures",
    "home.features.dataStructures.description":
      "Learn fundamental data structures with visual explanations and real-world applications.",
    "home.features.algorithms.title": "Algorithms",
    "home.features.algorithms.description":
      "Master sorting, searching, and graph algorithms with step-by-step breakdowns.",
    "home.features.visualizer.title": "Visual Learning",
    "home.features.visualizer.description":
      "Watch algorithms in action with interactive visualizations and animations.",
    "home.features.playground.title": "Code Playground",
    "home.features.playground.description":
      "Practice writing code and experiment with different approaches in real-time.",
    "home.features.complexity.title": "Complexity Analysis",
    "home.features.complexity.description":
      "Understand time and space complexity with clear explanations and comparisons.",
    "home.features.glossary.title": "Glossary",
    "home.features.glossary.description":
      "Quick reference for DSA terminology and concepts.",

    "home.cta.title": "Ready to Start Learning?",
    "home.cta.description":
      "Begin your journey to mastering data structures and algorithms today.",
    "home.cta.button": "Get Started",

    "dataStructures.title": "Data Structures",
    "dataStructures.description":
      "Data structures are specialized formats for organizing, processing, and storing data. Understanding them is essential for writing efficient programs and solving complex problems.",
    "dataStructures.access": "Access",
    "dataStructures.search": "Search",
    "dataStructures.insert": "Insert",
    "dataStructures.delete": "Delete",

    "algorithms.title": "Algorithms",
    "algorithms.description":
      "Algorithms are step-by-step procedures for solving problems and performing computations. Master these fundamental algorithms to become a better programmer.",
    "algorithms.all": "All",
    "algorithms.sorting": "Sorting",
    "algorithms.searching": "Searching",
    "algorithms.graph": "Graph",
    "algorithms.time": "Time",
    "algorithms.space": "Space",
    "algorithms.best": "Best",
    "algorithms.average": "Average",
    "algorithms.worst": "Worst",

    "visualizer.title": "Algorithm Visualizer",
    "visualizer.description":
      "Watch sorting algorithms in action with step-by-step visualizations",
    "visualizer.controls": "Controls",
    "visualizer.algorithm": "Algorithm",
    "visualizer.arraySize": "Array Size",
    "visualizer.speed": "Speed",
    "visualizer.step": "Step",
    "visualizer.comparisons": "Comparisons",
    "visualizer.swaps": "Swaps",
    "visualizer.play": "Play",
    "visualizer.pause": "Pause",
    "visualizer.reset": "Reset",
    "visualizer.randomize": "Randomize",
    "visualizer.stepForward": "Step Forward",
    "visualizer.stepBack": "Step Back",

    "playground.title": "Code Playground",
    "playground.description":
      "Experiment with data structures and algorithms in real-time",
    "playground.run": "Run Code",
    "playground.clear": "Clear",
    "playground.output": "Output",
    "playground.examples": "Examples",

    "glossary.title": "Glossary",
    "glossary.description": "Quick reference for DSA terminology and concepts",
    "glossary.searchPlaceholder": "Search terms...",
    "glossary.relatedTerms": "Related Terms",
    "glossary.category": "Category",

    "footer.description":
      "An interactive platform for learning Data Structures and Algorithms with visualizations and hands-on examples.",
    "footer.quickLinks": "Quick Links",
    "footer.resources": "Resources",
    "footer.documentation": "Documentation",
    "footer.tutorials": "Tutorials",
    "footer.examples": "Examples",
    "footer.copyright": "Algo Master. Built for learning.",

    "notFound.title": "404",
    "notFound.message": "Page not found",
    "notFound.description":
      "The page you're looking for doesn't exist or has been moved.",
    "notFound.goHome": "Go Home",

    "admin.login.title": "Admin Login",
    "admin.login.description":
      "Enter your credentials to access the admin panel",
    "admin.login.username": "Username",
    "admin.login.password": "Password",
    "admin.login.submit": "Sign In",
    "admin.login.signing": "Signing in...",

    "admin.dashboard.title": "Admin Dashboard",
    "admin.dashboard.welcome": "Welcome back",
    "admin.dashboard.logout": "Logout",
    "admin.dashboard.overview": "Overview",
    "admin.dashboard.dataStructures": "Data Structures",
    "admin.dashboard.algorithms": "Algorithms",
    "admin.dashboard.glossaryTerms": "Glossary Terms",
    "admin.dashboard.recentDataStructures": "Recent Data Structures",
    "admin.dashboard.recentAlgorithms": "Recent Algorithms",
    "admin.dashboard.latestAdditions": "Latest additions to the library",
    "admin.dashboard.manageDataStructures":
      "Manage all data structures in the system",
    "admin.dashboard.manageAlgorithms": "Manage all algorithms in the system",
    "admin.dashboard.manageGlossary": "Manage all glossary terms in the system",

    "common.learnMore": "Learn More",
    "common.viewAll": "View All",
    "common.loading": "Loading...",
    "common.error": "An error occurred",
  },
  tr: {
    "nav.dataStructures": "Veri Yapıları",
    "nav.algorithms": "Algoritmalar",
    "nav.visualizer": "Görselleştirici",
    "nav.playground": "Kod Atölyesi", 
    "nav.glossary": "Sözlük",
    "nav.search": "Ara",
    "nav.toggleTheme": "Temayı değiştir",
    "nav.toggleLanguage": "Dili değiştir",
    "nav.searchTitle": "DSA Master'da Ara",
    "nav.searchPlaceholder": "Veri yapıları ve algoritmaları ara...",
    "nav.noResults": "Sonuç bulunamadı:",
    "nav.dataStructure": "Veri Yapısı",
    "nav.algorithm": "Algoritma",
    "nav.openMenu": "Menüyü aç",
    "nav.closeMenu": "Menüyü kapat",
    "lang.english": "English",
    "lang.turkish": "Türkçe",

    "home.badge": "Etkileşimli Öğrenme Platformu",
    "home.title": "Ustalaşma Zamanı:", // İngilizce yapıda başa geldiği için : ile ayırdık
    "home.titleHighlight1": "Veri Yapıları",
    "home.titleAnd": "&",
    "home.titleHighlight2": "Algoritmalar",
    "home.description":
      "Görselleştirmeler, adım adım açıklamalar ve uygulamalı kod örnekleriyle DSA'yı etkileşimli olarak öğrenin. Dizilerden graflara, Bubble Sort'tan DFS'ye kadar.",
    "home.startLearning": "Öğrenmeye Başla",
    "home.tryVisualizer": "Görselleştiriciyi Dene",
    "home.dataStructuresCount": "14 Veri Yapısı",
    "home.algorithmsCount": "13 Algoritma",
    "home.interactiveVisualizers": "Etkileşimli Görselleştirmeler",

    "home.features.title": "DSA'da Ustalaşmak İçin İhtiyacınız Olan Her Şey",
    "home.features.subtitle":
      "Veri yapıları ve algoritmaları öğrenmeyi sezgisel ve ilgi çekici hale getirmek için tasarlanmış kapsamlı bir platform.",
    "home.features.dataStructures.title": "Veri Yapıları",
    "home.features.dataStructures.description":
      "Görsel açıklamalar ve gerçek dünya uygulamaları ile temel veri yapılarını öğrenin.",
    "home.features.algorithms.title": "Algoritmalar",
    "home.features.algorithms.description":
      "Sıralama, arama ve graf algoritmalarında adım adım analizlerle uzmanlaşın.",
    "home.features.visualizer.title": "Görsel Öğrenme",
    "home.features.visualizer.description":
      "Etkileşimli görselleştirmeler ve animasyonlarla algoritmaları çalışırken izleyin.",
    "home.features.playground.title": "Kod Atölyesi",
    "home.features.playground.description":
      "Kod yazma pratiği yapın ve gerçek zamanlı olarak farklı yaklaşımları deneyimleyin.",
    "home.features.complexity.title": "Karmaşıklık Analizi",
    "home.features.complexity.description":
      "Zaman ve alan karmaşıklığını net açıklamalar ve karşılaştırmalarla kavrayın.",
    "home.features.glossary.title": "Sözlük",
    "home.features.glossary.description":
      "DSA terminolojisi ve kavramları için hızlı başvuru kaynağı.",

    "home.cta.title": "Öğrenmeye Hazır mısınız?",
    "home.cta.description":
      "Veri yapıları ve algoritmalarında ustalaşma yolculuğunuza bugün başlayın.",
    "home.cta.button": "Hemen Başla",

    "dataStructures.title": "Veri Yapıları",
    "dataStructures.description":
      "Veri yapıları; verileri düzenlemek, işlemek ve depolamak için özelleştirilmiş formatlardır. Bunları anlamak, verimli programlar yazmak ve karmaşık problemleri çözmek için gereklidir.",
    "dataStructures.access": "Erişim",
    "dataStructures.search": "Arama",
    "dataStructures.insert": "Ekleme",
    "dataStructures.delete": "Silme",

    "algorithms.title": "Algoritmalar",
    "algorithms.description":
      "Algoritmalar, problemleri çözmek ve hesaplamalar yapmak için kullanılan adım adım prosedürlerdir. Daha iyi bir yazılımcı olmak için bu temel algoritmalarda ustalaşın.",
    "algorithms.all": "Tümü",
    "algorithms.sorting": "Sıralama",
    "algorithms.searching": "Arama",
    "algorithms.graph": "Graf",
    "algorithms.time": "Zaman",
    "algorithms.space": "Alan", // "Hafıza" da kullanılabilir ama Alan (Space) standarttır.
    "algorithms.best": "En İyi",
    "algorithms.average": "Ortalama",
    "algorithms.worst": "En Kötü",

    "visualizer.title": "Algoritma Görselleştiricisi",
    "visualizer.description":
      "Sıralama algoritmalarını adım adım görselleştirmelerle çalışırken izleyin",
    "visualizer.controls": "Kontroller",
    "visualizer.algorithm": "Algoritma",
    "visualizer.arraySize": "Dizi Boyutu",
    "visualizer.speed": "Hız",
    "visualizer.step": "Adım",
    "visualizer.comparisons": "Karşılaştırmalar",
    "visualizer.swaps": "Değişimler (Swap)",
    "visualizer.play": "Oynat",
    "visualizer.pause": "Duraklat",
    "visualizer.reset": "Sıfırla",
    "visualizer.randomize": "Karıştır",
    "visualizer.stepForward": "İleri Adım",
    "visualizer.stepBack": "Geri Adım",

    "playground.title": "Kod Atölyesi",
    "playground.description":
      "Veri yapıları ve algoritmaları gerçek zamanlı olarak deneyin",
    "playground.run": "Kodu Çalıştır",
    "playground.clear": "Temizle",
    "playground.output": "Çıktı",
    "playground.examples": "Örnekler",

    "glossary.title": "Sözlük",
    "glossary.description":
      "DSA terminolojisi ve kavramları için hızlı başvuru",
    "glossary.searchPlaceholder": "Terim ara...",
    "glossary.relatedTerms": "İlgili Terimler",
    "glossary.category": "Kategori",

    "footer.description":
      "Görselleştirmeler ve uygulamalı örneklerle Veri Yapıları ve Algoritmaları öğrenmek için etkileşimli bir platform.",
    "footer.quickLinks": "Hızlı Bağlantılar",
    "footer.resources": "Kaynaklar",
    "footer.documentation": "Dokümantasyon",
    "footer.tutorials": "Eğitimler",
    "footer.examples": "Örnekler",
    "footer.copyright": "Algo Master. Öğrenmek için tasarlandı.",

    "notFound.title": "404",
    "notFound.message": "Sayfa bulunamadı",
    "notFound.description":
      "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
    "notFound.goHome": "Ana Sayfaya Dön",

    "admin.login.title": "Yönetici Girişi",
    "admin.login.description":
      "Yönetici paneline erişmek için kimlik bilgilerinizi girin",
    "admin.login.username": "Kullanıcı Adı",
    "admin.login.password": "Şifre",
    "admin.login.submit": "Giriş Yap",
    "admin.login.signing": "Giriş yapılıyor...",

    "admin.dashboard.title": "Yönetici Paneli",
    "admin.dashboard.welcome": "Tekrar hoş geldiniz",
    "admin.dashboard.logout": "Çıkış",
    "admin.dashboard.overview": "Genel Bakış",
    "admin.dashboard.dataStructures": "Veri Yapıları",
    "admin.dashboard.algorithms": "Algoritmalar",
    "admin.dashboard.glossaryTerms": "Sözlük Terimleri",
    "admin.dashboard.recentDataStructures": "Son Eklenen Veri Yapıları",
    "admin.dashboard.recentAlgorithms": "Son Eklenen Algoritmalar",
    "admin.dashboard.latestAdditions": "Kütüphaneye son eklenenler",
    "admin.dashboard.manageDataStructures":
      "Sistemdeki tüm veri yapılarını yönetin",
    "admin.dashboard.manageAlgorithms": "Sistemdeki tüm algoritmaları yönetin",
    "admin.dashboard.manageGlossary":
      "Sistemdeki tüm sözlük terimlerini yönetin",

    "common.learnMore": "Daha Fazla Bilgi",
    "common.viewAll": "Tümünü Gör",
    "common.loading": "Yükleniyor...",
    "common.error": "Bir hata oluştu",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dsa-master-language");
      if (saved === "en" || saved === "tr") {
        return saved;
      }
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === "tr") {
        return "tr";
      }
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("dsa-master-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
