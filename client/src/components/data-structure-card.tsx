import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplexityBadge } from "./complexity-badge";
import type { DataStructure } from "@shared/schema";
import * as Icons from "lucide-react";

interface DataStructureCardProps {
  dataStructure: DataStructure;
}

export function DataStructureCard({ dataStructure }: DataStructureCardProps) {
  const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[dataStructure.icon] || Icons.Box;

  return (
    <Link href={`/data-structures/${dataStructure.slug}`}>
      <Card 
        className="h-full hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 group"
        data-testid={`card-data-structure-${dataStructure.slug}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
              <IconComponent className="h-6 w-6" />
            </div>
            <ComplexityBadge complexity={dataStructure.complexity.access} label="Access" size="sm" />
          </div>
          <CardTitle className="mt-3 text-lg group-hover:text-primary transition-colors">
            {dataStructure.name}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {dataStructure.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            <ComplexityBadge complexity={dataStructure.complexity.search} label="Search" size="sm" />
            <ComplexityBadge complexity={dataStructure.complexity.insert} label="Insert" size="sm" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
