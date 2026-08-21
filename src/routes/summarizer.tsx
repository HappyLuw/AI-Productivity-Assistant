import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AiOutput, Field, inputClass, submitClass } from "@/components/ai-output";
import { summarizeNotes } from "@/lib/ai.functions";

export const Route = createFileRoute("/summarizer")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — NexusAI" },
      {
        name: "description",
        content:
          "Turn raw meeting notes into key points, owners, action items and deadlines with AI.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — NexusAI" },
      {
        property: "og:description",
        content: "Structured meeting recaps: summary, key points, action items and open risks.",
      },
    ],
  }),
  component: SummarizerPage,
});

function SummarizerPage() {
  const run = useServerFn(summarizeNotes);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!notes.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await run({ data: { notes } });
      setResult(res.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The AI request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell title="Meeting Notes Summarizer">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form onSubmit={submit} className="lg:col-span-5 space-y-5">
          <Field label="Raw notes or transcript">
            <textarea
              rows={16}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`${inputClass} resize-none`}
              placeholder="Paste your meeting notes, bullet scribbles or transcript here..."
            />
          </Field>
          <button type="submit" disabled={loading || !notes.trim()} className={submitClass}>
            {loading ? "Summarising..." : "Summarise Meeting"}
          </button>
        </form>

        <div className="lg:col-span-7">
          <AiOutput
            loading={loading}
            error={error}
            content={result}
            emptyHint="Paste meeting notes to get a summary, key points, an action-item table and open risks."
          />
        </div>
      </div>
    </AppShell>
  );
}
