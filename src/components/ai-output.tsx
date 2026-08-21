import { useState } from "react";
import { Check, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const DISCLAIMER = "AI-generated content may require human review";

const PROSE =
  "text-sm leading-relaxed text-foreground " +
  "[&_h2]:font-display [&_h2]:font-semibold [&_h2]:text-base [&_h2]:mt-6 [&_h2]:mb-2 first:[&_h2]:mt-0 " +
  "[&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-sm [&_h3]:mt-4 [&_h3]:mb-1 " +
  "[&_p]:mb-3 [&_strong]:font-semibold " +
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ul]:space-y-1 " +
  "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_ol]:space-y-1 " +
  "[&_table]:w-full [&_table]:text-xs [&_table]:mb-4 [&_table]:border [&_table]:border-border " +
  "[&_th]:bg-secondary [&_th]:text-left [&_th]:font-semibold [&_th]:p-2 [&_th]:border [&_th]:border-border " +
  "[&_td]:p-2 [&_td]:border [&_td]:border-border [&_td]:align-top";

export function AiOutput({
  loading,
  error,
  content,
  emptyHint,
}: {
  loading: boolean;
  error?: string | null;
  content?: string | null;
  emptyHint: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="bg-surface border border-border rounded-xl shadow-sm flex flex-col min-h-[420px]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          AI Generated Output
        </span>
        {content && !loading && (
          <button
            onClick={() => {
              navigator.clipboard.writeText(content);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>

      <div className="flex-1 p-6">
        {loading && (
          <div className="space-y-3 animate-pulse">
            <div className="h-3 w-1/3 bg-secondary rounded" />
            <div className="h-3 w-full bg-secondary rounded" />
            <div className="h-3 w-5/6 bg-secondary rounded" />
            <div className="h-3 w-4/6 bg-secondary rounded" />
            <div className="h-24 w-full bg-secondary rounded mt-6" />
            <div className="h-3 w-2/3 bg-secondary rounded" />
          </div>
        )}
        {!loading && error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </div>
        )}
        {!loading && !error && content && (
          <div className={PROSE}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
        {!loading && !error && !content && (
          <div className="h-full min-h-[280px] grid place-items-center text-center">
            <p className="text-sm text-muted-foreground max-w-xs">{emptyHint}</p>
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-border">
        <p className="text-[10px] text-muted-foreground italic">{DISCLAIMER}</p>
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
        {label}
      </label>
      {children}
    </div>
  );
}

export const inputClass =
  "w-full p-3 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/40 transition-colors placeholder:text-muted-foreground";

export const submitClass =
  "w-full py-2.5 bg-brand text-primary-foreground rounded-lg text-sm font-medium shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50";
