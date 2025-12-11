import { Link } from "wouter";
import { Github, Heart } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/logo-algo.png" 
                alt="Algo Master Logo" 
                className="w-14 h-14 rounded-lg object-contain"
              />
              <span className="font-semibold text-lg">Algo Master</span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/data-structures" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-data-structures">
                  {t("nav.dataStructures")}
                </Link>
              </li>
              <li>
                <Link href="/algorithms" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-algorithms">
                  {t("nav.algorithms")}
                </Link>
              </li>
              <li>
                <Link href="/visualizer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-visualizer">
                  {t("nav.visualizer")}
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-glossary">
                  {t("nav.glossary")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.resources")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/glossary#faq" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-faq">
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  data-testid="footer-link-github"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2025 {t("footer.copyright")}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> for developers
          </p>
        </div>
      </div>
    </footer>
  );
}
