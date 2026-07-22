"use client";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import WebsiteDetailsForm from "@/components/forms/website-details-form";
import PersonasForm, { Persona } from "@/components/forms/personas-form";
import ResultsCanvas from "./results-canvas";
import useAnalysis from "../../../../hooks/useAnalysis";
import { cn } from "@/lib/utils";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnalyzeClient({ url }: { url: string }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [websiteDetails, setWebsiteDetails] = useState<{
    industry: string[];
    analysisObjectives: string;
  } | null>(null);
  const [allPersonas, setAllPersonas] = useState<Persona[]>([]);

  const {
    isAnalyzing,
    analysisResult,
    analysisError,
    scrapedData,
    setAnalysisError,
    reset,
  } = useAnalysis({
    url,
    personas: allPersonas,
    websiteDetails,
    currentStep,
    setCurrentStep,
    setProgress,
  });

  const isCanvasView = currentStep === 3 || currentStep === 4;
  return (
    <div
      className={cn(
        "relative container mx-auto px-4 py-8 transition-all duration-500 ease-in-out",
        isCanvasView ? "max-w-6xl" : "max-w-2xl",
      )}
    >
      <div className="mb-8">
        <Progress
          value={progress}
          className="absolute inset-x-0 top-0 h-1 w-full"
        />
      </div>

      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="border-border border-b pb-4">
            <h1 className="font-serif text-3xl font-normal tracking-tight">
              Website Details
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Configure target audience and objectives for {url}
            </p>
          </div>
          <WebsiteDetailsForm
            setCurrentState={(step) => {
              setCurrentStep(step);
              setProgress((step / 4) * 100);
            }}
            formResults={(values) => {
              setWebsiteDetails(values);
            }}
          />
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="border-border border-b pb-4">
            <h1 className="font-serif text-3xl font-normal tracking-tight">
              Create Personas
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Create unique visitor personas to simulate
            </p>
          </div>
          <PersonasForm
            setCurrentState={setCurrentStep}
            allPersonas={(values) => {
              setAllPersonas(values);
            }}
            setProgress={setProgress}
          />
        </div>
      )}

      {isCanvasView && !analysisError && (
        <div className="space-y-6">
          <div className="border-border flex items-end justify-between border-b pb-4">
            <div>
              <h1 className="font-serif text-3xl font-normal tracking-tight">
                Simulation Workspace
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                {isAnalyzing
                  ? `Simulating customer journeys on ${url}...`
                  : `Journey simulations completed for ${url}`}
              </p>
            </div>
            {!isAnalyzing && (
              <Button
                variant="outline"
                size="sm"
                onClick={reset}
                className="flex items-center gap-1.5"
              >
                <RotateCcw className="size-3.5" />
                Reset Workspace
              </Button>
            )}
          </div>
          <ResultsCanvas
            url={url}
            personas={allPersonas}
            isAnalyzing={isAnalyzing}
            analysisResult={analysisResult}
            scrapedData={scrapedData}
          />
        </div>
      )}

      {analysisError && (
        <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-4 py-12 text-center">
          <div className="rounded-full bg-rose-500/10 p-3 text-rose-500">
            <AlertCircle className="size-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Simulation Failed</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {analysisError}
            </p>
          </div>
          <Button
            onClick={() => {
              setCurrentStep(3);
              setAnalysisError(null);
            }}
            className="flex items-center gap-2"
          >
            <RotateCcw className="size-4" />
            Retry Simulation
          </Button>
        </div>
      )}
    </div>
  );
}
