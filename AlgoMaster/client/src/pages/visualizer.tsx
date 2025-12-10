import { useState, useEffect, useCallback, useRef } from "react";
import { useSearch } from "wouter";
import { Play, Pause, RotateCcw, SkipForward, SkipBack, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { algorithms } from "@shared/schema";

const sortingAlgorithms = algorithms.filter((a) => a.category === "sorting");

interface ArrayBar {
  value: number;
  state: "default" | "comparing" | "swapping" | "sorted" | "pivot";
}

function generateRandomArray(size: number): ArrayBar[] {
  return Array.from({ length: size }, () => ({
    value: Math.floor(Math.random() * 100) + 5,
    state: "default" as const,
  }));
}

export default function VisualizerPage() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const algParam = params.get("alg");
  
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algParam || "bubble-sort");
  const [baseArray, setBaseArray] = useState<ArrayBar[]>(() => generateRandomArray(20));
  const [displayArray, setDisplayArray] = useState<ArrayBar[]>([]);
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const stepsRef = useRef<{ array: ArrayBar[]; comparisons: number; swaps: number }[]>([]);
  const currentStepRef = useRef(0);

  const algorithm = sortingAlgorithms.find((a) => a.slug === selectedAlgorithm);

  const generateSortingSteps = useCallback((arr: ArrayBar[], algorithmSlug: string) => {
    const steps: { array: ArrayBar[]; comparisons: number; swaps: number }[] = [];
    const workingArray: ArrayBar[] = arr.map((item) => ({ ...item, state: "default" as ArrayBar["state"] }));
    let compCount = 0;
    let swapCount = 0;

    const addStep = (indices: number[], state: "comparing" | "swapping" | "sorted" | "pivot") => {
      const stepArray: ArrayBar[] = workingArray.map((item, i) => ({
        ...item,
        state: indices.includes(i) ? state : (item.state as ArrayBar["state"]) === "sorted" ? "sorted" as const : "default" as const,
      }));
      steps.push({ array: stepArray.map((a) => ({ ...a })), comparisons: compCount, swaps: swapCount });
    };

    if (algorithmSlug === "bubble-sort") {
      const n = workingArray.length;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          compCount++;
          addStep([j, j + 1], "comparing");
          if (workingArray[j].value > workingArray[j + 1].value) {
            swapCount++;
            [workingArray[j], workingArray[j + 1]] = [workingArray[j + 1], workingArray[j]];
            addStep([j, j + 1], "swapping");
          }
        }
        workingArray[n - i - 1].state = "sorted";
        addStep([n - i - 1], "sorted");
      }
      workingArray[0].state = "sorted";
      addStep([0], "sorted");
    } else if (algorithmSlug === "selection-sort") {
      const n = workingArray.length;
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
          compCount++;
          addStep([minIdx, j], "comparing");
          if (workingArray[j].value < workingArray[minIdx].value) {
            minIdx = j;
          }
        }
        if (minIdx !== i) {
          swapCount++;
          [workingArray[i], workingArray[minIdx]] = [workingArray[minIdx], workingArray[i]];
          addStep([i, minIdx], "swapping");
        }
        workingArray[i].state = "sorted";
        addStep([i], "sorted");
      }
      workingArray[n - 1].state = "sorted";
      addStep([n - 1], "sorted");
    } else if (algorithmSlug === "insertion-sort") {
      const n = workingArray.length;
      workingArray[0].state = "sorted";
      addStep([0], "sorted");
      for (let i = 1; i < n; i++) {
        const key = workingArray[i];
        let j = i - 1;
        addStep([i], "comparing");
        while (j >= 0 && workingArray[j].value > key.value) {
          compCount++;
          swapCount++;
          workingArray[j + 1] = workingArray[j];
          addStep([j, j + 1], "swapping");
          j--;
        }
        workingArray[j + 1] = key;
        workingArray[i].state = "sorted";
        for (let k = 0; k <= i; k++) {
          workingArray[k].state = "sorted";
        }
        addStep(Array.from({ length: i + 1 }, (_, k) => k), "sorted");
      }
    } else if (algorithmSlug === "quick-sort") {
      const quickSort = (low: number, high: number) => {
        if (low < high) {
          const pivotIdx = partition(low, high);
          quickSort(low, pivotIdx - 1);
          quickSort(pivotIdx + 1, high);
        } else if (low === high) {
          workingArray[low].state = "sorted";
          addStep([low], "sorted");
        }
      };

      const partition = (low: number, high: number): number => {
        const pivot = workingArray[high].value;
        addStep([high], "pivot");
        let i = low - 1;
        for (let j = low; j < high; j++) {
          compCount++;
          addStep([j, high], "comparing");
          if (workingArray[j].value < pivot) {
            i++;
            if (i !== j) {
              swapCount++;
              [workingArray[i], workingArray[j]] = [workingArray[j], workingArray[i]];
              addStep([i, j], "swapping");
            }
          }
        }
        swapCount++;
        [workingArray[i + 1], workingArray[high]] = [workingArray[high], workingArray[i + 1]];
        addStep([i + 1, high], "swapping");
        workingArray[i + 1].state = "sorted";
        addStep([i + 1], "sorted");
        return i + 1;
      };

      quickSort(0, workingArray.length - 1);
    } else if (algorithmSlug === "merge-sort") {
      const merge = (start: number, mid: number, end: number) => {
        const left = workingArray.slice(start, mid + 1);
        const right = workingArray.slice(mid + 1, end + 1);
        let i = 0, j = 0, k = start;

        while (i < left.length && j < right.length) {
          compCount++;
          addStep([start + i, mid + 1 + j], "comparing");
          if (left[i].value <= right[j].value) {
            workingArray[k] = left[i];
            i++;
          } else {
            workingArray[k] = right[j];
            j++;
            swapCount++;
          }
          addStep([k], "swapping");
          k++;
        }

        while (i < left.length) {
          workingArray[k] = left[i];
          addStep([k], "swapping");
          i++;
          k++;
        }

        while (j < right.length) {
          workingArray[k] = right[j];
          addStep([k], "swapping");
          j++;
          k++;
        }
      };

      const mergeSort = (start: number, end: number) => {
        if (start < end) {
          const mid = Math.floor((start + end) / 2);
          mergeSort(start, mid);
          mergeSort(mid + 1, end);
          merge(start, mid, end);
        }
      };

      mergeSort(0, workingArray.length - 1);
      workingArray.forEach((item) => (item.state = "sorted"));
      addStep(Array.from({ length: workingArray.length }, (_, i) => i), "sorted");
    }

    return steps;
  }, []);

  useEffect(() => {
    const steps = generateSortingSteps(baseArray, selectedAlgorithm);
    stepsRef.current = steps;
    setTotalSteps(steps.length);
    setCurrentStep(0);
    currentStepRef.current = 0;
    setComparisons(0);
    setSwaps(0);
    setDisplayArray(baseArray.map(item => ({ ...item, state: "default" as const })));
  }, [baseArray, selectedAlgorithm, generateSortingSteps]);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    if (isPlaying && currentStepRef.current < totalSteps) {
      const delay = Math.max(10, 200 - speed * 2);
      animationRef.current = setTimeout(() => {
        const stepIndex = currentStepRef.current;
        const step = stepsRef.current[stepIndex];
        if (step) {
          setDisplayArray(step.array);
          setComparisons(step.comparisons);
          setSwaps(step.swaps);
          setCurrentStep(stepIndex + 1);
        } else {
          setIsPlaying(false);
        }
      }, delay);
    } else if (currentStepRef.current >= totalSteps && isPlaying) {
      setIsPlaying(false);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isPlaying, currentStep, totalSteps, speed]);

  const handlePlay = () => {
    if (currentStep >= totalSteps) {
      setCurrentStep(0);
      currentStepRef.current = 0;
      setComparisons(0);
      setSwaps(0);
      setDisplayArray(baseArray.map((item) => ({ ...item, state: "default" as const })));
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    currentStepRef.current = 0;
    setComparisons(0);
    setSwaps(0);
    setDisplayArray(baseArray.map((item) => ({ ...item, state: "default" as const })));
  };

  const handleStepForward = () => {
    if (currentStep < totalSteps) {
      const step = stepsRef.current[currentStep];
      if (step) {
        setDisplayArray(step.array);
        setComparisons(step.comparisons);
        setSwaps(step.swaps);
      }
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      currentStepRef.current = newStep;
    }
  };

  const handleStepBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      currentStepRef.current = prevStep;
      if (prevStep > 0) {
        const step = stepsRef.current[prevStep - 1];
        if (step) {
          setDisplayArray(step.array);
          setComparisons(step.comparisons);
          setSwaps(step.swaps);
        }
      } else {
        setDisplayArray(baseArray.map((item) => ({ ...item, state: "default" as const })));
        setComparisons(0);
        setSwaps(0);
      }
    }
  };

  const handleShuffle = () => {
    setIsPlaying(false);
    const newArray = generateRandomArray(arraySize);
    setBaseArray(newArray);
  };

  const handleSizeChange = (value: number[]) => {
    setArraySize(value[0]);
    setIsPlaying(false);
    const newArray = generateRandomArray(value[0]);
    setBaseArray(newArray);
  };

  const getBarColor = (state: ArrayBar["state"]) => {
    switch (state) {
      case "comparing":
        return "bg-yellow-500";
      case "swapping":
        return "bg-red-500";
      case "sorted":
        return "bg-green-500";
      case "pivot":
        return "bg-purple-500";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Algorithm Visualizer</h1>
        <p className="text-lg text-muted-foreground">
          Watch sorting algorithms in action with step-by-step visualizations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Algorithm</label>
              <Select
                value={selectedAlgorithm}
                onValueChange={(value) => {
                  setSelectedAlgorithm(value);
                  handleReset();
                }}
              >
                <SelectTrigger data-testid="select-algorithm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortingAlgorithms.map((alg) => (
                    <SelectItem key={alg.slug} value={alg.slug} data-testid={`option-${alg.slug}`}>
                      {alg.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Array Size: {arraySize}</label>
              <Slider
                value={[arraySize]}
                onValueChange={handleSizeChange}
                min={5}
                max={50}
                step={1}
                data-testid="slider-array-size"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Speed: {speed}%</label>
              <Slider
                value={[speed]}
                onValueChange={(value) => setSpeed(value[0])}
                min={1}
                max={100}
                step={1}
                data-testid="slider-speed"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={handleStepBack}
                disabled={currentStep === 0 || isPlaying}
                data-testid="button-step-back"
                aria-label="Step back"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              {isPlaying ? (
                <Button
                  size="icon"
                  onClick={handlePause}
                  data-testid="button-pause"
                  aria-label="Pause"
                >
                  <Pause className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  size="icon"
                  onClick={handlePlay}
                  data-testid="button-play"
                  aria-label="Play"
                >
                  <Play className="h-4 w-4" />
                </Button>
              )}
              <Button
                size="icon"
                variant="outline"
                onClick={handleStepForward}
                disabled={currentStep >= totalSteps || isPlaying}
                data-testid="button-step-forward"
                aria-label="Step forward"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={handleReset}
                data-testid="button-reset"
                aria-label="Reset"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={handleShuffle}
                data-testid="button-shuffle"
                aria-label="Generate new array"
              >
                <Shuffle className="h-4 w-4" />
              </Button>
            </div>

            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Step</span>
                <span className="font-mono">{currentStep} / {totalSteps}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Comparisons</span>
                <span className="font-mono">{comparisons}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Swaps</span>
                <span className="font-mono">{swaps}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-2">
              <p className="text-sm font-medium mb-3">Legend</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-primary" />
                  <span>Default</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-500" />
                  <span>Comparing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500" />
                  <span>Swapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500" />
                  <span>Sorted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-purple-500" />
                  <span>Pivot</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">{algorithm?.name || "Visualization"}</CardTitle>
            <CardDescription>
              {algorithm?.description || "Select an algorithm to visualize"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="flex items-end justify-center gap-[2px] h-64 md:h-80 bg-muted/30 rounded-lg p-4"
              data-testid="visualization-container"
            >
              {displayArray.map((bar, index) => (
                <div
                  key={index}
                  className={`transition-all duration-75 rounded-t ${getBarColor(bar.state)}`}
                  style={{
                    height: `${(bar.value / 105) * 100}%`,
                    width: `${Math.max(100 / displayArray.length - 0.5, 2)}%`,
                  }}
                  data-testid={`bar-${index}`}
                />
              ))}
            </div>

            {algorithm && (
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30">
                    Time: {algorithm.timeComplexity.average}
                  </Badge>
                  <Badge variant="outline" className="bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30">
                    Space: {algorithm.spaceComplexity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{algorithm.definition}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
