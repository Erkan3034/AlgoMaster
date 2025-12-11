import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  title?: string;
}

export function CodeBlock({ code, language = "javascript", showLineNumbers = true, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="relative rounded-lg overflow-hidden border border-border bg-zinc-950 dark:bg-zinc-900" data-testid="code-block">
      {title && (
        <div className="flex items-center justify-between gap-4 px-4 py-2 border-b border-zinc-800 bg-zinc-900 dark:bg-zinc-950">
          <span className="text-sm text-zinc-400 font-medium">{title}</span>
          <span className="text-xs text-zinc-500 font-mono uppercase">{language}</span>
        </div>
      )}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 z-10"
          data-testid="button-copy-code"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
          <code className="font-mono text-zinc-100">
            {lines.map((line, index) => (
              <div key={index} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell pr-4 text-right text-zinc-600 select-none w-8">
                    {index + 1}
                  </span>
                )}
                <span className="table-cell whitespace-pre">{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
