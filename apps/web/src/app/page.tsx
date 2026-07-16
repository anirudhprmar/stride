import Hero from "@/components/landing/hero";
import { homePageStructuredData } from "../lib/contants";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageStructuredData),
        }}
      />

      <main className="">
        <Hero />
      </main>
    </>
  );
}
