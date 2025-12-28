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
    "lang.turkish": "Türkçe",

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
 
    "reber.login.title": "Reber Login",
    "reber.login.description":
      "Enter your credentials to access the reber panel",
    "reber.login.username": "Username",
    "reber.login.password": "Password",
    "reber.login.submit": "Sign In",
    "reber.login.signing": "Signing in...",

    "reber.dashboard.title": "Reber Dashboard",
    "reber.dashboard.welcome": "Welcome back",
    "reber.dashboard.logout": "Logout",
    "reber.dashboard.overview": "Overview",
    "reber.dashboard.dataStructures": "Data Structures",
    "reber.dashboard.algorithms": "Algorithms",
    "reber.dashboard.glossaryTerms": "Glossary Terms",
    "reber.dashboard.recentDataStructures": "Recent Data Structures",
    "reber.dashboard.recentAlgorithms": "Recent Algorithms",
    "reber.dashboard.latestAdditions": "Latest additions to the library",
    "reber.dashboard.manageDataStructures":
      "Manage all data structures in the system",
    "reber.dashboard.manageAlgorithms": "Manage all algorithms in the system",
    "reber.dashboard.manageGlossary": "Manage all glossary terms in the system",
    "reber.dashboard.setupRequired": "Setup Required",
    "reber.dashboard.quickActions": "Quick Actions",
    "reber.dashboard.commonTasks": "Common administrative tasks",
    "reber.dashboard.supabaseConnected": "Supabase Connected",
    "reber.dashboard.staticMode": "Static Mode",
    "reber.dashboard.addNew": "Add New",
    "reber.dashboard.clickAddNew": "Click \"Add New\" to create one",
    "reber.dashboard.delete": "Delete",
    "reber.dashboard.deleteConfirm": "Delete {name}?",
    "reber.dashboard.deleteDescription": "This action cannot be undone.",
    "reber.dashboard.cancel": "Cancel",
    "reber.dashboard.edit": "Edit",
    "reber.dashboard.save": "Save",
    "reber.dashboard.saving": "Saving...",
    "reber.dashboard.editDataStructure": "Edit Data Structure",
    "reber.dashboard.addDataStructure": "Add Data Structure",
    "reber.dashboard.editAlgorithm": "Edit Algorithm",
    "reber.dashboard.addAlgorithm": "Add Algorithm",
    "reber.dashboard.editGlossaryTerm": "Edit Glossary Term",
    "reber.dashboard.addGlossaryTerm": "Add Glossary Term",
    "reber.dashboard.name": "Name",
    "reber.dashboard.description": "Description",
    "reber.dashboard.slug": "Slug",
    "reber.dashboard.icon": "Icon",
    "reber.dashboard.category": "Category",
    "reber.dashboard.complexity": "Complexity",
    "reber.dashboard.timeComplexity": "Time Complexity",
    "reber.dashboard.spaceComplexity": "Space Complexity",
    "reber.dashboard.best": "Best",
    "reber.dashboard.average": "Average",
    "reber.dashboard.worst": "Worst",
    "reber.setup.title": "Setup Required",
    "reber.setup.description": "Reber panel requires Supabase configuration",
    "reber.setup.message": "To enable the reber panel, please configure Supabase environment variables:",
    "reber.setup.goHomepage": "Go to Homepage",
    "reber.password.forgot": "Forgot password?",
    "reber.password.reset": "Reset Password",
    "reber.password.resetTitle": "Reset Password",
    "reber.password.resetDescription": "Enter your new password below",
    "reber.password.newPassword": "New Password",
    "reber.password.confirmPassword": "Confirm Password",
    "reber.password.enterNew": "Enter new password",
    "reber.password.confirmNew": "Confirm new password",
    "reber.password.resetting": "Resetting Password...",
    "reber.password.resetSuccess": "Password Reset Successful!",
    "reber.password.resetSuccessDesc": "Your password has been updated. Redirecting to login...",
    "reber.password.forgotTitle": "Reset Password",
    "reber.password.forgotDescription": "Enter your email address and we'll send you a reset link",
    "reber.password.sendResetLink": "Send Reset Link",
    "reber.password.checkEmail": "Check Your Email",
    "reber.password.emailSent": "We've sent a password reset link to {email}",
    "reber.password.emailInstructions": "Please check your email and click the link to reset your password. The link will expire in 1 hour.",
    "reber.password.backToLogin": "Back to Login",
    "reber.password.email": "Email",
    "reber.password.enterEmail": "ornek@email.com",
    "reber.password.enterPassword": "Enter password",

    "common.learnMore": "Learn More",
    "common.viewAll": "View All",
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.home": "Home",
    "common.notFound": "Not Found",
    "common.notFoundDescription": "The item you're looking for doesn't exist.",
    "common.viewAllAlgorithms": "View All Algorithms",
    "common.viewAllDataStructures": "View All Data Structures",
    "common.breadcrumbHome": "Home",
    "common.breadcrumbDataStructures": "Data Structures",
    "common.breadcrumbAlgorithms": "Algorithms",
    "common.complexityAnalysis": "Complexity Analysis",
    "common.timeComplexity": "Time Complexity",
    "common.spaceComplexity": "Space Complexity",
    "common.bestCase": "Best Case",
    "common.averageCase": "Average Case",
    "common.worstCase": "Worst Case",
    "common.auxiliarySpace": "Auxiliary Space",
    "common.algorithmSteps": "Algorithm Steps",
    "common.visualWalkthrough": "Visual Walkthrough",
    "common.inputOutputExamples": "Input/Output Examples",
    "common.commonUseCases": "Common Use Cases",
    "common.visualExplanation": "Visual Explanation",
    "common.tryItYourself": "Try It Yourself",
    "common.codePlayground": "Code Playground",
    "common.codeEditor": "Code Editor",
    "common.customCode": "Custom Code",
    "common.writeCodeInstruction": "Write JavaScript code and click Run to execute",
    "common.runCode": "Run Code",
    "common.running": "Running...",
    "common.clearOutput": "Clear Output",
    "common.output": "Output",
    "common.clickRunToSee": "Click \"Run Code\" to see the output",
    "common.quickTips": "Quick Tips",
    "common.tryTemplates": "Try Templates",
    "common.tryTemplatesDesc": "Select a template from the dropdown to get started quickly",
    "common.safeExecution": "Safe Execution",
    "common.safeExecutionDesc": "Code runs in a sandboxed environment for your safety",
    "common.playgroundDescription": "Write, test, and experiment with data structures and algorithms in real-time",
    "common.selectTemplate": "Select template",
    "common.copyCode": "Copy code",
    "common.algorithmVisualizer": "Algorithm Visualizer",
    "common.visualizerDescription": "Watch sorting algorithms in action with step-by-step visualizations",
    "common.controls": "Controls",
    "common.arraySize": "Array Size",
    "common.algorithm": "Algorithm",
    "common.speed": "Speed",
    "common.step": "Step",
    "common.comparisons": "Comparisons",
    "common.swaps": "Swaps",
    "common.play": "Play",
    "common.pause": "Pause",
    "common.reset": "Reset",
    "common.randomize": "Randomize",
    "common.stepForward": "Step Forward",
    "common.stepBack": "Step Back",
    "common.sending": "Sending...",
    "common.madeWith": "Made with",
    "common.forDevelopers": "for developers",
    "common.loginFailed": "Login failed. Please check your credentials.",
    "common.supabaseNotConfigured": "Supabase is not configured",
    "common.failedToSendEmail": "Failed to send reset email. Please try again.",
    "common.failedToResetPassword": "Failed to reset password. Please try again.",
    "common.passwordTooShort": "Password must be at least 6 characters long",
    "common.passwordsDoNotMatch": "Passwords do not match",
    "common.emailLabel": "Email",
    "common.faq": "FAQ",
    "common.github": "GitHub",
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
      "Görselleştirmeler, adım adım açıklamalar ve uygulamalı kod örnekleriyle DSA'yı etkileşimli olarak öğrenin. Dizilerden graflara, Bubble Sort'tan DFS'ye kadar her şey.",
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

    "reber.login.title": "Reber Girişi",
    "reber.login.description":
      "Reber paneline erişmek için kimlik bilgilerinizi girin",
    "reber.login.username": "Kullanıcı Adı",
    "reber.login.password": "Şifre",
    "reber.login.submit": "Giriş Yap",
    "reber.login.signing": "Giriş yapılıyor...",

    "reber.dashboard.title": "Reber Paneli",
    "reber.dashboard.welcome": "Tekrar hoş geldiniz",
    "reber.dashboard.logout": "Çıkış",
    "reber.dashboard.overview": "Genel Bakış",
    "reber.dashboard.dataStructures": "Veri Yapıları",
    "reber.dashboard.algorithms": "Algoritmalar",
    "reber.dashboard.glossaryTerms": "Sözlük Terimleri",
    "reber.dashboard.recentDataStructures": "Son Eklenen Veri Yapıları",
    "reber.dashboard.recentAlgorithms": "Son Eklenen Algoritmalar",
    "reber.dashboard.latestAdditions": "Kütüphaneye son eklenenler",
    "reber.dashboard.manageDataStructures":
      "Sistemdeki tüm veri yapılarını yönetin",
    "reber.dashboard.manageAlgorithms": "Sistemdeki tüm algoritmaları yönetin",
    "reber.dashboard.manageGlossary":
      "Sistemdeki tüm sözlük terimlerini yönetin",
    "reber.dashboard.setupRequired": "Kurulum Gerekli",
    "reber.dashboard.quickActions": "Hızlı İşlemler",
    "reber.dashboard.commonTasks": "Ortak yönetim görevleri",
    "reber.dashboard.supabaseConnected": "Supabase Bağlı",
    "reber.dashboard.staticMode": "Statik Mod",
    "reber.dashboard.addNew": "Yeni Ekle",
    "reber.dashboard.clickAddNew": "Oluşturmak için \"Yeni Ekle\" butonuna tıklayın",
    "reber.dashboard.delete": "Sil",
    "reber.dashboard.deleteConfirm": "{name} silinsin mi?",
    "reber.dashboard.deleteDescription": "Bu işlem geri alınamaz.",
    "reber.dashboard.cancel": "İptal",
    "reber.dashboard.edit": "Düzenle",
    "reber.dashboard.save": "Kaydet",
    "reber.dashboard.saving": "Kaydediliyor...",
    "reber.dashboard.editDataStructure": "Veri Yapısını Düzenle",
    "reber.dashboard.addDataStructure": "Veri Yapısı Ekle",
    "reber.dashboard.editAlgorithm": "Algoritmayı Düzenle",
    "reber.dashboard.addAlgorithm": "Algoritma Ekle",
    "reber.dashboard.editGlossaryTerm": "Sözlük Terimini Düzenle",
    "reber.dashboard.addGlossaryTerm": "Sözlük Terimi Ekle",
    "reber.dashboard.name": "İsim",
    "reber.dashboard.description": "Açıklama",
    "reber.dashboard.slug": "Slug",
    "reber.dashboard.icon": "İkon",
    "reber.dashboard.category": "Kategori",
    "reber.dashboard.complexity": "Karmaşıklık",
    "reber.dashboard.timeComplexity": "Zaman Karmaşıklığı",
    "reber.dashboard.spaceComplexity": "Alan Karmaşıklığı",
    "reber.dashboard.best": "En İyi",
    "reber.dashboard.average": "Ortalama",
    "reber.dashboard.worst": "En Kötü",
    "reber.setup.title": "Kurulum Gerekli",
    "reber.setup.description": "Reber paneli Supabase yapılandırması gerektirir",
    "reber.setup.message": "Reber panelini etkinleştirmek için lütfen Supabase ortam değişkenlerini yapılandırın:",
    "reber.setup.goHomepage": "Ana Sayfaya Git",
    "reber.password.forgot": "Şifremi unuttum?",
    "reber.password.reset": "Şifre Sıfırla",
    "reber.password.resetTitle": "Şifre Sıfırla",
    "reber.password.resetDescription": "Aşağıya yeni şifrenizi girin",
    "reber.password.newPassword": "Yeni Şifre",
    "reber.password.confirmPassword": "Şifreyi Onayla",
    "reber.password.enterNew": "Yeni şifre girin",
    "reber.password.confirmNew": "Yeni şifreyi onaylayın",
    "reber.password.resetting": "Şifre Sıfırlanıyor...",
    "reber.password.resetSuccess": "Şifre Başarıyla Sıfırlandı!",
    "reber.password.resetSuccessDesc": "Şifreniz güncellendi. Giriş sayfasına yönlendiriliyorsunuz...",
    "reber.password.forgotTitle": "Şifre Sıfırla",
    "reber.password.forgotDescription": "E-posta adresinizi girin, size bir sıfırlama bağlantısı gönderelim",
    "reber.password.sendResetLink": "Sıfırlama Bağlantısı Gönder",
    "reber.password.checkEmail": "E-postanızı Kontrol Edin",
    "reber.password.emailSent": "{email} adresine bir şifre sıfırlama bağlantısı gönderdik",
    "reber.password.emailInstructions": "Lütfen e-postanızı kontrol edin ve şifrenizi sıfırlamak için bağlantıya tıklayın. Bağlantı 1 saat içinde sona erecektir.",
    "reber.password.backToLogin": "Girişe Dön",
    "reber.password.email": "E-posta",
    "reber.password.enterEmail": "ornek@email.com",
    "reber.password.enterPassword": "Şifre girin",

    "common.learnMore": "Daha Fazla Bilgi",
    "common.viewAll": "Tümünü Gör",
    "common.loading": "Yükleniyor...",
    "common.error": "Bir hata oluştu",
    "common.home": "Ana Sayfa",
    "common.notFound": "Bulunamadı",
    "common.notFoundDescription": "Aradığınız öğe mevcut değil.",
    "common.viewAllAlgorithms": "Tüm Algoritmaları Gör",
    "common.viewAllDataStructures": "Tüm Veri Yapılarını Gör",
    "common.breadcrumbHome": "Ana Sayfa",
    "common.breadcrumbDataStructures": "Veri Yapıları",
    "common.breadcrumbAlgorithms": "Algoritmalar",
    "common.complexityAnalysis": "Karmaşıklık Analizi",
    "common.timeComplexity": "Zaman Karmaşıklığı",
    "common.spaceComplexity": "Alan Karmaşıklığı",
    "common.bestCase": "En İyi Durum",
    "common.averageCase": "Ortalama Durum",
    "common.worstCase": "En Kötü Durum",
    "common.auxiliarySpace": "Yardımcı Alan",
    "common.algorithmSteps": "Algoritma Adımları",
    "common.visualWalkthrough": "Görsel İnceleme",
    "common.inputOutputExamples": "Girdi/Çıktı Örnekleri",
    "common.commonUseCases": "Yaygın Kullanım Alanları",
    "common.visualExplanation": "Görsel Açıklama",
    "common.tryItYourself": "Kendiniz Deneyin",
    "common.codePlayground": "Kod Atölyesi",
    "common.codeEditor": "Kod Editörü",
    "common.customCode": "Özel Kod",
    "common.writeCodeInstruction": "JavaScript kodu yazın ve çalıştırmak için Run'a tıklayın",
    "common.runCode": "Kodu Çalıştır",
    "common.running": "Çalıştırılıyor...",
    "common.clearOutput": "Çıktıyı Temizle",
    "common.output": "Çıktı",
    "common.clickRunToSee": "Çıktıyı görmek için \"Kodu Çalıştır\" butonuna tıklayın",
    "common.quickTips": "Hızlı İpuçları",
    "common.tryTemplates": "Şablonları Deneyin",
    "common.tryTemplatesDesc": "Hızlıca başlamak için açılır menüden bir şablon seçin",
    "common.safeExecution": "Güvenli Çalıştırma",
    "common.safeExecutionDesc": "Kod, güvenliğiniz için izole bir ortamda çalışır",
    "common.playgroundDescription": "Veri yapıları ve algoritmaları gerçek zamanlı olarak yazın, test edin ve deneyin",
    "common.selectTemplate": "Şablon seç",
    "common.copyCode": "Kodu kopyala",
    "common.algorithmVisualizer": "Algoritma Görselleştiricisi",
    "common.visualizerDescription": "Sıralama algoritmalarını adım adım görselleştirmelerle çalışırken izleyin",
    "common.controls": "Kontroller",
    "common.arraySize": "Dizi Boyutu",
    "common.algorithm": "Algoritma",
    "common.speed": "Hız",
    "common.step": "Adım",
    "common.comparisons": "Karşılaştırmalar",
    "common.swaps": "Değişimler",
    "common.play": "Oynat",
    "common.pause": "Duraklat",
    "common.reset": "Sıfırla",
    "common.randomize": "Karıştır",
    "common.stepForward": "İleri Adım",
    "common.stepBack": "Geri Adım",
    "common.sending": "Gönderiliyor...",
    "common.madeWith": "Yapıldı",
    "common.forDevelopers": "geliştiriciler için",
    "common.loginFailed": "Giriş başarısız. Lütfen kimlik bilgilerinizi kontrol edin.",
    "common.supabaseNotConfigured": "Supabase yapılandırılmamış",
    "common.failedToSendEmail": "Sıfırlama e-postası gönderilemedi. Lütfen tekrar deneyin.",
    "common.failedToResetPassword": "Şifre sıfırlama başarısız. Lütfen tekrar deneyin.",
    "common.passwordTooShort": "Şifre en az 6 karakter uzunluğunda olmalıdır",
    "common.passwordsDoNotMatch": "Şifreler eşleşmiyor",
    "common.emailLabel": "E-posta",
    "common.faq": "SSS",
    "common.github": "GitHub",
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
    
    // Invalidate queries when language changes to refresh translations
    if (typeof window !== "undefined") {
      // Dynamically import to avoid circular dependency
      import("./queryClient").then(({ queryClient }) => {
        queryClient.invalidateQueries();
      });
    }
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
