"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const DEFAULT_SERIES = "5, 12, 8, 10, 20, 14, 18";

type ChartPoint = {
  label: string;
  value: number;
};

function parseSeries(input: string): ChartPoint[] {
  return input
    .split(/[\s,]+/)
    .map((entry, index) => ({ label: `Point ${index + 1}`, value: Number(entry) }))
    .filter((item) => Number.isFinite(item.value));
}

export default function ChartsPage() {
  const [series, setSeries] = useState(DEFAULT_SERIES);

  const data = useMemo(() => parseSeries(series), [series]);

  const totals = useMemo(() => {
    if (!data.length) return null;
    const values = data.map((item) => item.value);
    const sum = values.reduce((acc, value) => acc + value, 0);
    return {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: +(sum / values.length).toFixed(2),
    };
  }, [data]);

  return (
    <section className="container space-y-10 py-12">
      <div className="space-y-3 text-center">
        <p className="text-sm font-semibold text-primary">Chart playground</p>
        <h1 className="text-4xl font-bold sm:text-5xl">Plot your numbers</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Paste or type a list of numbers separated by commas or spaces to quickly visualize them as line and bar charts.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="series">Number list</Label>
              <Input
                id="series"
                value={series}
                onChange={(event) => setSeries(event.target.value)}
                placeholder="e.g. 2, 4, 6, 8, 10"
                aria-describedby="series-help"
              />
              <p id="series-help" className="text-sm text-muted-foreground">
                Separate values with commas or spaces. Non-numeric entries are ignored automatically.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" onClick={() => setSeries(DEFAULT_SERIES)}>
                Reset to sample data
              </Button>
              <Button type="button" variant="outline" onClick={() => setSeries("")}> 
                Clear values
              </Button>
            </div>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <ChartCard title="Line chart" description="Track the sequence of values.">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={data} margin={{ top: 16, right: 12, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="text-muted-foreground" />
                  <XAxis dataKey="label" tickLine={false} tickMargin={8} interval={0} hide />
                  <YAxis tickLine={false} axisLine={false} width={60} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }}
                    labelClassName="font-medium"
                  />
                  <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Bar chart" description="Compare magnitudes at a glance.">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data} margin={{ top: 16, right: 12, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="text-muted-foreground" />
                  <XAxis dataKey="label" tickLine={false} tickMargin={8} interval={0} hide />
                  <YAxis tickLine={false} axisLine={false} width={60} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }}
                    labelClassName="font-medium"
                  />
                  <Bar dataKey="value" fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

        <aside className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Summary</h2>
            <p className="text-sm text-muted-foreground">Basic stats update automatically as you edit the list.</p>
          </div>
          {totals ? (
            <dl className="grid gap-3 text-sm">
              <SummaryItem label="Minimum" value={totals.min} />
              <SummaryItem label="Average" value={totals.avg} />
              <SummaryItem label="Maximum" value={totals.max} />
              <SummaryItem label="Count" value={data.length} />
            </dl>
          ) : (
            <p className="text-muted-foreground">Add at least one numeric value to see insights.</p>
          )}
          <div className="rounded-lg bg-muted/60 p-3 text-sm text-muted-foreground">
            Tip: use spaces or commas between numbers. Values are rendered on both charts for quick comparisons.
          </div>
        </aside>
      </div>
    </section>
  );
}

function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-border bg-muted/40 p-4">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className={cn("h-[260px] w-full", children ? "" : "flex items-center justify-center text-muted-foreground")}>{children}</div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-background px-3 py-2 ring-1 ring-border">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
