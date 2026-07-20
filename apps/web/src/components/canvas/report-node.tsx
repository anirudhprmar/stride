"use client";

import { Handle, Position } from "@xyflow/react";
import {
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckSquare,
  Loader2,
} from "lucide-react";

interface FixProps {
  rank: number;
  change: string;
  personas: string;
  impact: string;
  effort: string;
  confidence: string;
}

interface ExperimentProps {
  title: string;
  hypothesis: string;
  change: string;
  measure: string;
  success: string;
}

interface ReportResult {
  title: string;
  verdict: string;
  biggest_leak?: {
    title: string;
    detail: string;
    evidence: string;
  };
  fixes?: FixProps[];
  experiment?: ExperimentProps;
}

interface ReportNodeData {
  isAnalyzing: boolean;
  result?: ReportResult;
}

export default function ReportNode({ data }: { data: ReportNodeData }) {
  const { isAnalyzing, result } = data;

  return (
    <div className="bg-card text-card-foreground border-border max-w-100 min-w-85 rounded-xl border p-5 shadow-xl backdrop-blur-md">
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        className="bg-primary! border-background h-3! w-3! border-2"
      />

      <div className="mb-3 flex items-center gap-2 border-b pb-3">
        <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-500">
          <Sparkles className="size-4" />
        </div>
        <h3 className="font-serif text-base font-semibold">
          CRO Synthesized Report
        </h3>
      </div>

      {result ? (
        <div className="space-y-4 text-xs">
          {/* Verdict */}
          <div>
            <h4 className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-wider uppercase">
              Verdict
            </h4>
            <p className="text-sm leading-relaxed font-medium">
              {result.verdict}
            </p>
          </div>

          {/* Biggest Leak */}
          {result.biggest_leak && (
            <div className="space-y-1.5 rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
              <div className="flex items-center gap-1.5 font-semibold text-rose-500">
                <AlertTriangle className="size-3.5" />
                <span>Biggest Conversion Leak</span>
              </div>
              <h5 className="text-sm font-semibold">
                {result.biggest_leak.title}
              </h5>
              <p className="text-muted-foreground text-[11px] leading-snug">
                {result.biggest_leak.detail}
              </p>
              <p className="text-muted-foreground/80 text-[10px] italic">
                Evidence: {result.biggest_leak.evidence}
              </p>
            </div>
          )}

          {/* Prioritized Fixes */}
          {result.fixes && result.fixes.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-muted-foreground flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase">
                <CheckSquare className="size-3" />
                <span>Top Recommendations</span>
              </h4>
              <div className="space-y-1.5">
                {result.fixes.slice(0, 3).map((fix) => (
                  <div
                    key={fix.rank}
                    className="bg-muted/30 flex items-start gap-2 rounded border p-2"
                  >
                    <span className="bg-primary/10 text-primary mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold">
                      {fix.rank}
                    </span>
                    <div className="flex-1 space-y-1">
                      <p className="text-foreground/90 leading-tight font-medium">
                        {fix.change}
                      </p>
                      <div className="text-muted-foreground flex flex-wrap gap-1 text-[9px]">
                        <span className="bg-muted rounded px-1.5 py-0.5">
                          Impact: {fix.impact}
                        </span>
                        <span className="bg-muted rounded px-1.5 py-0.5">
                          Effort: {fix.effort}
                        </span>
                        <span className="bg-muted rounded px-1.5 py-0.5">
                          Conf: {fix.confidence}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Proposed Experiment */}
          {result.experiment && (
            <div className="space-y-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-500">
                <Lightbulb className="size-3.5" />
                <span>Proposed Experiment: {result.experiment.title}</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-snug">
                <span className="text-foreground/80 font-semibold">
                  Hypothesis:
                </span>{" "}
                {result.experiment.hypothesis}
              </p>
              <p className="text-muted-foreground text-[11px] leading-snug">
                <span className="text-foreground/80 font-semibold">
                  Change:
                </span>{" "}
                {result.experiment.change}
              </p>
            </div>
          )}
        </div>
      ) : isAnalyzing ? (
        <div className="flex flex-col items-center justify-center space-y-3 py-8 text-center">
          <Loader2 className="text-primary size-8 animate-spin" />
          <div className="space-y-1">
            <p className="text-foreground/90 text-sm font-medium">
              AI Strategist Synthesizing...
            </p>
            <p className="text-muted-foreground text-[11px]">
              Combining persona results into actionable CRO tactics
            </p>
          </div>
        </div>
      ) : (
        <div className="text-muted-foreground py-8 text-center text-xs italic">
          Report will generate once persona simulations are complete.
        </div>
      )}
    </div>
  );
}
