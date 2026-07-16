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

      {/* Your Page Content */}
      <main className="bg-red-400 text-2xl">Home</main>
    </>
  );
}
