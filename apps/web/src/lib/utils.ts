import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeJsonParse<T = any>(
  input: unknown,
  fallback: T | null = null,
): T | null {
  if (!input) return fallback;
  if (typeof input !== "string") {
    if (typeof input === "object") return input as T;
    return fallback;
  }

  let cleaned = input.trim();

  // Extract content inside markdown codeblock ```json ... ``` or ``` ... ```
  const codeBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (codeBlockMatch && codeBlockMatch[1]) {
    cleaned = codeBlockMatch[1].trim();
  }

  // Extract JSON object or array bounds
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  const firstBracket = cleaned.indexOf("[");
  const lastBracket = cleaned.lastIndexOf("]");

  let start = -1;
  let end = -1;

  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    start = firstBrace;
    end = lastBrace;
  } else if (firstBracket !== -1) {
    start = firstBracket;
    end = lastBracket;
  }

  if (start !== -1 && end > start) {
    cleaned = cleaned.substring(start, end + 1).trim();
  }

  try {
    return JSON.parse(cleaned) as T;
  } catch (e1) {
    try {
      // Clean trailing commas before closing braces/brackets
      const sanitized = cleaned.replace(/,\s*([\}\]])/g, "$1");
      return JSON.parse(sanitized) as T;
    } catch (e2) {
      console.error("Failed to parse JSON string:", input, e1);
      return fallback;
    }
  }
}
