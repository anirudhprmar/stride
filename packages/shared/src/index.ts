export interface ExtractedData {
  title: string;
  metaDescription: string;
  h1: string;
  firstParagraph: string;
  ctas: string[];
  trustSignals: string[];
  products: {
    name: string | undefined;
    price: string | undefined;
    description: string | undefined;
  }[];
}

export type ScrapeResult =
  | { success: true; data: ExtractedData & { screenshot: Buffer } }
  | { success: false; error: string };
