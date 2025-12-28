import { useState } from "react";
import { useLocation } from "wouter";
import { resetPassword, isSupabaseConfigured } from "@/lib/supabase";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, AlertCircle, Info, CheckCircle, ArrowLeft } from "lucide-react";

export default function AdminForgotPassword() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!isSupabaseConfigured) {
      setError(t("common.supabaseNotConfigured"));
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || t("common.failedToSendEmail"));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-yellow-500/10">
                <Info className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">{t("reber.setup.title")}</CardTitle>
            <CardDescription>
              {t("reber.setup.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                {t("reber.setup.message")}
                <br /><br />
                <code className="text-xs bg-muted p-1 rounded">VITE_SUPABASE_URL</code>
                <br />
                <code className="text-xs bg-muted p-1 rounded">VITE_SUPABASE_ANON_KEY</code>
              </AlertDescription>
            </Alert>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setLocation("/")}
            >
              {t("reber.setup.goHomepage")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">{t("reber.password.checkEmail")}</CardTitle>
            <CardDescription>
              {t("reber.password.emailSent").replace("{email}", email)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                {t("reber.password.emailInstructions")}
              </AlertDescription>
            </Alert>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setLocation("/reber/login")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("reber.password.backToLogin")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{t("reber.password.forgotTitle")}</CardTitle>
          <CardDescription>
            {t("reber.password.forgotDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t("common.emailLabel")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t("reber.password.enterEmail")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t("common.sending")}
                </>
              ) : (
                t("reber.password.sendResetLink")
              )}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setLocation("/reber/login")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("reber.password.backToLogin")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

