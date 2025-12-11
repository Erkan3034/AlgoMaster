import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen, Code2, Play, Sparkles, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DataStructureCard } from "@/components/data-structure-card";
import { AlgorithmCard } from "@/components/algorithm-card";
import { useLanguage } from "@/lib/i18n";
import type { DataStructure, Algorithm } from "@shared/schema";

export default function Home() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Play,
      title: t("home.features.visualizer.title"),
      description: t("home.features.visualizer.description"),
    },
    {
      icon: Code2,
      title: t("home.features.playground.title"),
      description: t("home.features.playground.description"),
    },
    {
      icon: Target,
      title: t("home.features.complexity.title"),
      description: t("home.features.complexity.description"),
    },
  ];

  const { data: dataStructures, isLoading: isLoadingDS } = useQuery<DataStructure[]>({
    queryKey: ["/api/data-structures"],
  });

  const { data: algorithms, isLoading: isLoadingAlg } = useQuery<Algorithm[]>({
    queryKey: ["/api/algorithms"],
  });

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.08),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              {t("home.badge")}
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              {t("home.title")}{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-violet-500 bg-clip-text text-transparent">
                {t("home.titleHighlight1")}
              </span>
              {" "}{t("home.titleAnd")}{" "}
              <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-primary bg-clip-text text-transparent">
                {t("home.titleHighlight2")}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              {t("home.description")}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/data-structures">
                <Button size="lg" className="gap-2 px-8 text-base" data-testid="button-start-learning">
                  {t("home.startLearning")}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/visualizer">
                <Button variant="outline" size="lg" className="gap-2 px-8 text-base" data-testid="button-try-visualizer">
                  <Play className="h-5 w-5" />
                  {t("home.tryVisualizer")}
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>{t("home.dataStructuresCount")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <span>{t("home.algorithmsCount")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                <span>{t("home.interactiveVisualizers")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("home.features.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="relative overflow-visible" data-testid={`card-feature-${feature.title.toLowerCase().replace(/ /g, "-")}`}>
                <CardHeader>
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {t("dataStructures.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("home.features.dataStructures.description")}
              </p>
            </div>
            <Link href="/data-structures">
              <Button variant="outline" className="gap-2 hidden sm:flex" data-testid="button-view-all-data-structures">
                {t("common.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {isLoadingDS ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataStructures?.slice(0, 6).map((ds) => (
                <DataStructureCard key={ds.id} dataStructure={ds} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/data-structures">
              <Button variant="outline" className="gap-2">
                {t("common.viewAll")} {t("dataStructures.title")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {t("algorithms.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("home.features.algorithms.description")}
              </p>
            </div>
            <Link href="/algorithms">
              <Button variant="outline" className="gap-2 hidden sm:flex" data-testid="button-view-all-algorithms">
                {t("common.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {isLoadingAlg ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {algorithms?.slice(0, 4).map((alg) => (
                <AlgorithmCard key={alg.id} algorithm={alg} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/algorithms">
              <Button variant="outline" className="gap-2">
                {t("common.viewAll")} {t("algorithms.title")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-primary/5 border-primary/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
            <CardContent className="relative p-8 md:p-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto text-primary mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t("home.cta.title")}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                {t("home.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/data-structures/array">
                  <Button size="lg" className="gap-2 px-8" data-testid="button-start-with-arrays">
                    {t("home.cta.button")}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/playground">
                  <Button variant="outline" size="lg" className="gap-2 px-8" data-testid="button-try-playground">
                    <Code2 className="h-5 w-5" />
                    {t("nav.playground")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
