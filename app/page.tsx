import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="container py-16 sm:py-20 space-y-8">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold text-primary">Next.js 14 + TypeScript</p>
        <h1 className="text-4xl font-bold sm:text-5xl">Welcome to the dashboard</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore a modern Next.js starter that comes with Tailwind CSS, shadcn/ui
          components, and an interactive charting page powered by Recharts.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/charts" className="inline-flex items-center gap-2">
              Open charts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="https://nextjs.org" target="_blank">
              Read Next.js docs
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
        <h2 className="text-2xl font-semibold">What&apos;s included</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "Next.js 14 App Router",
            "TypeScript setup",
            "Tailwind CSS with shadcn/ui styling",
            "Reusable button and form components",
            "Recharts-powered visualizations",
            "Ready-to-extend app structure",
          ].map((item) => (
            <li
              key={item}
              className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-left text-sm font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
