import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, ArrowLeft, Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlgorithmCard } from "@/components/algorithm-card";
import { ComplexityBadge } from "@/components/complexity-badge";
import { CodeBlock } from "@/components/code-block";
import type { Algorithm } from "@shared/schema";

function AlgorithmsList() {
  const { data: algorithms, isLoading, error } = useQuery<Algorithm[]>({
    queryKey: ["/api/algorithms"],
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-12">
          <Skeleton className="h-10 w-48 mb-4" />
          <Skeleton className="h-6 w-full max-w-3xl" />
        </div>
        <div className="space-y-16">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="h-8 w-32 mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-64" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !algorithms) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Failed to Load</h1>
        <p className="text-muted-foreground mb-8">
          Unable to load algorithms. Please try again.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  const sortingAlgorithms = algorithms.filter((a) => a.category === "sorting");
  const searchingAlgorithms = algorithms.filter((a) => a.category === "searching");
  const graphAlgorithms = algorithms.filter((a) => a.category === "graph");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Algorithms</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Algorithms are step-by-step procedures for solving problems. Learn the most important 
          sorting, searching, and graph algorithms with interactive visualizations.
        </p>
      </div>

      <div className="space-y-16">
        {sortingAlgorithms.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="outline" className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30 text-sm px-3 py-1">
                Sorting
              </Badge>
              <span className="text-muted-foreground">{sortingAlgorithms.length} algorithms</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortingAlgorithms.map((alg) => (
                <AlgorithmCard key={alg.id} algorithm={alg} />
              ))}
            </div>
          </section>
        )}

        {searchingAlgorithms.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="outline" className="bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30 text-sm px-3 py-1">
                Searching
              </Badge>
              <span className="text-muted-foreground">{searchingAlgorithms.length} algorithm</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchingAlgorithms.map((alg) => (
                <AlgorithmCard key={alg.id} algorithm={alg} />
              ))}
            </div>
          </section>
        )}

        {graphAlgorithms.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="outline" className="bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30 text-sm px-3 py-1">
                Graph
              </Badge>
              <span className="text-muted-foreground">{graphAlgorithms.length} algorithms</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {graphAlgorithms.map((alg) => (
                <AlgorithmCard key={alg.id} algorithm={alg} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function AlgorithmDetail({ slug }: { slug: string }) {
  const { data: algorithms, isLoading: isLoadingAll } = useQuery<Algorithm[]>({
    queryKey: ["/api/algorithms"],
  });

  const { data: alg, isLoading, error } = useQuery<Algorithm>({
    queryKey: ["/api/algorithms", slug],
  });

  if (isLoading || isLoadingAll) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Skeleton className="h-6 w-48 mb-8" />
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-6 w-full max-w-2xl" />
        </div>
        <Skeleton className="h-12 w-full mb-8" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !alg) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Algorithm Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The algorithm you're looking for doesn't exist.
        </p>
        <Link href="/algorithms">
          <Button>View All Algorithms</Button>
        </Link>
      </div>
    );
  }

  const categoryAlgorithms = algorithms?.filter((a) => a.category === alg.category) || [];
  const currentIndex = categoryAlgorithms.findIndex((a) => a.slug === slug);
  const prevAlg = currentIndex > 0 ? categoryAlgorithms[currentIndex - 1] : null;
  const nextAlg = currentIndex < categoryAlgorithms.length - 1 ? categoryAlgorithms[currentIndex + 1] : null;

  const categoryColors: Record<string, string> = {
    sorting: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
    searching: "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30",
    graph: "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-home">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/algorithms" className="hover:text-foreground transition-colors" data-testid="breadcrumb-algorithms">
          Algorithms
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{alg.name}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">{alg.name}</h1>
            <Badge variant="outline" className={categoryColors[alg.category]}>
              {alg.category.charAt(0).toUpperCase() + alg.category.slice(1)}
            </Badge>
          </div>
          <Link href={`/visualizer?alg=${alg.slug}`}>
            <Button className="gap-2" data-testid="button-visualize">
              <Play className="h-4 w-4" />
              Visualize
            </Button>
          </Link>
        </div>
        <p className="text-lg text-muted-foreground">{alg.description}</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="w-full justify-start overflow-x-auto" data-testid="tabs-algorithm">
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="steps" data-testid="tab-steps">Steps</TabsTrigger>
          <TabsTrigger value="visual" data-testid="tab-visual">Visual</TabsTrigger>
          <TabsTrigger value="code" data-testid="tab-code">Code</TabsTrigger>
          <TabsTrigger value="examples" data-testid="tab-examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Definition</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{alg.definition}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Complexity Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Time Complexity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">Best Case</span>
                      <ComplexityBadge complexity={alg.timeComplexity.best} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">Average Case</span>
                      <ComplexityBadge complexity={alg.timeComplexity.average} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">Worst Case</span>
                      <ComplexityBadge complexity={alg.timeComplexity.worst} />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Space Complexity</h4>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Auxiliary Space</span>
                      <ComplexityBadge complexity={alg.spaceComplexity} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="steps">
          <Card>
            <CardHeader>
              <CardTitle>Algorithm Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {alg.steps.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visual">
          <Card>
            <CardHeader>
              <CardTitle>Visual Walkthrough</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="font-mono text-sm bg-muted p-6 rounded-lg overflow-x-auto whitespace-pre leading-relaxed">
                {alg.visualDiagram}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code">
          <div className="space-y-4">
            <CodeBlock code={alg.codeImplementation} title={`${alg.name} Implementation`} />
            <div className="flex justify-end">
              <Link href={`/playground?code=${encodeURIComponent(alg.codeImplementation)}`}>
                <Button variant="outline" className="gap-2" data-testid="button-open-playground">
                  Open in Playground
                </Button>
              </Link>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="examples">
          <Card>
            <CardHeader>
              <CardTitle>Input/Output Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alg.inputOutputExamples.map((example, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-16 shrink-0">Input:</span>
                      <code className="font-mono text-sm">{example.input}</code>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-16 shrink-0">Output:</span>
                      <code className="font-mono text-sm text-green-600 dark:text-green-400">{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-border">
        {prevAlg ? (
          <Link href={`/algorithms/${prevAlg.slug}`}>
            <Button variant="outline" className="gap-2" data-testid="button-prev-alg">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{prevAlg.name}</span>
              <span className="sm:hidden">Previous</span>
            </Button>
          </Link>
        ) : (
          <div />
        )}
        {nextAlg && (
          <Link href={`/algorithms/${nextAlg.slug}`}>
            <Button variant="outline" className="gap-2" data-testid="button-next-alg">
              <span className="hidden sm:inline">{nextAlg.name}</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default function AlgorithmsPage() {
  const [, params] = useRoute("/algorithms/:slug");
  
  if (params?.slug) {
    return <AlgorithmDetail slug={params.slug} />;
  }
  
  return <AlgorithmsList />;
}
