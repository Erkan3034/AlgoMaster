import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dataStructures, algorithms, glossaryTerms } from "@shared/schema";
import { 
  LogOut, 
  Database, 
  Code, 
  BookOpen, 
  LayoutDashboard,
  TrendingUp,
  Layers,
  FileText
} from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isLoading, isAuthenticated, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    setLocation("/admin/login");
  };

  const stats = [
    { 
      label: t("admin.dashboard.dataStructures"), 
      value: dataStructures.length, 
      icon: Database, 
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    { 
      label: t("admin.dashboard.algorithms"), 
      value: algorithms.length, 
      icon: Code, 
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    { 
      label: t("admin.dashboard.glossaryTerms"), 
      value: glossaryTerms.length, 
      icon: BookOpen, 
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{t("admin.dashboard.title")}</h1>
              <p className="text-sm text-muted-foreground">
                {t("admin.dashboard.welcome")}, {user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="capitalize">
              Admin
            </Badge>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              {t("admin.dashboard.logout")}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {t("admin.dashboard.overview")}
            </TabsTrigger>
            <TabsTrigger value="data-structures" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              {t("nav.dataStructures")}
            </TabsTrigger>
            <TabsTrigger value="algorithms" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              {t("nav.algorithms")}
            </TabsTrigger>
            <TabsTrigger value="glossary" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {t("nav.glossary")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.bgColor}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.dashboard.recentDataStructures")}</CardTitle>
                  <CardDescription>{t("admin.dashboard.latestAdditions")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-3">
                      {dataStructures.slice(0, 5).map((ds) => (
                        <div key={ds.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium">{ds.name}</p>
                            <p className="text-sm text-muted-foreground">{ds.description.slice(0, 50)}...</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.dashboard.recentAlgorithms")}</CardTitle>
                  <CardDescription>{t("admin.dashboard.latestAdditions")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-3">
                      {algorithms.slice(0, 5).map((algo) => (
                        <div key={algo.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium">{algo.name}</p>
                            <p className="text-sm text-muted-foreground">{algo.category}</p>
                          </div>
                          <Badge variant="secondary">{algo.timeComplexity.average}</Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="data-structures">
            <Card>
              <CardHeader>
                <CardTitle>{t("nav.dataStructures")}</CardTitle>
                <CardDescription>{t("admin.dashboard.manageDataStructures")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {dataStructures.map((ds) => (
                      <div key={ds.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <p className="font-medium">{ds.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">/{ds.slug}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">Access: {ds.complexity.access}</Badge>
                          <Badge variant="outline">Search: {ds.complexity.search}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="algorithms">
            <Card>
              <CardHeader>
                <CardTitle>{t("nav.algorithms")}</CardTitle>
                <CardDescription>{t("admin.dashboard.manageAlgorithms")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {algorithms.map((algo) => (
                      <div key={algo.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <p className="font-medium">{algo.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{algo.category}</Badge>
                            <span className="text-sm text-muted-foreground">/{algo.slug}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">Time: {algo.timeComplexity.average}</Badge>
                          <Badge variant="outline">Space: {algo.spaceComplexity}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="glossary">
            <Card>
              <CardHeader>
                <CardTitle>{t("nav.glossary")}</CardTitle>
                <CardDescription>{t("admin.dashboard.manageGlossary")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {glossaryTerms.map((term) => (
                      <div key={term.id} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{term.term}</p>
                          <Badge variant="secondary">{term.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {term.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
