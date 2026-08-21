import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AiOutput, Field, inputClass, submitClass } from "@/components/ai-output";
import { runResearch } from "@/lib/ai.functions";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — NexusAI" },
      {
        name: "description",
        content:
          "Get an executive briefing with key insights, trade-offs and next steps on any work topic.",
      },
      { property: "og:title", content: "AI Research Assistant — NexusAI" },
      {
        property: "og:description",
        content: "Executive summaries, insights and recommended next steps for any topic.",
      },
    ],
  }),
  component: ResearchPage,
});

const DEPTHS = ["Quick scan", "Standard", "Deep dive"];

function ResearchPage() {
  const run = useServerFn(runResearch);
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState("Standard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await run({ data: { topic, depth } });
      setResult(res.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The AI request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell title="AI Research Assistant">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form onSubmit={submit} className="lg:col-span-5 space-y-5">
          <Field label="Research topic or question">
            <textarea
              rows={6}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={`${inputClass} resize-none`}
              placeholder="e.g. Adoption of generative AI for document automation in mid-sized law firms"
            />
          </Field>
          <Field label="Depth">
            <div className="flex gap-2">
              {DEPTHS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDepth(d)}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors ${
                    depth === d
                      ? "bg-brand text-primary-foreground border-brand"
                      : "bg-surface text-muted-foreground border-border hover:bg-secondary"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </Field>
          <button type="submit" disabled={loading || !topic.trim()} className={submitClass}>
            {loading ? "Researching..." : "Generate Briefing"}
          </button>
        </form>

        <div className="lg:col-span-7">
          <AiOutput
            loading={loading}
            error={error}
            content={result}
            emptyHint="Ask a research question to get an executive summary, key insights and next steps."
          />
        </div>
      </div>
    </AppShell>
  );
}
