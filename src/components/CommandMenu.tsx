"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toggleTheme } from "./ThemeToggle";

export type Command = {
  id: string;
  label: string;
  group: string;
  hint?: string;
  keywords?: string;
  /** internal path or #anchor */
  href?: string;
  /** opens in a new tab */
  url?: string;
  copy?: string;
  action?: "theme" | "print";
};

const OPEN_EVENT = "open-command-menu";
export const openCommandMenu = () => window.dispatchEvent(new Event(OPEN_EVENT));

export function SearchButton() {
  return (
    <button
      type="button"
      onClick={openCommandMenu}
      className="flex h-9 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--panel)] pr-1.5 pl-2.5 text-[0.875rem] text-[var(--muted)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
      aria-label="Search and jump to (Ctrl K)"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" strokeLinecap="round" />
      </svg>
      <span className="hidden sm:inline">Jump to</span>
      <span className="kbd hidden sm:inline">⌘K</span>
    </button>
  );
}

export function CommandMenu({ commands }: { commands: Command[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => input.current?.focus(), 0);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    const words = q.split(/\s+/);
    return commands.filter((c) => {
      const hay = `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [commands, query]);

  const run = useCallback(
    async (c: Command) => {
      close();
      if (c.copy) {
        try {
          await navigator.clipboard.writeText(c.copy);
          setToast("Email address copied");
        } catch {
          setToast(c.copy);
        }
        setTimeout(() => setToast(null), 2200);
      } else if (c.action === "theme") toggleTheme();
      else if (c.action === "print") window.print();
      else if (c.url) window.open(c.url, "_blank", "noopener,noreferrer");
      else if (c.href) router.push(c.href);
    },
    [close, router],
  );

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const c = results[active];
      if (c) run(c);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  return (
    <>
      {toast && (
        <div role="status" className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-lg bg-[var(--ink)] px-3.5 py-2 text-[0.875rem] text-[var(--bg)] shadow-lg">
          {toast}
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 px-3 pt-[12vh] backdrop-blur-[2px]" onMouseDown={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Jump to"
            className="w-full max-w-[560px] overflow-hidden rounded-xl border border-[var(--line-strong)] bg-[var(--panel)] shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-2.5 border-b border-[var(--line)] px-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[var(--muted)]" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                ref={input}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search sections, projects, links…"
                className="h-13 w-full bg-transparent text-[0.9375rem] outline-none placeholder:text-[var(--muted)]"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
                aria-activedescendant={results[active] ? `cmdk-${results[active].id}` : undefined}
              />
              <span className="kbd">esc</span>
            </div>
            <ul id="cmdk-list" ref={list} role="listbox" className="max-h-[min(60vh,420px)] overflow-y-auto p-1.5">
              {results.length === 0 && <li className="px-3 py-6 text-center text-[0.875rem] text-[var(--muted)]">Nothing matches “{query}”.</li>}
              {results.map((c, i) => {
                const header = i === 0 || results[i - 1].group !== c.group;
                return (
                  <li key={c.id} role="presentation">
                    {header && <div className="px-2.5 pt-2.5 pb-1 text-[0.75rem] font-medium text-[var(--muted)]">{c.group}</div>}
                    <div
                      id={`cmdk-${c.id}`}
                      role="option"
                      aria-selected={i === active}
                      data-index={i}
                      onMouseMove={() => setActive(i)}
                      onClick={() => run(c)}
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-[0.9375rem] ${i === active ? "bg-[var(--accent-soft)] text-[var(--ink)]" : "text-[var(--ink-2)]"}`}
                    >
                      <span>{c.label}</span>
                      {c.hint && <span className="mono shrink-0 text-[var(--muted)]">{c.hint}</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-3 border-t border-[var(--line)] px-4 py-2 text-[0.75rem] text-[var(--muted)]">
              <span><span className="kbd">↑</span> <span className="kbd">↓</span> to move</span>
              <span><span className="kbd">enter</span> to open</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
