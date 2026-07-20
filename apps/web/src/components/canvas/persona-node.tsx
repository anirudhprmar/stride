"use client";

import { Handle, Position } from "@xyflow/react";
import { User, Loader2, Award, CheckCircle } from "lucide-react";
import { Persona } from "@/components/forms/personas-form";

interface PersonaResult {
  score: number;
  clarity: number;
  insights: string[];
  priority: string;
  recommendedChanges: string[];
}

interface PersonaNodeData {
  persona: Persona;
  isAnalyzing: boolean;
  result?: PersonaResult;
}

export default function PersonaNode({ data }: { data: PersonaNodeData }) {
  const { persona, isAnalyzing, result } = data;

  // Compute color based on score
  const getScoreColorClass = (score: number) => {
    if (score >= 80)
      return "text-emerald-500 border-emerald-500/20 bg-emerald-500/5";
    if (score >= 50) return "text-amber-500 border-amber-500/20 bg-amber-500/5";
    return "text-rose-500 border-rose-500/20 bg-rose-500/5";
  };

  return (
    <div className="bg-card text-card-foreground border-border max-w-[320px] min-w-70 rounded-xl border p-4 shadow-xl backdrop-blur-md">
      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        className="bg-primary! border-background h-3! w-3! border-2"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-secondary text-secondary-foreground rounded-full p-2">
            <User className="size-4" />
          </div>
          <div>
            <h3 className="text-sm leading-tight font-semibold">
              {persona.name}
            </h3>
            <p className="text-muted-foreground text-[10px]">
              {persona.age}y • {persona.occupation || "Shopper"} •{" "}
              {persona.region || "Global"}
            </p>
          </div>
        </div>

        {result ? (
          <div
            className={`rounded-lg border px-2 py-1 text-center font-serif text-sm font-semibold ${getScoreColorClass(result.score)}`}
          >
            {Math.round(result.score)}%
          </div>
        ) : isAnalyzing ? (
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <Loader2 className="text-primary size-3 animate-spin" />
            <span>Simulating...</span>
          </div>
        ) : (
          <div className="text-muted-foreground border-border bg-muted/20 rounded border px-1.5 py-0.5 text-[10px]">
            Pending
          </div>
        )}
      </div>

      {result ? (
        <div className="mt-3 space-y-2 border-t pt-3 text-xs">
          <div>
            <span className="text-muted-foreground font-semibold">
              Priority Fixes:{" "}
            </span>
            <span
              className={`font-semibold ${
                result.priority === "High"
                  ? "text-rose-500"
                  : result.priority === "Medium"
                    ? "text-amber-500"
                    : "text-emerald-500"
              }`}
            >
              {result.priority}
            </span>
          </div>

          {result.insights && result.insights.length > 0 && (
            <div className="space-y-1">
              <span className="text-muted-foreground font-semibold">
                Key Friction Points:
              </span>
              <ul className="text-muted-foreground/90 list-disc space-y-0.5 pl-4">
                {result.insights.slice(0, 2).map((insight, idx) => (
                  <li key={idx} className="line-clamp-2">
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="text-muted-foreground mt-3 border-t pt-3 text-[11px] italic">
          "{persona.shoppingMotivations || "Wants a frictionless checkout."}"
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="bg-primary! border-background h-3! w-3! border-2"
      />
    </div>
  );
}
