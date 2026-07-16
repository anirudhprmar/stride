import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <header className="mb-8">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            ← Back to home
          </Link>
        </header>

        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 md:p-12">
            <article aria-label="Terms of Service">
              <h1 className="mb-8 text-3xl font-bold md:text-4xl">
                Terms of Service
              </h1>
              <p className="mb-8 text-sm text-gray-600 dark:text-gray-400">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </article>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
