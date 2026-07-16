import type {
  FAQPage,
  Organization,
  SoftwareApplication,
  WebSite,
  WithContext,
} from "schema-dts";

export const OG_IMAGE_PATH = "/og_image.png";
export const SITE_NAME = "stride";

export const SITE_TITLE = "Stride - Test your Store with your target Audience";
export const SITE_DESCRIPTION =
  "Analyze your ecommerce store from your customers perspective";

export const OG_TITLE = SITE_TITLE;
export const OG_DESCRIPTION =
  "Analyze your ecommerce store from your customers perspective";

export const URLs = {
  site: "https://stride-studio.vercel.app",
  x: "https://x.com/anirudhprmar",
} as const;

export const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${URLs.site}/#website`,
  name: SITE_NAME,
  url: URLs.site,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
};

export const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${URLs.site}/#organization`,
  name: SITE_NAME,
  url: URLs.site,
  logo: `${URLs.site}/favicon/android-chrome-512x512.png`,
  sameAs: [URLs.x],
};

export const softwareApplicationSchema: WithContext<SoftwareApplication> = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${URLs.site}/#software`,
  name: SITE_NAME,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  url: URLs.site,
  description: SITE_DESCRIPTION,
  image: `${URLs.site}${OG_IMAGE_PATH}`,
  publisher: {
    "@id": `${URLs.site}/#organization`,
  },
};

export const faqSchema: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${URLs.site}/#faq`,
  mainEntity: [],
};

export const homePageStructuredData = [
  websiteSchema,
  organizationSchema,
  softwareApplicationSchema,
  faqSchema,
];
