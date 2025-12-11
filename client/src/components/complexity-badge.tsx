import { Badge } from "@/components/ui/badge";
import type { ComplexityLevel } from "@shared/schema";

interface ComplexityBadgeProps {
  complexity: ComplexityLevel;
  label?: string;
  size?: "sm" | "default";
}

const complexityColors: Record<ComplexityLevel, string> = {
  "O(1)": "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  "O(log n)": "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30",
  "O(n)": "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
  "O(n log n)": "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30",
  "O(n²)": "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30",
  "O(2^n)": "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30",
};

export function ComplexityBadge({ complexity, label, size = "default" }: ComplexityBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={`${complexityColors[complexity]} font-mono ${size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"}`}
      data-testid={`badge-complexity-${complexity.replace(/[()]/g, "").replace(" ", "-")}`}
    >
      {label ? `${label}: ${complexity}` : complexity}
    </Badge>
  );
}
