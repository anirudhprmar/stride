import Hero from "@/components/landing/hero";
import { homePageStructuredData } from "../lib/contants";
import Navbar from "@/components/landing/navbar";
import Demo from "@/components/landing/demo";
import Features from "@/components/landing/features";
import FooterCTA from "@/components/landing/footerCTA";
import Footer from "@/components/landing/footer";
import WhyStride from "@/components/landing/why-stride";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageStructuredData),
        }}
      />

      <main className="flex min-h-screen w-full flex-col overflow-x-hidden">
        <Navbar />
        <Hero />
        <Demo />
        <Features />
        <WhyStride />
        <FooterCTA />
        <Footer />
      </main>
    </>
  );
}
