import AnalyzeClient from "./_components/analyze";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Setup({ searchParams }: PageProps) {
  const url = (await searchParams).url;
  return <AnalyzeClient url={url as string} />;
}
