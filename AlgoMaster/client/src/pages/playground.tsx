import { useState, useEffect, useCallback } from "react";
import { useSearch } from "wouter";
import { Play, RotateCcw, Copy, Check, Terminal, Code2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const codeTemplates = {
  "bubble-sort": `function bubbleSort(arr) {
  const n = arr.length;
  let swapped;
  
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

// Test the function
const testArray = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", testArray);
console.log("Sorted:", bubbleSort([...testArray]));`,

  "binary-search": `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    console.log(\`Searching: left=\${left}, mid=\${mid}, right=\${right}\`);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// Test the function
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log("Array:", sortedArray);
console.log("\\nSearching for 7:");
console.log("Found at index:", binarySearch(sortedArray, 7));
console.log("\\nSearching for 10:");
console.log("Found at index:", binarySearch(sortedArray, 10));`,

  "stack": `class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
    console.log(\`Pushed: \${element}\`);
  }
  
  pop() {
    if (this.isEmpty()) return "Stack is empty";
    const item = this.items.pop();
    console.log(\`Popped: \${item}\`);
    return item;
  }
  
  peek() {
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  print() {
    console.log("Stack:", this.items.join(" -> "));
  }
}

// Test the stack
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
stack.print();
stack.pop();
stack.print();
console.log("Top element:", stack.peek());`,

  "linked-list": `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }
  
  print() {
    const elements = [];
    let current = this.head;
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    console.log(elements.join(" -> ") + " -> null");
  }
}

// Test the linked list
const list = new LinkedList();
list.append(10);
list.append(20);
list.append(30);
console.log("Linked List:");
list.print();`,

  "custom": `// Write your code here
// You can test any JavaScript code!

function example() {
  const data = [1, 2, 3, 4, 5];
  console.log("Data:", data);
  console.log("Sum:", data.reduce((a, b) => a + b, 0));
  console.log("Doubled:", data.map(x => x * 2));
}

example();`,
};

export default function PlaygroundPage() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const codeParam = params.get("code");
  
  const [code, setCode] = useState(codeParam ? decodeURIComponent(codeParam) : codeTemplates["custom"]);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("custom");

  useEffect(() => {
    if (codeParam) {
      setCode(decodeURIComponent(codeParam));
      setSelectedTemplate("custom");
    }
  }, [codeParam]);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput([]);
    setError(null);

    const logs: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
      logs.push(args.map((arg) => 
        typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(" "));
    };

    console.error = (...args) => {
      logs.push(`[Error] ${args.map((arg) => 
        typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(" ")}`);
    };

    console.warn = (...args) => {
      logs.push(`[Warning] ${args.map((arg) => 
        typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(" ")}`);
    };

    try {
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      const fn = new AsyncFunction(code);
      
      Promise.resolve(fn())
        .then(() => {
          setOutput(logs);
          setIsRunning(false);
        })
        .catch((err) => {
          setError(err.message || "An error occurred");
          setOutput(logs);
          setIsRunning(false);
        })
        .finally(() => {
          console.log = originalLog;
          console.error = originalError;
          console.warn = originalWarn;
        });
    } catch (err: any) {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      setError(err.message || "An error occurred");
      setOutput(logs);
      setIsRunning(false);
    }
  }, [code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setOutput([]);
    setError(null);
  };

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
    setCode(codeTemplates[template as keyof typeof codeTemplates]);
    setOutput([]);
    setError(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Code Playground</h1>
        <p className="text-lg text-muted-foreground">
          Write, test, and experiment with data structures and algorithms in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader className="flex-shrink-0 pb-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Code Editor</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                  <SelectTrigger className="w-40" data-testid="select-template">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Custom Code</SelectItem>
                    <SelectItem value="bubble-sort">Bubble Sort</SelectItem>
                    <SelectItem value="binary-search">Binary Search</SelectItem>
                    <SelectItem value="stack">Stack</SelectItem>
                    <SelectItem value="linked-list">Linked List</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleCopy}
                  data-testid="button-copy"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <CardDescription>
              Write JavaScript code and click Run to execute
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 min-h-[400px] font-mono text-sm resize-none bg-zinc-950 dark:bg-zinc-900 text-zinc-100 border-zinc-800"
              placeholder="// Write your code here..."
              data-testid="textarea-code"
            />
            <div className="flex items-center gap-2 mt-4">
              <Button
                onClick={runCode}
                disabled={isRunning}
                className="gap-2"
                data-testid="button-run"
              >
                <Play className="h-4 w-4" />
                {isRunning ? "Running..." : "Run Code"}
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="gap-2"
                data-testid="button-clear"
              >
                <RotateCcw className="h-4 w-4" />
                Clear Output
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex-shrink-0 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Output</CardTitle>
            </div>
            <CardDescription>
              Console output and results will appear here
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div
              className="min-h-[400px] p-4 rounded-lg bg-zinc-950 dark:bg-zinc-900 font-mono text-sm overflow-auto"
              data-testid="output-container"
            >
              {error && (
                <div className="flex items-start gap-2 text-red-400 mb-4 p-3 rounded bg-red-500/10 border border-red-500/20">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Error</p>
                    <p className="text-red-300">{error}</p>
                  </div>
                </div>
              )}
              {output.length > 0 ? (
                <div className="space-y-1">
                  {output.map((line, index) => (
                    <div
                      key={index}
                      className={`whitespace-pre-wrap ${
                        line.startsWith("[Error]")
                          ? "text-red-400"
                          : line.startsWith("[Warning]")
                          ? "text-yellow-400"
                          : "text-zinc-100"
                      }`}
                    >
                      <span className="text-zinc-500 select-none mr-2">{index + 1}.</span>
                      {line}
                    </div>
                  ))}
                </div>
              ) : !error ? (
                <div className="text-zinc-500 flex items-center justify-center h-full">
                  <div className="text-center">
                    <Terminal className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Click "Run Code" to see the output</p>
                  </div>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2">Use console.log()</h4>
              <p className="text-sm text-muted-foreground">
                Print values to the output panel using console.log() to debug and see results.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2">Try Templates</h4>
              <p className="text-sm text-muted-foreground">
                Select from pre-built templates to quickly experiment with common algorithms.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2">Safe Execution</h4>
              <p className="text-sm text-muted-foreground">
                Code runs in a sandboxed environment. Avoid infinite loops as they may freeze the browser.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
