import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { ScrapeResult } from "@repo/shared/index";

export default async function scrapeStore(url: string): Promise<ScrapeResult> {
  if (url.includes("localhost")) {
    return { success: false, error: "Invalid URL" };
  }

  const isLocal =
    process.env.NODE_ENV === "development" || process.platform === "win32";

  const browser = await puppeteer.launch({
    args: isLocal
      ? ["--no-sandbox", "--disable-setuid-sandbox"]
      : chromium.args,
    defaultViewport: { width: 1280, height: 720 },
    executablePath: isLocal
      ? undefined // Will try to find system Chrome
      : await chromium.executablePath(),
    headless: true,
    channel: isLocal ? "chrome" : undefined, // Use installed Chrome on local
  });

  const page = await browser.newPage();

  try {
    await page.setUserAgent({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36",
      userAgentMetadata: {
        brands: [{ brand: "Google Chrome", version: "150" }],
        platform: "Windows",
        platformVersion: "10",
        architecture: "x64",
        mobile: false,
        bitness: "64",
        model: "",
        wow64: false,
      },
    });

    await page.goto(url, {
      waitUntil: "networkidle0",
    });

    const extractedData = await page.evaluate(() => {
      const clean = (value: string | null | undefined, limit = 180) =>
        (value || "").replace(/\s+/g, " ").trim().slice(0, limit);
      const unique = (values: string[], limit: number) =>
        [...new Set(values.map((value) => clean(value)).filter(Boolean))].slice(
          0,
          limit,
        );
      const meta = (selector: string) =>
        clean(document.querySelector(selector)?.getAttribute("content"));
      // JSON-LD is the highest-signal source: it commonly contains product offers,
      // brand data, ratings, and availability without sending page markup to the LLM.
      const jsonLd: Record<string, unknown>[] = [];
      const collectJsonLd = (value: unknown) => {
        if (Array.isArray(value)) return value.forEach(collectJsonLd);
        if (!value || typeof value !== "object") return;
        const item = value as Record<string, unknown>;
        jsonLd.push(item);
        if (item["@graph"]) collectJsonLd(item["@graph"]);
      };
      document
        .querySelectorAll('script[type="application/ld+json"]')
        .forEach((script) => {
          try {
            collectJsonLd(JSON.parse(script.textContent || "null"));
          } catch {
            // Invalid JSON-LD should not prevent extraction of the visible page.
          }
        });

      const structuredProducts = jsonLd.filter((item) => {
        const type = item["@type"];
        return (
          type === "Product" ||
          (Array.isArray(type) && type.includes("Product"))
        );
      });
      const schemaBrand = jsonLd
        .map((item) => {
          const brand = item.brand;
          return typeof brand === "string"
            ? brand
            : brand && typeof brand === "object"
              ? String((brand as Record<string, unknown>).name || "")
              : "";
        })
        .find(Boolean);

      const productCandidates = Array.from(
        document.querySelectorAll<HTMLElement>(
          '[data-product], [data-product-id], .product-card, [class*="product-card"], article',
        ),
      );
      const domProducts = productCandidates
        .map((element) => {
          const name = clean(
            element.querySelector('h2, h3, [class*="title"], [class*="name"]')
              ?.textContent,
            90,
          );
          const prices = unique(
            Array.from(
              element.querySelectorAll('[class*="price"], [data-price]'),
            ).map((price) => price.textContent || ""),
            2,
          );
          return {
            name,
            price: prices[0],
            compareAtPrice: prices[1],
            badge: clean(
              element.querySelector('[class*="badge"], [class*="label"]')
                ?.textContent,
              40,
            ),
          };
        })
        .filter((product) => product.name);
      const schemaProducts = structuredProducts.map((product) => {
        const offer = Array.isArray(product.offers)
          ? product.offers[0]
          : product.offers;
        const offerData =
          offer && typeof offer === "object"
            ? (offer as Record<string, unknown>)
            : {};
        return {
          name: clean(String(product.name || ""), 90),
          price: clean(String(offerData.price || ""), 30),
          compareAtPrice: "",
          badge: "",
        };
      });
      const products = [...domProducts, ...schemaProducts]
        .filter(
          (product, index, all) =>
            product.name &&
            all.findIndex((other) => other.name === product.name) === index,
        )
        .slice(0, 6);

      const pageLines = unique(document.body.innerText.split(/\n+/), 100);
      const trustSignals = pageLines
        .filter((line) =>
          /free shipping|free returns|returns?|money.back|guarantee|reviews?|rated|secure checkout|secure payment|trusted|warranty/i.test(
            line,
          ),
        )
        .map((line) => clean(line, 120))
        .slice(0, 6);
      const ctas = unique(
        Array.from(document.querySelectorAll("button, a, input[type=submit]"))
          .map(
            (element) =>
              element.textContent || element.getAttribute("value") || "",
          )
          .filter((text) =>
            /add to cart|buy now|shop now|checkout|subscribe|get started/i.test(
              text,
            ),
          ),
        6,
      );
      const navigation = unique(
        Array.from(document.querySelectorAll("nav a, header a")).map(
          (element) => element.textContent || "",
        ),
        10,
      );
      const categories = unique(
        Array.from(
          document.querySelectorAll(
            '[data-collection], a[href*="collections"], a[href*="category"]',
          ),
        ).map((element) => element.textContent || ""),
        8,
      );
      const priceValues = products
        .map((product) => product.price)
        .filter(Boolean);
      const heroText = clean(
        document.querySelector("main h1, h1, [class*='hero'] h2")?.textContent,
        160,
      );
      const paragraphs = Array.from(document.querySelectorAll("main p, p"))
        .map((paragraph) => clean(paragraph.textContent, 220))
        .filter((paragraph) => paragraph.length > 30);

      return {
        title: clean(document.title, 120),
        metaDescription:
          meta('meta[name="description"]') ||
          meta('meta[property="og:description"]'),
        h1: heroText,
        firstParagraph: paragraphs[0] || "",
        brand: clean(
          schemaBrand ||
            meta('meta[property="og:site_name"]') ||
            document.title.split(/[|–-]/)[0],
          80,
        ),
        valueProposition:
          paragraphs.find((paragraph) => paragraph !== heroText) || "",
        announcement:
          pageLines.find((line) =>
            /free shipping|sale|off|welcome|delivery/i.test(line),
          ) || "",
        products,
        ctas,
        trustSignals,
        navigation,
        capabilities: {
          search: Boolean(
            document.querySelector(
              'input[type="search"], [aria-label*="search" i], button[aria-label*="search" i]',
            ),
          ),
          cart: Boolean(
            document.querySelector(
              'a[href*="cart"], button[name="add"], [aria-label*="cart" i]',
            ),
          ),
          account: Boolean(
            document.querySelector(
              'a[href*="account"], a[href*="login"], [aria-label*="account" i]',
            ),
          ),
        },
        catalog: {
          visibleProductCount: domProducts.length,
          categories,
          priceRange:
            priceValues.length > 1
              ? `${priceValues[0]}–${priceValues[priceValues.length - 1]}`
              : priceValues[0] || "",
        },
      };
    });

    return {
      success: true,
      data: {
        ...extractedData,
      },
    };
  } catch (error) {
    console.error("Error Scrapping", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    await browser.close();
  }
}
