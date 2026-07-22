export interface ExtractedData {
  title: string;
  metaDescription: string;
  h1: string;
  firstParagraph: string;
  brand: string;
  valueProposition: string;
  announcement: string;
  ctas: string[];
  trustSignals: string[];
  navigation: string[];
  capabilities: {
    search: boolean;
    cart: boolean;
    account: boolean;
  };
  catalog: {
    visibleProductCount: number;
    categories: string[];
    priceRange: string;
  };
  products: {
    name: string | undefined;
    price: string | undefined;
    compareAtPrice?: string | undefined;
    badge?: string | undefined;
  }[];
}

export type ScrapeResult =
  { success: true; data: ExtractedData } | { success: false; error: string };
