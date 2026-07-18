"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "../ui/button";

const formSchema = z.object({
  industry: z
    .array(z.string())
    .min(1, "At least one target audience is required"),
  analysisObjectives: z
    .string()
    .min(1, "Objective is required")
    .max(100, "A short objective is enough"),
});

const SUGGESTED_AUDIENCES = [
  "Students",
  "Content Creators",
  "Gamers",
  "Parents",
  "Fitness Enthusiasts",
  "Working Professionals",
];

export default function WebsiteDetailsForm({
  setCurrentState,
}: {
  setCurrentState: (val: number) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const form = useForm({
    defaultValues: {
      industry: [] as string[],
      analysisObjectives: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: () => {
      setCurrentState(2);
    },
  });

  return (
    <form
      id="website-details-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="industry"
          validators={{
            onChange: ({ value }) => {
              return !value || value.length === 0
                ? "At least one target audience is required"
                : undefined;
            },
          }}
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Target Audience (Community)
                </FieldLabel>
                <FieldDescription>
                  Define who your ideal customers or users are to help us tailor
                  the analysis more accurately.
                </FieldDescription>
                <InputGroup className="h-auto min-h-8 flex-wrap gap-1.5 p-1.5">
                  {field.state.value &&
                    field.state.value.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-secondary text-secondary-foreground border-border inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs select-none"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => {
                            field.handleChange(
                              field.state.value.filter(
                                (t: string) => t !== tag,
                              ),
                            );
                          }}
                          className="text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none"
                          aria-label={`Remove ${tag}`}
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    ))}
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        const trimmed = inputValue.trim();
                        if (trimmed && !field.state.value.includes(trimmed)) {
                          field.handleChange([...field.state.value, trimmed]);
                        }
                        setInputValue("");
                      }
                    }}
                    onBlur={() => {
                      field.handleBlur();
                      const trimmed = inputValue.trim();
                      if (trimmed && !field.state.value.includes(trimmed)) {
                        field.handleChange([...field.state.value, trimmed]);
                      }
                      setInputValue("");
                    }}
                    placeholder={
                      field.state.value?.length === 0
                        ? "Type or select options..."
                        : ""
                    }
                    autoComplete="off"
                    className="h-7 min-w-30 flex-1 border-0 bg-transparent px-1 py-0 shadow-none ring-0 focus-visible:ring-0 dark:bg-transparent"
                  />
                </InputGroup>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {SUGGESTED_AUDIENCES.map((audience) => {
                    const isSelected = field.state.value?.includes(audience);
                    return (
                      <button
                        key={audience}
                        type="button"
                        onClick={() => {
                          const currentValues = field.state.value || [];
                          if (isSelected) {
                            field.handleChange(
                              currentValues.filter(
                                (t: string) => t !== audience,
                              ),
                            );
                          } else {
                            field.handleChange([...currentValues, audience]);
                          }
                        }}
                        className={cn(
                          "inline-flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-all select-none",
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary font-medium"
                            : "bg-muted/30 hover:bg-muted/80 hover:text-foreground text-muted-foreground border-border",
                        )}
                      >
                        {isSelected && <Check className="size-3" />}
                        {audience}
                      </button>
                    );
                  })}
                </div>

                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors.map((err) =>
                      typeof err === "string" ? { message: err } : err,
                    )}
                  />
                )}
              </Field>
            );
          }}
        />
        <form.Field
          name="analysisObjectives"
          validators={{
            onChange: ({ value }) => {
              return !value || value.trim().length === 0
                ? "Objective is required"
                : undefined;
            },
          }}
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Analysis Objective</FieldLabel>
                <FieldDescription>
                  A short description of what you'd like to achive with this
                  analysis
                </FieldDescription>
                <InputGroup>
                  <InputGroupTextarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. I want to understand why athletes arn't buying from my store."
                    className="min-h-16 resize-none"
                    aria-invalid={isInvalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.state.value?.length || 0}/100 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors.map((err) =>
                      typeof err === "string" ? { message: err } : err,
                    )}
                  />
                )}
              </Field>
            );
          }}
        />
      </FieldGroup>
      <Field orientation="horizontal" className="mt-10">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="website-details-form">
          Next
        </Button>
      </Field>
    </form>
  );
}
