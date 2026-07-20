"use client";

import { Handle, Position } from "@xyflow/react";
import { Globe, Loader2, CheckCircle2 } from "lucide-react";

interface StoreNodeData {
  url: string;
  isAnalyzing: boolean;
  title?: string;
  metaDescription?: string;
}

export default function StoreNode({ data }: { data: StoreNodeData }) {
  const displayUrl = data.url;

  return (
    <div className="bg-card text-card-foreground border-border max-w-[320px] min-w-70 rounded-xl border p-4 shadow-xl backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary rounded-lg p-2">
          <Globe className="size-5" />
        </div>
        <div className="flex-1 overflow-hidden">
          <h4 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Target Store
          </h4>
          <p className="truncate text-sm font-semibold">{displayUrl}</p>
        </div>
        {data.isAnalyzing && !data.title ? (
          <Loader2 className="text-primary size-4 animate-spin" />
        ) : (
          <CheckCircle2 className="size-4 text-emerald-500" />
        )}
      </div>

      {(data.title || data.metaDescription) && (
        <div className="mt-3 space-y-1.5 border-t pt-3 text-xs">
          {data.title && (
            <div>
              <span className="text-muted-foreground font-semibold">
                Title:{" "}
              </span>
              <span className="font-normal">{data.title}</span>
            </div>
          )}
          {data.metaDescription && (
            <div className="line-clamp-2">
              <span className="text-muted-foreground font-semibold">
                Description:{" "}
              </span>
              <span className="text-muted-foreground/80 font-normal">
                {data.metaDescription}
              </span>
            </div>
          )}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        className="bg-primary! border-background h-3! w-3! border-2"
      />
    </div>
  );
}
