import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center gap-4 mb-6">
            <AlertCircle className="h-16 w-16 text-muted-foreground" />
            <h1 className="text-6xl font-bold text-primary">{t("notFound.title")}</h1>
            <h2 className="text-2xl font-semibold">{t("notFound.message")}</h2>
          </div>

          <p className="text-muted-foreground mb-8">
            {t("notFound.description")}
          </p>

          <Link href="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              {t("notFound.goHome")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
