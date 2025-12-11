import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search, BookOpen, Code2, Play, HelpCircle, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "@/lib/i18n";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { dataStructures, algorithms } from "@shared/schema";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();

  const navItems = [
    { href: "/data-structures", label: t("nav.dataStructures"), icon: BookOpen },
    { href: "/algorithms", label: t("nav.algorithms"), icon: Code2 },
    { href: "/visualizer", label: t("nav.visualizer"), icon: Play },
    { href: "/playground", label: t("nav.playground"), icon: Terminal },
    { href: "/glossary", label: t("nav.glossary"), icon: HelpCircle },
  ];

  const allItems = [
    ...dataStructures.map((ds) => ({
      name: ds.name,
      type: t("nav.dataStructure"),
      href: `/data-structures/${ds.slug}`,
      description: ds.description,
    })),
    ...algorithms.map((alg) => ({
      name: alg.name,
      type: t("nav.algorithm"),
      href: `/algorithms/${alg.slug}`,
      description: alg.description,
    })),
  ];

  const filteredItems = searchQuery
    ? allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2" data-testid="link-home">
            <img 
              src="/logo-algo.png" 
              alt="Algo Master Logo" 
              className="w-14 h-14 rounded-lg object-contain"
            />
            <span className="font-semibold text-lg hidden sm:block">Algo Master</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className="gap-2"
                    data-testid={`link-nav-${item.label.toLowerCase().replace(" ", "-")}`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="button-search"
                  aria-label={t("nav.search")}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>{t("nav.searchTitle")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder={t("nav.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-search"
                    autoFocus
                  />
                  {searchQuery && (
                    <div className="max-h-80 overflow-y-auto space-y-1">
                      {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery("");
                            }}
                          >
                            <div
                              className="p-3 rounded-lg hover-elevate cursor-pointer"
                              data-testid={`search-result-${item.name.toLowerCase().replace(" ", "-")}`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                  {item.type}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground py-8">
                          {t("nav.noResults")} "{searchQuery}"
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <LanguageToggle />
            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label={mobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = location.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      data-testid={`link-mobile-${item.label.toLowerCase().replace(" ", "-")}`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
