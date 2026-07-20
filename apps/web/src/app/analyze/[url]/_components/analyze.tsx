"use client";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import WebsiteDetailsForm from "@/components/forms/website-details-form";
import PersonasForm, { Persona } from "@/components/forms/personas-form";

export default function AnalyzeClient({ url }: { url: string }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [websiteDetails, setWebsiteDetails] = useState<{
    industry: string[];
    analysisObjectives: string;
  } | null>(null);
  const [allPersonas, setAllPersonas] = useState<Persona[]>([]);

  return (
    <div className="relative container mx-auto max-w-2xl px-4 py-8">
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
              setProgress((step / 2) * 100);
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
            setCurrentState={(step) => {
              setCurrentStep(step);
              setProgress((step / 2) * 100);
            }}
            allPersonas={(values) => {
              setAllPersonas(values);
            }}
          />
        </div>
      )}
    </div>
  );
}
