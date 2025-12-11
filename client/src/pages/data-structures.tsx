import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { DataStructureCard } from "@/components/data-structure-card";
import { ComplexityBadge } from "@/components/complexity-badge";
import { CodeBlock } from "@/components/code-block";
import type { DataStructure } from "@shared/schema";

function DataStructuresList() {
  const { data: dataStructures, isLoading, error } = useQuery<DataStructure[]>({
    queryKey: ["/api/data-structures"],
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-12">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-full max-w-3xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !dataStructures) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Failed to Load</h1>
        <p className="text-muted-foreground mb-8">
          Unable to load data structures. Please try again.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Data Structures</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Data structures are specialized formats for organizing, processing, and storing data. 
          Understanding them is essential for writing efficient programs and solving complex problems.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataStructures.map((ds) => (
          <DataStructureCard key={ds.id} dataStructure={ds} />
        ))}
      </div>
    </div>
  );
}

function DataStructureDetail({ slug }: { slug: string }) {
  const { data: dataStructures, isLoading: isLoadingAll } = useQuery<DataStructure[]>({
    queryKey: ["/api/data-structures"],
  });

  const { data: ds, isLoading, error } = useQuery<DataStructure>({
    queryKey: ["/api/data-structures", slug],
  });

  if (isLoading || isLoadingAll) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Skeleton className="h-6 w-48 mb-8" />
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <Skeleton className="h-10 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
          <Skeleton className="h-6 w-full max-w-2xl" />
        </div>
        <Skeleton className="h-12 w-full mb-8" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !ds) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Data Structure Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The data structure you're looking for doesn't exist.
        </p>
        <Link href="/data-structures">
          <Button>View All Data Structures</Button>
        </Link>
      </div>
    );
  }

  const currentIndex = dataStructures?.findIndex((d) => d.slug === slug) ?? -1;
  const prevDs = currentIndex > 0 ? dataStructures?.[currentIndex - 1] : null;
  const nextDs = dataStructures && currentIndex < dataStructures.length - 1 ? dataStructures[currentIndex + 1] : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-home">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/data-structures" className="hover:text-foreground transition-colors" data-testid="breadcrumb-data-structures">
          Data Structures
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{ds.name}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">{ds.name}</h1>
          <div className="flex gap-2 flex-wrap">
            <ComplexityBadge complexity={ds.complexity.access} label="Access" />
            <ComplexityBadge complexity={ds.complexity.search} label="Search" />
          </div>
        </div>
        <p className="text-lg text-muted-foreground">{ds.description}</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="w-full justify-start overflow-x-auto" data-testid="tabs-data-structure">
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="visual" data-testid="tab-visual">Visual</TabsTrigger>
          <TabsTrigger value="code" data-testid="tab-code">Code</TabsTrigger>
          <TabsTrigger value="practice" data-testid="tab-practice">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Definition</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{ds.definition}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time Complexity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-2">Access</p>
                  <ComplexityBadge complexity={ds.complexity.access} />
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-2">Search</p>
                  <ComplexityBadge complexity={ds.complexity.search} />
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-2">Insert</p>
                  <ComplexityBadge complexity={ds.complexity.insert} />
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-2">Delete</p>
                  <ComplexityBadge complexity={ds.complexity.delete} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 dark:text-green-400">Advantages</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ds.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">+</span>
                      <span className="text-muted-foreground">{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">Disadvantages</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ds.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">-</span>
                      <span className="text-muted-foreground">{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Common Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {ds.useCases.map((useCase, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-md bg-muted text-sm"
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visual">
          <Card>
            <CardHeader>
              <CardTitle>Visual Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="font-mono text-sm bg-muted p-6 rounded-lg overflow-x-auto whitespace-pre leading-relaxed">
                {ds.visualExplanation}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code">
          <CodeBlock code={ds.codeExample} title={`${ds.name} Implementation`} />
        </TabsContent>

        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle>Try It Yourself</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{ds.experimentScenario}</p>
              <div className="flex gap-4 flex-wrap">
                <Link href={`/visualizer?ds=${ds.slug}`}>
                  <Button className="gap-2" data-testid="button-open-visualizer">
                    Open in Visualizer
                  </Button>
                </Link>
                <Link href={`/playground?code=${encodeURIComponent(ds.codeExample)}`}>
                  <Button variant="outline" className="gap-2" data-testid="button-open-playground">
                    Open in Playground
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-border">
        {prevDs ? (
          <Link href={`/data-structures/${prevDs.slug}`}>
            <Button variant="outline" className="gap-2" data-testid="button-prev-ds">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{prevDs.name}</span>
              <span className="sm:hidden">Previous</span>
            </Button>
          </Link>
        ) : (
          <div />
        )}
        {nextDs && (
          <Link href={`/data-structures/${nextDs.slug}`}>
            <Button variant="outline" className="gap-2" data-testid="button-next-ds">
              <span className="hidden sm:inline">{nextDs.name}</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default function DataStructuresPage() {
  const [, params] = useRoute("/data-structures/:slug");
  
  if (params?.slug) {
    return <DataStructureDetail slug={params.slug} />;
  }
  
  return <DataStructuresList />;
}
