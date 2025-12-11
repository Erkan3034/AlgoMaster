import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComplexityBadge } from "./complexity-badge";
import type { Algorithm } from "@shared/schema";
import * as Icons from "lucide-react";

interface AlgorithmCardProps {
  algorithm: Algorithm;
}

const categoryColors: Record<string, string> = {
  sorting: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
  searching: "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30",
  graph: "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
};

export function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[algorithm.icon] || Icons.Code2;

  return (
    <Link href={`/algorithms/${algorithm.slug}`}>
      <Card 
        className="h-full hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 group"
        data-testid={`card-algorithm-${algorithm.slug}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
              <IconComponent className="h-6 w-6" />
            </div>
            <Badge variant="outline" className={categoryColors[algorithm.category]}>
              {algorithm.category.charAt(0).toUpperCase() + algorithm.category.slice(1)}
            </Badge>
          </div>
          <CardTitle className="mt-3 text-lg group-hover:text-primary transition-colors">
            {algorithm.name}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {algorithm.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Time:</span>
              <ComplexityBadge complexity={algorithm.timeComplexity.average} size="sm" />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Space:</span>
              <ComplexityBadge complexity={algorithm.spaceComplexity} size="sm" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
