export const dynamic = "force-static";

export async function GET() {
  const llmsContent = `# Stride

`;

  return new Response(llmsContent, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
