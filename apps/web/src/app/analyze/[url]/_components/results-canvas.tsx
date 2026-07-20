"use client";

import { useEffect, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import StoreNode from "@/components/canvas/store-node";
import PersonaNode from "@/components/canvas/persona-node";
import ReportNode from "@/components/canvas/report-node";
import { Persona } from "@/components/forms/personas-form";

interface PersonaResult {
  personaName: string;
  score: number;
  clarity: number;
  insights: string[];
  priority: string;
  recommendedChanges: string[];
}

interface ResultsCanvasProps {
  url: string;
  personas: Persona[];
  isAnalyzing: boolean;
  analysisResult: {
    analyzedPersonas: PersonaResult[];
    fullReport: any;
  } | null;
  scrapedData: {
    title: string;
    metaDescription: string;
  } | null;
}

const nodeTypes = {
  storeNode: StoreNode,
  personaNode: PersonaNode,
  reportNode: ReportNode,
};

export default function ResultsCanvas({
  url,
  personas,
  isAnalyzing,
  analysisResult,
  scrapedData,
}: ResultsCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const layout = useMemo(() => {
    const numPersonas = personas.length || 1;
    const personaHeight = 240;
    const personaSpacing = 40;
    const colHeight =
      numPersonas * personaHeight + (numPersonas - 1) * personaSpacing;
    const centerY = colHeight / 2 - 100;

    return { centerY, personaHeight, personaSpacing };
  }, [personas]);

  useEffect(() => {
    const { centerY, personaHeight, personaSpacing } = layout;

    // 1. Store Node
    const storeNode = {
      id: "store",
      type: "storeNode",
      position: { x: 50, y: Math.max(centerY, 50) },
      data: {
        url,
        isAnalyzing,
        title: scrapedData?.title,
        metaDescription: scrapedData?.metaDescription,
      },
    };

    // 2. Persona Nodes
    const personaNodes = personas.map((persona, index) => {
      const result = analysisResult?.analyzedPersonas?.find(
        (p) => p.personaName === persona.name,
      );

      return {
        id: `persona-${index}`,
        type: "personaNode",
        position: { x: 450, y: index * (personaHeight + personaSpacing) },
        data: {
          persona,
          isAnalyzing,
          result,
        },
      };
    });

    // 3. Report Node
    const reportNode = {
      id: "report",
      type: "reportNode",
      position: { x: 880, y: Math.max(centerY - 50, 50) },
      data: {
        isAnalyzing,
        result: analysisResult?.fullReport,
      },
    };

    // 4. Edges
    const computedEdges: any[] = [];
    personas.forEach((persona, index) => {
      const hasPersonaResult = !!analysisResult?.analyzedPersonas?.find(
        (p) => p.personaName === persona.name,
      );

      // Edge from Store to Persona
      computedEdges.push({
        id: `e-store-persona-${index}`,
        source: "store",
        target: `persona-${index}`,
        animated: isAnalyzing && !hasPersonaResult,
        style: {
          stroke: hasPersonaResult
            ? "var(--color-primary)"
            : "var(--color-muted-foreground)",
          strokeWidth: 2,
        },
      });

      // Edge from Persona to Report
      computedEdges.push({
        id: `e-persona-${index}-report`,
        source: `persona-${index}`,
        target: "report",
        animated:
          isAnalyzing && hasPersonaResult && !analysisResult?.fullReport,
        style: {
          stroke: analysisResult?.fullReport
            ? "var(--color-primary)"
            : "var(--color-muted-foreground)",
          strokeWidth: 2,
        },
      });
    });

    setNodes([storeNode, ...personaNodes, reportNode]);
    setEdges(computedEdges);
  }, [
    url,
    personas,
    isAnalyzing,
    analysisResult,
    scrapedData,
    layout,
    setNodes,
    setEdges,
  ]);

  return (
    <div className="border-border bg-muted/10 relative h-162 w-full overflow-hidden rounded-xl border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        colorMode="system"
        className="bg-background/50"
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background
          variant={BackgroundVariant.Dots}
          size={1}
          gap={20}
          className="opacity-70"
        />
        <Controls
          showInteractive={false}
          className="bg-card border-border text-foreground fill-foreground rounded-lg border shadow-lg"
        />
        <MiniMap
          zoomable
          pannable
          className="border-border bg-card rounded-lg border shadow-lg"
        />
      </ReactFlow>
    </div>
  );
}
