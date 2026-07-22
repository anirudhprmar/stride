import scrapeStore from "@repo/scraper/index";
import { z } from "zod";
import { createGoogle } from "@ai-sdk/google";
import { generateText } from "ai";
import { ScrapeResult, ExtractedData } from "@repo/shared/index";

interface PersonaProps {
  name: string;
  age?: number;
  occupation?: string;
  techSavviness?: string;
  shoppingMotivations?: string;
  targetGoal?: string;
  psychology?: string;
  region?: string;
  lifeStage?: string;
  budgetReality?: string;
  skeptic?: string;
  discoveryPath?: string;
  motivation?: string;
}

interface PersonaResult {
  personaName: string;
  persona: PersonaProps;
  score: number;
  clarity: number;
  insights: string[];
  priority: string;
  recommendedChanges: string[];
}

const google = createGoogle({
  apiKey: process.env.GOOGLE_API_KEY,
});

const model = google("gemini-3.1-flash-lite");

const requestSchema = z.object({
  url: z.string(),
  personas: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      age: z
        .number()
        .min(1, "Age must be at least 1")
        .max(120, "Age must be under 120")
        .optional(),
      occupation: z.string().optional(),
      techSavviness: z.string().optional(),
      shoppingMotivations: z.string().optional(),
      targetGoal: z.string().optional(),
      psychology: z.string().optional(),
      region: z.string().optional(),
      lifeStage: z.string().optional(),
      budgetReality: z.string().optional(),
      skeptic: z.string().optional(),
      discoveryPath: z.string().optional(),
      motivation: z.string().optional(),
    }),
  ),
  industry: z.array(z.string()).optional(),
  analysisObjectives: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const {
      url: rawUrl,
      personas,
      industry,
      analysisObjectives,
    } = requestSchema.parse(await request.json());
    const url = rawUrl.match(/^https?:\/\//) ? rawUrl : `https://${rawUrl}`;
    const data: ScrapeResult = await scrapeStore(url);
    if (!data.success) {
      throw new Error("Failed to scrape store");
    }

    const analyzedPersonas = await parallelPersonaAnalysis(personas, data.data);

    const { text } = await generateText({
      model,
      system: `You are a senior e-commerce CRO strategist.

        You have been given detailed journey simulations from multiple customer personas for an e-commerce store.

        Synthesize all the persona results into one coherent, actionable report.

        Be honest, balanced, and prioritize high-impact fixes.

        Use evidence from the simulations to support your conclusions.`,
      prompt: `Store URL: ${url}

        Industry: ${industry?.join(", ") || "Not provided"}
        Analysis Objectives: ${analysisObjectives || "Not provided"}

        Persona Simulation Results:
        ${JSON.stringify(analyzedPersonas, null, 2)}

        Create a final synthesized report in valid JSON format using this exact structure:

        {
          "title": "Stride Analysis Report",
          "tested": "${url}",
          "generated_at": "${new Date().toISOString().split("T")[0]}",
          "verdict": "One strong summary sentence about overall store performance",
          "biggest_leak": {
            "title": "Short title of the main problem",
            "detail": "Explanation",
            "evidence": "Key evidence from personas"
          },
          "personas": ${JSON.stringify(analyzedPersonas)},
          "fixes": [
            {
              "rank": number,
              "change": "Specific recommendation",
              "personas": "X of Y personas affected",
              "impact": "High/Medium/Low",
              "effort": "Small/Medium/Large",
              "confidence": "High/Medium/Low"
            }
          ],
          "experiment": {
            "title": "Recommended quick experiment",
            "hypothesis": "...",
            "change": "...",
            "measure": "...",
            "success": "..."
          },
          "limits": ["List of limitations"]
        }`,
    });

    return Response.json({
      analyzedPersonas,
      fullReport: text,
      storeInfo: {
        title: data.data.title,
        metaDescription: data.data.metaDescription,
      },
    });
  } catch (error) {
    console.error("Analyze API error:", error);
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 },
      );
    }
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}

async function parallelPersonaAnalysis(
  personas: PersonaProps[],
  data: ExtractedData,
) {
  const storeInfo = {
    title: data.title,
    metaDescription: data.metaDescription,
    h1: data.h1,
    firstParagraph: data.firstParagraph,
    ctas: data.ctas,
    trustSignals: data.trustSignals,
    products: data.products,
    brand: data.brand,
    valueProposition: data.valueProposition,
    announcement: data.announcement,
    navigation: data.navigation,
    capabilities: data.capabilities,
    catalog: data.catalog,
  };

  const analyzedPersonas: PersonaResult[] = [];

  for (const person of personas) {
    const { text } = await generateText({
      model,
      system: `You are an expert e-commerce conversion rate optimization (CRO) researcher.

        Use this exact evaluation framework for every persona:

        Journey Stages to evaluate:
        1. First five seconds
        2. Comprehension
        3. Relevance
        4. Trust
        5. Risk and effort
        6. Action

        Scoring Dimensions (0-5 each):
        - Clarity (25%)
        - Relevance (20%)
        - Trust (20%)
        - Friction (15%)
        - Value confidence (10%)
        - CTA fit (10%)

        Final score = (clarity/5*25) + (relevance/5*20) + (trust/5*20) + (friction/5*15) + (value_confidence/5*10) + (cta_fit/5*10)

      Always be honest, evidence-based, and constructive.`,
      prompt: `Store Data:
${JSON.stringify(storeInfo)}

Persona:
${JSON.stringify(person, null, 2)}

Simulate this persona's journey using the framework above.

Return ONLY valid JSON with this structure:

{
  "score": number,
  "clarity": number,
  "relevance": number,
  "trust": number,
  "friction": number,
  "value_confidence": number,
  "cta_fit": number,
  "insights": string[],
  "priority": "High" | "Medium" | "Low",
  "recommendedChanges": string[]
    }`,
    });

    const { score, clarity, insights, priority, recommendedChanges } =
      JSON.parse(text);

    analyzedPersonas.push({
      personaName: person.name,
      persona: person,
      score,
      clarity,
      insights,
      priority,
      recommendedChanges,
    });
  }
  return analyzedPersonas;
}
