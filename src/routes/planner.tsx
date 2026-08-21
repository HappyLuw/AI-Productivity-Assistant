import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AiOutput, Field, inputClass, submitClass } from "@/components/ai-output";
import { planTasks } from "@/lib/ai.functions";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — NexusAI" },
      {
        name: "description",
        content:
          "Prioritise your task list and get a realistic time-blocked schedule for the working day.",
      },
      { property: "og:title", content: "AI Task Planner — NexusAI" },
      {
        property: "og:description",
        content: "Eisenhower-style prioritisation plus a time-blocked daily schedule.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const run = useServerFn(planTasks);
  const [tasks, setTasks] = useState("");
  const [hours, setHours] = useState("09:00 - 17:00");
  const [focus, setFocus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!tasks.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await run({ data: { tasks, hours, focus } });
      setResult(res.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The AI request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell title="AI Task Planner">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form onSubmit={submit} className="lg:col-span-5 space-y-5">
          <Field label="Tasks and context">
            <textarea
              rows={10}
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              className={`${inputClass} resize-none`}
              placeholder={"One per line, e.g.\nFinalise Q3 slide deck (due tomorrow)\nReview PR #402\nCall vendor about invoice"}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Working hours">
              <input
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Focus of the day">
              <input
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                className={inputClass}
                placeholder="Optional"
              />
            </Field>
          </div>
          <button type="submit" disabled={loading || !tasks.trim()} className={submitClass}>
            {loading ? "Building plan..." : "Optimise Schedule"}
          </button>
        </form>

        <div className="lg:col-span-7">
          <AiOutput
            loading={loading}
            error={error}
            content={result}
            emptyHint="List today's tasks to get a prioritised ranking and a realistic time-blocked schedule."
          />
        </div>
      </div>
    </AppShell>
  );
}
