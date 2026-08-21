import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  FileText,
  ListChecks,
  Search,
  Menu,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { ChatWidget } from "./chat-widget";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Gen", icon: Mail },
  { to: "/summarizer", label: "Summarizer", icon: FileText },
  { to: "/planner", label: "Task Planner", icon: ListChecks },
  { to: "/research", label: "Research", icon: Search },
] as const;

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-brand rounded-lg flex items-center justify-center">
            <div className="size-4 bg-surface rounded-sm" />
          </div>
          <span className="font-display font-semibold text-xl tracking-tight">NexusAI</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {NAV.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            activeOptions={{ exact: to === "/" }}
            activeProps={{ className: "bg-brand-soft text-brand font-medium" }}
            inactiveProps={{ className: "text-muted-foreground hover:bg-secondary" }}
            className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm"
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-2">
          <div className="size-10 rounded-full bg-secondary grid place-items-center font-display font-semibold text-sm text-muted-foreground">
            AR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Alex Rivera</p>
            <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden lg:flex w-64 border-r border-border bg-sidebar flex-col sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="w-64 bg-sidebar border-r border-border flex flex-col">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
          <button
            aria-label="Close navigation"
            className="flex-1 bg-foreground/20"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-surface flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="lg:hidden text-muted-foreground"
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => setOpen((v) => !v)}
            >
              <Menu className="size-5" />
            </button>
            <h1 className="text-lg font-semibold font-display truncate">{title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex h-8 w-64 bg-secondary rounded-full px-4 items-center">
              <span className="text-xs text-muted-foreground">Search actions or tools...</span>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8 max-w-6xl mx-auto w-full space-y-8 pb-32">{children}</div>
      </main>

      <ChatWidget />
    </div>
  );
}
