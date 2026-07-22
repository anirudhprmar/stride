import AnalyzeClient from "./_components/analyze";

interface PageProps {
  params: Promise<{ url: string }>;
}

export default async function Setup({ params }: PageProps) {
  const { url: rawUrl } = await params;
  const url = decodeURIComponent(rawUrl);
  return <AnalyzeClient url={url} />;
}
