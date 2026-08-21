import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Minus, MessageSquare, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { chatWithAssistant } from "@/lib/ai.functions";
import { DISCLAIMER } from "./ai-output";

type Msg = { role: "user" | "assistant"; content: string };

const INITIAL: Msg[] = [
  { role: "assistant", content: "Hello! How can I help with your productivity today?" },
];

export function ChatWidget() {
  const chat = useServerFn(chatWithAssistant);
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await chat({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: res.text }]);
    } catch (error) {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            error instanceof Error ? `⚠️ ${error.message}` : "⚠️ The assistant is unavailable.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 bg-foreground text-background px-4 py-3 rounded-full shadow-lg text-sm font-medium"
      >
        <MessageSquare className="size-4" />
        AI Assistant
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-30 w-[calc(100vw-2rem)] sm:w-80 bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      <div className="bg-foreground p-4 text-background flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`size-2 rounded-full ${loading ? "bg-warning animate-pulse" : "bg-success"}`}
          />
          <span className="text-sm font-medium">AI Workspace Assistant</span>
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Minimise assistant"
          className="opacity-60 hover:opacity-100"
        >
          <Minus className="size-4" />
        </button>
      </div>

      <div className="h-72 p-4 overflow-y-auto bg-background space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={
                m.role === "user"
                  ? "bg-brand text-primary-foreground px-3 py-2 rounded-2xl rounded-tr-none max-w-[85%] text-sm"
                  : "bg-surface border border-border px-3 py-2 rounded-2xl rounded-tl-none max-w-[85%] text-sm [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_p+p]:mt-2 [&_strong]:font-semibold"
              }
            >
              {m.role === "user" ? m.content : <ReactMarkdown>{m.content}</ReactMarkdown>}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-surface border border-border px-3 py-3 rounded-2xl rounded-tl-none flex gap-1">
              {[0, 150, 300].map((d) => (
                <span
                  key={d}
                  className="size-1.5 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: `${d}ms` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={send} className="p-3 border-t border-border bg-surface">
        <div className="flex gap-2 items-center bg-secondary rounded-lg px-3 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Message AI..."
            className="bg-transparent text-sm w-full outline-none text-foreground"
          />
          <button type="submit" disabled={loading} aria-label="Send message">
            <Send className="size-4 text-brand disabled:opacity-40" />
          </button>
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground text-center italic">{DISCLAIMER}</p>
      </form>
    </div>
  );
}
