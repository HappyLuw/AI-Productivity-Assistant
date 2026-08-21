import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { DISCLAIMER } from "@/components/ai-output";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NexusAI — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate daily work: generate emails, summarise meetings, plan tasks and research topics with AI.",
      },
      { property: "og:title", content: "NexusAI — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "One workspace for AI email drafting, meeting recaps, task prioritisation and research briefings.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell title="Intelligence Hub">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Email Generator */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="size-10 bg-info-soft text-info rounded-lg flex items-center justify-center font-bold font-display">
              E
            </div>
            <span className="text-xs font-semibold text-info uppercase tracking-wider bg-info-soft px-2 py-1 rounded">
              Tool
            </span>
          </div>
          <h2 className="text-lg font-display font-semibold mb-2">Smart Email Gen</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Draft professional replies in seconds based on custom tones.
          </p>

          <div className="space-y-3 flex-1">
            <div className="p-3 bg-background border border-border rounded-lg">
              <p className="text-xs font-semibold text-muted-foreground mb-1">TONE</p>
              <div className="flex gap-2">
                <span className="text-xs bg-surface border border-border px-2 py-1 rounded-md">
                  Urgent
                </span>
                <span className="text-xs bg-brand text-primary-foreground px-2 py-1 rounded-md">
                  Professional
                </span>
              </div>
            </div>
            <div className="h-24 bg-background border border-border border-dashed rounded-lg grid place-items-center">
              <span className="text-xs text-muted-foreground">Paste context here...</span>
            </div>
          </div>
          <Link
            to="/email"
            className="mt-6 w-full py-2 bg-foreground text-background rounded-lg text-sm font-medium text-center"
          >
            Generate Draft
          </Link>
        </div>

        {/* Meeting Summarizer */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="size-10 bg-success-soft text-success rounded-lg flex items-center justify-center font-bold font-display">
              S
            </div>
            <div className="flex items-center gap-1">
              <div className="size-2 bg-success rounded-full animate-pulse" />
              <span className="text-xs font-medium text-success">Ready</span>
            </div>
          </div>
          <h2 className="text-lg font-display font-semibold mb-2">Meeting Summarizer</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-2 bg-secondary rounded w-full" />
              <div className="h-2 bg-secondary rounded w-5/6" />
              <div className="h-2 bg-secondary rounded w-4/6" />
            </div>
            <div className="p-3 border border-success/20 bg-success-soft rounded-lg">
              <p className="text-xs font-bold text-success mb-2 uppercase">Key Takeaway</p>
              <p className="text-sm text-foreground">
                Launch moved to Q4. Engineering needs 2 more weeks for the API stability tests.
              </p>
            </div>
            <Link
              to="/summarizer"
              className="block w-full py-2 border border-border hover:bg-secondary rounded-lg text-sm font-medium text-center"
            >
              Summarise Notes
            </Link>
          </div>
          <div className="mt-auto pt-6">
            <p className="text-[10px] text-muted-foreground text-center italic">{DISCLAIMER}</p>
          </div>
        </div>

        {/* Task Planner */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="size-10 bg-warning-soft text-warning rounded-lg flex items-center justify-center font-bold font-display">
              P
            </div>
          </div>
          <h2 className="text-lg font-display font-semibold mb-2">AI Task Planner</h2>
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-3 p-2 bg-background rounded-lg">
              <div className="size-4 border-2 border-brand rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">Finalize Slide Deck</p>
                <span className="text-[10px] px-1.5 py-0.5 bg-destructive/10 text-destructive rounded font-bold uppercase">
                  Critical
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2">
              <div className="size-4 border-2 border-border rounded-full" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Review PR #402</p>
                <span className="text-[10px] px-1.5 py-0.5 bg-secondary text-muted-foreground rounded font-bold uppercase">
                  Low
                </span>
              </div>
            </div>
          </div>
          <Link
            to="/planner"
            className="block w-full py-2 border border-border hover:bg-secondary rounded-lg text-sm font-medium text-center"
          >
            Optimize Schedule
          </Link>
        </div>
      </div>

      {/* Research Section */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="flex border-b border-border">
          <span className="px-6 py-4 text-sm font-semibold border-b-2 border-brand">
            Research Assistant
          </span>
        </div>
        <div className="p-6 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <h2 className="font-display font-semibold text-lg">
              Market Trends: Generative AI in LegalTech
            </h2>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Current analysis shows a 40% uptick in document automation adoption within
                mid-sized firms. Key barriers remain data sovereignty and verification protocols.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-2xl font-display font-bold">40%</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                    Adoption Rate
                  </p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-2xl font-display font-bold">$2.4B</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                    Market Cap (Est.)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-64 space-y-4">
            <div className="w-full aspect-[4/3] rounded-lg bg-background border border-border grid place-items-center px-4">
              <svg viewBox="0 0 200 120" className="w-full" role="img" aria-label="Upward trend">
                <polyline
                  points="8,104 48,84 88,88 128,48 168,20"
                  fill="none"
                  stroke="var(--brand)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="8"
                  y1="112"
                  x2="192"
                  y2="112"
                  stroke="var(--border)"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <Link
              to="/research"
              className="block w-full py-2 bg-brand text-primary-foreground rounded-lg text-xs font-medium text-center"
            >
              Open Research
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
