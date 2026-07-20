import AnalyzeClient from "./_components/analyze";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Setup({ searchParams }: PageProps) {
  const store_url = (await searchParams).store_url;
  const url = `https://${store_url}`;
  console.log("URL:", url);
  return <AnalyzeClient url={url as string} />;
}
