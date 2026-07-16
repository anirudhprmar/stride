import type { Metadata } from "next";
import "@/styles/globals.css";
import {
  OG_DESCRIPTION,
  OG_IMAGE_PATH,
  OG_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  URLs,
} from "../lib/contants";
import { websiteSchema, organizationSchema } from "../lib/contants";
import { Roboto, Instrument_Serif } from "next/font/google";
import { cn } from "@/lib/utils";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" });

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(URLs.site),
  applicationName: SITE_NAME,
  title: { template: `%s | ${SITE_NAME}`, default: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon/favicon.svg?v=4", type: "image/svg+xml" }],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    url: URLs.site,
    siteName: SITE_NAME,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 600, alt: OG_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", roboto.variable, instrumentSerif.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteSchema, organizationSchema]),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
