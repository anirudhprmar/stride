"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Users, User, Sparkles, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "../ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

// Zod schemas for validation
export const personaSchema = z.object({
  name: z.string().min(1, "name is required"),
  age: z
    .number()
    .min(1, "age must be at least 1")
    .max(120, "age must be under 120")
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
});

export const formSchema = z.object({
  personas: z
    .array(personaSchema)
    .min(1, "At least one target audience is required"),
});

export type Persona = z.infer<typeof personaSchema>;

// Prefilled templates based on count selected to provide premium quality out-of-the-box
const DEFAULT_PERSONAS: Persona[] = [
  {
    name: "Sarah Miller",
    age: 28,
    occupation: "Marketing Coordinator",
    techSavviness: "High (Tech-savvy)",
    shoppingMotivations:
      "Values rapid checkouts, detailed clothing size calculators, and clear visual reviews.",
    targetGoal:
      "Purchase a windproof athletic jacket under $120 with fast home delivery.",
    psychology: "Impulsive, style-driven, relies heavily on social proof",
    region: "North America",
    lifeStage: "Young Professional / Renting",
    budgetReality: "Moderate disposable income, looks for discount codes",
    skeptic:
      "Skeptical of products that have zero visual reviews or photo uploads",
    discoveryPath: "Instagram Ad -> Product Detail Page -> Review Section",
    motivation: "Desire for convenience, self-improvement, and premium styling",
  },
  {
    name: "David Chen",
    age: 42,
    occupation: "Software Engineer",
    techSavviness: "Expert (Power User)",
    shoppingMotivations:
      "Requires technical datasheets, side-by-side comparison tables, and full refund terms.",
    targetGoal:
      "Find an ergonomic mechanical keyboard that supports hot-swappable switches.",
    psychology: "Highly analytical, rational shopper, detail-obsessed",
    region: "East Asia / California",
    lifeStage: "Married, raising one child",
    budgetReality:
      "High budget, willing to pay premium for build quality and durability",
    skeptic:
      "Extremely doubtful of generic promotional text and overly-positive chatbot prompts",
    discoveryPath:
      "Reddit r/mechanicalkeyboards -> Site Search -> Spec sheet comparison",
    motivation:
      "Maximizing desk ergonomics, workspace optimization, and high performance",
  },
  {
    name: "Linda Peterson",
    age: 65,
    occupation: "Retired Educator",
    techSavviness: "Low (Needs Simplicity)",
    shoppingMotivations:
      "Prefers simple navigation paths, large text sizes, and secure checkouts with clear FAQs.",
    targetGoal:
      "Order a custom wooden educational toy kit for her granddaughter.",
    psychology: "Cautious, risk-averse, highly values brand trust",
    region: "Midwest US / Suburban",
    lifeStage: "Grandparent / Retired",
    budgetReality: "Fixed pension income, deliberate shopping behavior",
    skeptic:
      "Scared of online payment security, returns being complex, and hidden shipping charges",
    discoveryPath:
      "Google Search -> Category List Page -> Call for support / FAQs",
    motivation:
      "Joy of family gifting, reliability of delivery, and order safety",
  },
  {
    name: "Marcus Brody",
    age: 21,
    occupation: "College Sophomore",
    techSavviness: "High (Mobile First)",
    shoppingMotivations:
      "Motivated by student discounts, creator bundle coupons, and free returns.",
    targetGoal: "Acquire sweat-resistant wireless earbuds for running.",
    psychology:
      "FOMO-driven, trend-conscious, heavily influenced by video creators",
    region: "Urban UK",
    lifeStage: "Student / Living in Dorm",
    budgetReality:
      "Tight budget, relies on BNPL (Buy Now Pay Later) payment methods",
    skeptic:
      "Skeptical of slow websites, paid shipping fees, and complicated checkout screens",
    discoveryPath:
      "TikTok review video -> Mobile Browser -> Quick checkout button",
    motivation: "Social integration, active lifestyle, audio accessibility",
  },
  {
    name: "Elena Rostova",
    age: 35,
    occupation: "Interior Architect",
    techSavviness: "Very High",
    shoppingMotivations:
      "Appreciates visual whitespace, high-resolution imagery, and clean typography.",
    targetGoal: "Purchase minimalist concrete home planter sets.",
    psychology: "Aesthetic-oriented, brand-conscious, values craftsmanship",
    region: "Western Europe",
    lifeStage: "Single / High Career Focus",
    budgetReality: "Comfortable disposable income for premium design",
    skeptic:
      "Distrusts outdated design layouts, low-res assets, and pushy sales banners",
    discoveryPath:
      "Design blog feature -> Curated landing page -> Cart checkout",
    motivation:
      "Creating a beautiful home atmosphere, custom curation, and exclusivity",
  },
];

export default function PersonasForm({
  setCurrentState,
}: {
  setCurrentState: (val: number) => void;
}) {
  const [numOfPersonas, setNumOfPersonas] = useState(2);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      personas: [DEFAULT_PERSONAS[0], DEFAULT_PERSONAS[1]] as Persona[],
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      router.push("/analyze?personas=" + JSON.stringify(value.personas));
    },
  });

  // Handle setting count and prefilling values correctly
  const handleNumOfPersonasChange = (count: number) => {
    setNumOfPersonas(count);
    const currentValues = form.state.values.personas || [];

    const nextPersonas = Array.from({ length: count }).map((_, idx) => {
      if (currentValues[idx]) {
        return currentValues[idx];
      }
      return (
        DEFAULT_PERSONAS[idx] || {
          name: `Persona ${idx + 1}`,
          age: 30,
          occupation: "General Shopper",
          techSavviness: "Intermediate",
          shoppingMotivations:
            "Wants a simple product catalog and clear navigation.",
          targetGoal: "Purchase a standard consumer product.",
          psychology: "Average consumer",
          region: "Global",
          lifeStage: "Adult",
          budgetReality: "Moderate",
          skeptic: "Skeptical of extra costs at checkout",
          discoveryPath: "Google Search",
          motivation: "Utility and need-based shopping",
        }
      );
    });

    form.setFieldValue("personas", nextPersonas);
  };

  return (
    <form
      id="personas-form"
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <div className="space-y-6 animate-fade-in">
          <div className="text-center max-w-md mx-auto space-y-2">
            <h2 className="text-xl font-serif">
              How many visitor personas do you want to simulate?
            </h2>
            <p className="text-sm text-muted-foreground">
              Select between 1 and 5 unique personas. Each persona represents a
              different demographic segment with unique shopping habits.
            </p>
          </div>

          <div className="py-2 flex flex-col items-center space-y-6">
            {/* Visual count picker cards */}
            <div className="grid grid-cols-5 gap-3 w-full max-w-lg">
              {[1, 2, 3, 4, 5].map((num) => {
                const isSelected = numOfPersonas === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleNumOfPersonasChange(num)}
                    className={cn(
                      "flex flex-col items-center justify-center py-4 px-2 rounded-2xl border transition-all cursor-pointer select-none",
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                        : "bg-muted/10 hover:bg-muted/30 border-border text-foreground/80",
                    )}
                  >
                    <span className="text-2xl font-bold font-serif">{num}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 font-medium group-hover:text-foreground">
                      {num === 1 ? "Audience" : "Audiences"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Slider backup */}
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground px-1">
                <span>1 (Solo Audit)</span>
                <span>5 (Full Panel Audit)</span>
              </div>
              <Slider
                value={[numOfPersonas]}
                onValueChange={(val: any) => {
                  if (val && typeof val[0] === "number") {
                    handleNumOfPersonasChange(val[0]);
                  }
                }}
                min={1}
                max={5}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex items-start gap-3 bg-muted/20 border border-border/40 rounded-2xl p-4 max-w-md w-full">
              <Users className="size-5 text-primary shrink-0 mt-0.5" />
              <div className="text-xs space-y-1 text-left">
                <span className="font-semibold block">
                  {numOfPersonas === 1 &&
                    "Single Persona: Core Focused Analysis"}
                  {numOfPersonas === 2 &&
                    "Balanced Persona Pair: High Contrast Audit"}
                  {numOfPersonas === 3 &&
                    "Standard Triad Panel: Diverse Audience Simulation"}
                  {numOfPersonas === 4 &&
                    "Extended Panel: Multi-Demographic Funnel Audit"}
                  {numOfPersonas === 5 &&
                    "Full Advisory Panel: Deep Behavioral Testing"}
                </span>
                <span className="text-muted-foreground block leading-normal">
                  {numOfPersonas === 1 &&
                    "Great for auditing a single specific niche profile, such as your absolute core customer demographic."}
                  {numOfPersonas === 2 &&
                    "Simulates two very different profiles (e.g. tech-savvy young professional vs. tech-novice senior) to highlight accessibility gaps."}
                  {numOfPersonas === 3 &&
                    "Our recommended configuration. Gives a rich range of ages, tech capabilities, and shopping motivations."}
                  {numOfPersonas === 4 &&
                    "Provides a comprehensive overview of budget sensitivities, regional differences, and multiple purchase intents."}
                  {numOfPersonas === 5 &&
                    "The most thorough analysis. Runs simulated runs for all five distinct archetypes across your store."}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Personas Tabs View inside a card */}
        <form.Field
          name="personas"
          children={(field) => {
            const personasArray = field.state.value || [];

            return (
              <div className="space-y-4 pt-4 border-t border-border/40">
                <div className="flex justify-between items-center pb-2">
                  <div>
                    <h3 className="text-base font-semibold">
                      Configure Persona Profiles
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Tweak demographic details and simulation behaviors below.
                    </p>
                  </div>
                </div>

                <Tabs defaultValue="0" className="w-full">
                  <TabsList className="flex flex-wrap gap-1 mb-2 bg-muted/30 p-1 rounded-2xl border border-border/40 w-full justify-start">
                    {Array.from({ length: numOfPersonas }).map((_, idx) => {
                      const pname =
                        personasArray[idx]?.name || `Persona ${idx + 1}`;
                      return (
                        <TabsTrigger
                          key={idx}
                          value={String(idx)}
                          className="flex-1 max-w-45"
                        >
                          <User className="size-4 shrink-0 mr-1.5" />
                          <span className="truncate max-w-30">{pname}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>

                  {Array.from({ length: numOfPersonas }).map((_, idx) => {
                    const activePersona = personasArray[idx] || { name: "" };

                    const updateActiveField = (
                      key: keyof Persona,
                      val: any,
                    ) => {
                      const updated = [...personasArray];
                      if (!updated[idx]) {
                        updated[idx] = {} as Persona;
                      }
                      updated[idx] = {
                        ...updated[idx],
                        [key]: val,
                      };
                      field.handleChange(updated);
                    };

                    return (
                      <TabsContent
                        key={idx}
                        value={String(idx)}
                        className="mt-2"
                      >
                        <Card className="border border-border/80 bg-card rounded-2xl shadow-sm">
                          <CardHeader className="border-b border-border/20 pb-4">
                            <CardTitle className="font-serif text-base font-semibold text-foreground">
                              Configure Profile:{" "}
                              {activePersona.name || `Persona ${idx + 1}`}
                            </CardTitle>
                            <CardDescription>
                              Define the user context, target parameters, and
                              expected shopping actions.
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="space-y-6 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Left Column: Demographics & Core Info */}
                              <div className="space-y-4">
                                <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">
                                  1. Core Profile
                                </h4>

                                <Field>
                                  <FieldLabel htmlFor={`p-name-${idx}`}>
                                    Full name
                                  </FieldLabel>
                                  <InputGroup>
                                    <InputGroupInput
                                      id={`p-name-${idx}`}
                                      placeholder="e.g. Sarah Miller"
                                      value={activePersona.name || ""}
                                      onChange={(e) =>
                                        updateActiveField(
                                          "name",
                                          e.target.value,
                                        )
                                      }
                                      required
                                    />
                                  </InputGroup>
                                </Field>

                                <div className="grid grid-cols-2 gap-4">
                                  <Field>
                                    <FieldLabel htmlFor={`p-age-${idx}`}>
                                      age
                                    </FieldLabel>
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`p-age-${idx}`}
                                        type="number"
                                        placeholder="e.g. 28"
                                        value={activePersona.age ?? ""}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          updateActiveField(
                                            "age",
                                            val === ""
                                              ? undefined
                                              : Number(val),
                                          );
                                        }}
                                      />
                                    </InputGroup>
                                  </Field>

                                  <Field>
                                    <FieldLabel htmlFor={`p-occ-${idx}`}>
                                      occupation
                                    </FieldLabel>
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`p-occ-${idx}`}
                                        placeholder="e.g. Designer"
                                        value={activePersona.occupation || ""}
                                        onChange={(e) =>
                                          updateActiveField(
                                            "occupation",
                                            e.target.value,
                                          )
                                        }
                                      />
                                    </InputGroup>
                                  </Field>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <Field>
                                    <FieldLabel htmlFor={`p-region-${idx}`}>
                                      Region / Location
                                    </FieldLabel>
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`p-region-${idx}`}
                                        placeholder="e.g. North America"
                                        value={activePersona.region || ""}
                                        onChange={(e) =>
                                          updateActiveField(
                                            "region",
                                            e.target.value,
                                          )
                                        }
                                      />
                                    </InputGroup>
                                  </Field>

                                  <Field>
                                    <FieldLabel htmlFor={`p-lifestage-${idx}`}>
                                      Life Stage
                                    </FieldLabel>
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`p-lifestage-${idx}`}
                                        placeholder="e.g. Young Professional"
                                        value={activePersona.lifeStage || ""}
                                        onChange={(e) =>
                                          updateActiveField(
                                            "lifeStage",
                                            e.target.value,
                                          )
                                        }
                                      />
                                    </InputGroup>
                                  </Field>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <Field>
                                    <FieldLabel htmlFor={`p-tech-${idx}`}>
                                      Tech Savviness
                                    </FieldLabel>
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`p-tech-${idx}`}
                                        placeholder="e.g. High / Low"
                                        value={
                                          activePersona.techSavviness || ""
                                        }
                                        onChange={(e) =>
                                          updateActiveField(
                                            "techSavviness",
                                            e.target.value,
                                          )
                                        }
                                      />
                                    </InputGroup>
                                  </Field>

                                  <Field>
                                    <FieldLabel htmlFor={`p-budget-${idx}`}>
                                      Budget Context
                                    </FieldLabel>
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`p-budget-${idx}`}
                                        placeholder="e.g. Tight / Premium"
                                        value={
                                          activePersona.budgetReality || ""
                                        }
                                        onChange={(e) =>
                                          updateActiveField(
                                            "budgetReality",
                                            e.target.value,
                                          )
                                        }
                                      />
                                    </InputGroup>
                                  </Field>
                                </div>

                                <Field>
                                  <FieldLabel htmlFor={`p-discovery-${idx}`}>
                                    Discovery Path
                                  </FieldLabel>
                                  <FieldDescription>
                                    How they typically find ecommerce websites.
                                  </FieldDescription>
                                  <InputGroup>
                                    <InputGroupInput
                                      id={`p-discovery-${idx}`}
                                      placeholder="e.g. Instagram recommendation, search keywords"
                                      value={activePersona.discoveryPath || ""}
                                      onChange={(e) =>
                                        updateActiveField(
                                          "discoveryPath",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </InputGroup>
                                </Field>
                              </div>

                              {/* Right Column: Behavioral Parameters & Psychology */}
                              <div className="space-y-4">
                                <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">
                                  2. Shopping Psychology & Goals
                                </h4>

                                <Field>
                                  <FieldLabel htmlFor={`p-goal-${idx}`}>
                                    Target Purchase Goal
                                  </FieldLabel>
                                  <FieldDescription>
                                    What specific action does this persona want
                                    to accomplish?
                                  </FieldDescription>
                                  <InputGroup>
                                    <InputGroupTextarea
                                      id={`p-goal-${idx}`}
                                      placeholder="e.g. Find products under budget and complete payment."
                                      value={activePersona.targetGoal || ""}
                                      onChange={(e) =>
                                        updateActiveField(
                                          "targetGoal",
                                          e.target.value,
                                        )
                                      }
                                      className="min-h-16"
                                    />
                                  </InputGroup>
                                </Field>

                                <Field>
                                  <FieldLabel htmlFor={`p-motivations-${idx}`}>
                                    Shopping Motivations
                                  </FieldLabel>
                                  <FieldDescription>
                                    Key attributes guiding their decision
                                    (reviews, fast delivery).
                                  </FieldDescription>
                                  <InputGroup>
                                    <InputGroupTextarea
                                      id={`p-motivations-${idx}`}
                                      placeholder="e.g. Requires clear discount codes and quick size selection."
                                      value={
                                        activePersona.shoppingMotivations || ""
                                      }
                                      onChange={(e) =>
                                        updateActiveField(
                                          "shoppingMotivations",
                                          e.target.value,
                                        )
                                      }
                                      className="min-h-16"
                                    />
                                  </InputGroup>
                                </Field>

                                <div className="grid grid-cols-2 gap-4">
                                  <Field>
                                    <FieldLabel htmlFor={`p-psy-${idx}`}>
                                      Shopping Psychology
                                    </FieldLabel>
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`p-psy-${idx}`}
                                        placeholder="e.g. Analytical / Impulsive"
                                        value={activePersona.psychology || ""}
                                        onChange={(e) =>
                                          updateActiveField(
                                            "psychology",
                                            e.target.value,
                                          )
                                        }
                                      />
                                    </InputGroup>
                                  </Field>

                                  <Field>
                                    <FieldLabel htmlFor={`p-motivation-${idx}`}>
                                      Core Driver
                                    </FieldLabel>
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`p-motivation-${idx}`}
                                        placeholder="e.g. Convenience / Best price"
                                        value={activePersona.motivation || ""}
                                        onChange={(e) =>
                                          updateActiveField(
                                            "motivation",
                                            e.target.value,
                                          )
                                        }
                                      />
                                    </InputGroup>
                                  </Field>
                                </div>

                                <Field>
                                  <FieldLabel htmlFor={`p-skeptic-${idx}`}>
                                    Skepticism / Exit Triggers
                                  </FieldLabel>
                                  <FieldDescription>
                                    Friction that triggers immediate session
                                    exit.
                                  </FieldDescription>
                                  <InputGroup>
                                    <InputGroupInput
                                      id={`p-skeptic-${idx}`}
                                      placeholder="e.g. Lack of visual security badges, unexpected shipping fees"
                                      value={activePersona.skeptic || ""}
                                      onChange={(e) =>
                                        updateActiveField(
                                          "skeptic",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </InputGroup>
                                </Field>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </div>
            );
          }}
        />
      </FieldGroup>

      <Field
        orientation="horizontal"
        className="mt-10 pt-4 border-t border-border/40 flex justify-between"
      >
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
          className="rounded-2xl"
        >
          Reset
        </Button>

        <Button
          type="submit"
          form="personas-form"
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/80 rounded-2xl px-5 h-9 font-medium"
        >
          <Play className="size-4 fill-current" /> Start AI Analysis
        </Button>
      </Field>
    </form>
  );
}
