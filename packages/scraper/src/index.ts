import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth-lp";
import fs from "node:fs/promises";
import { ScrapeResult, ExtractedData } from "@repo/shared/index";

puppeteer.use(StealthPlugin());

export default async function scrapeStore(url: string): Promise<ScrapeResult> {
  if (url.includes("localhost")) {
    return { success: false, error: "Invalid URL" };
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    timeout: 5000,
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

    console.log("user agent successfull");

    await page.goto(url, {
      waitUntil: "networkidle0",
    });

    console.log("Page loaded successfully");

    const extractedData = await page.evaluate(() => {
      const title = document.title;
      const metaDescription =
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") ||
        document
          .querySelector('meta[property="og:description"]')
          ?.getAttribute("content") ||
        "";

      const h1 = document.querySelector("h1")?.textContent?.trim() || "";

      const firstParagraph =
        document.getElementsByTagName("p")[0]?.textContent?.trim() || "";

      const products = Array.from(
        document.querySelectorAll(
          'article, .product, [class*="product"], [data-product]',
        ),
      )
        .map((el) => ({
          name: el
            .querySelector('h1, h2, h3, .title, [class*="title"]')
            ?.textContent?.trim(),
          price: el
            .querySelector('.price, [class*="price"], [data-price]')
            ?.textContent?.trim(),
          description: el.querySelector("p, .description")?.textContent?.trim(),
        }))
        .filter((p) => p.name);

      const ctas = Array.from(document.querySelectorAll("button, a"))
        .filter((el) =>
          /add to cart|buy now|shop now|subscribe/i.test(el.textContent || ""),
        )
        .map((el) => el.textContent?.trim());

      const trustSignals = Array.from(document.querySelectorAll("body *"))
        .filter((el) =>
          /free shipping|money back|guarantee|review|trusted|secure/i.test(
            el.textContent || "",
          ),
        )
        .map((el) => el.textContent?.trim())
        .slice(0, 8);

      return {
        title,
        metaDescription,
        h1,
        firstParagraph,
        products,
        ctas,
        trustSignals,
      };
    });

    await fs.mkdir("./screenshots", { recursive: true });

    const ss = await page.screenshot({
      path: `./screenshots/${Date.now()}-${url.replace(/[^a-zA-Z0-9]/g, "")}.png`,
      fullPage: true,
    });

    console.log("Screenshot saved successfully");

    return {
      success: true,
      data: {
        ...extractedData,
        screenshot: Buffer.from(ss),
      },
    };
  } catch (error) {
    console.log("Error Scrapping", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    await browser.close();
  }
}
