"use client";

import { useState, useEffect } from "react";
import { Persona } from "@/components/forms/personas-form";
import { safeJsonParse } from "@/lib/utils";

interface UseAnalysisProps {
  url: string;
  personas: Persona[];
  websiteDetails: {
    industry: string[];
    analysisObjectives: string;
  } | null;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  setProgress: (progress: number) => void;
}

export default function useAnalysis({
  url,
  personas,
  websiteDetails,
  currentStep,
  setCurrentStep,
  setProgress,
}: UseAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [scrapedData, setScrapedData] = useState<{
    title: string;
    metaDescription: string;
  } | null>(null);

  useEffect(() => {
    if (currentStep !== 3) return;

    let active = true;
    setIsAnalyzing(true);
    setAnalysisError(null);

    const runAnalysis = async () => {
      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
            personas,
            industry: websiteDetails?.industry,
            analysisObjectives: websiteDetails?.analysisObjectives,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          const message =
            data.error ||
            data.details?.[0]?.message ||
            "Failed to run analysis. Please try again.";
          throw new Error(message);
        }

        if (data.error) {
          throw new Error(data.error);
        }

        if (active) {
          const parsedReport = safeJsonParse(data.fullReport);

          setScrapedData(data.storeInfo || null);
          setAnalysisResult({
            analyzedPersonas: data.analyzedPersonas,
            fullReport: parsedReport,
          });
          setIsAnalyzing(false);
          setCurrentStep(4);
          setProgress((4 / 4) * 100);
        }
      } catch (err: any) {
        if (active) {
          setAnalysisError(err.message || "An unexpected error occurred.");
          setIsAnalyzing(false);
        }
      }
    };

    runAnalysis();

    return () => {
      active = false;
    };
  }, [currentStep, url, personas, websiteDetails, setCurrentStep]);

  const reset = () => {
    setAnalysisResult(null);
    setScrapedData(null);
    setAnalysisError(null);
    setIsAnalyzing(false);
    setCurrentStep(1);
    setProgress(0);
  };

  return {
    isAnalyzing,
    analysisResult,
    analysisError,
    scrapedData,
    setAnalysisError,
    reset,
  };
}
