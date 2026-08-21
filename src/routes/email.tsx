import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AiOutput, Field, inputClass, submitClass } from "@/components/ai-output";
import { generateEmail } from "@/lib/ai.functions";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — NexusAI" },
      {
        name: "description",
        content:
          "Draft professional workplace emails in seconds with tone and audience controls, powered by AI.",
      },
      { property: "og:title", content: "Smart Email Generator — NexusAI" },
      {
        property: "og:description",
        content: "Generate polished, audience-aware work emails with structured AI prompts.",
      },
    ],
  }),
  component: EmailPage,
});

const TONES = ["Professional", "Persuasive", "Concise", "Friendly", "Urgent"];
const AUDIENCES = ["Executive", "Internal Team", "Prospective Client", "Vendor", "Direct Report"];
const LENGTHS = ["Short", "Medium", "Long"];

function EmailPage() {
  const run = useServerFn(generateEmail);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState(TONES[0]);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [length, setLength] = useState("Short");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await run({ data: { topic, tone, audience, length } });
      setResult(res.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The AI request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell title="Smart Email Generator">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form onSubmit={submit} className="lg:col-span-5 space-y-5">
          <Field label="Topic or context">
            <textarea
              rows={5}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={`${inputClass} resize-none`}
              placeholder="e.g. Follow up with the client on the delayed Q3 timeline and propose a new delivery date."
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Tone">
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className={inputClass}
              >
                {TONES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Audience">
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className={inputClass}
              >
                {AUDIENCES.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Desired length">
            <div className="flex gap-2">
              {LENGTHS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLength(l)}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors ${
                    length === l
                      ? "bg-brand text-primary-foreground border-brand"
                      : "bg-surface text-muted-foreground border-border hover:bg-secondary"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </Field>

          <button type="submit" disabled={loading || !topic.trim()} className={submitClass}>
            {loading ? "Generating draft..." : "Generate Draft"}
          </button>
        </form>

        <div className="lg:col-span-7">
          <AiOutput
            loading={loading}
            error={error}
            content={result}
            emptyHint="Describe the email you need, choose a tone and audience, then generate a draft."
          />
        </div>
      </div>
    </AppShell>
  );
}
