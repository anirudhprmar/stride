"use client";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import WebsiteDetailsForm from "@/components/forms/website-details-form";
import PersonasForm from "@/components/forms/personas-form";

export default function AnalyzeClient({ url }: { url: string }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);

  return (
    <div className="relative container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8">
        <Progress
          value={progress}
          className="w-full h-1 absolute top-0 inset-x-0"
        />
      </div>
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <h1 className="text-3xl font-serif tracking-tight font-normal">
              Website Details
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Configure target audience and objectives for {url}
            </p>
          </div>
          <WebsiteDetailsForm
            setCurrentState={(step) => {
              setCurrentStep(step);
              setProgress((step / 2) * 100);
            }}
          />
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <h1 className="text-3xl font-serif tracking-tight font-normal">
              Create Personas
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Create unique visitor personas to simulate
            </p>
          </div>
          <PersonasForm
            setCurrentState={(step) => {
              setCurrentStep(step);
              setProgress((step / 2) * 100);
            }}
          />
        </div>
      )}
    </div>
  );
}
