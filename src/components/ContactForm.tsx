"use client";

import { useState } from "react";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string; field?: string };

export function ContactForm({ email }: { email: string }) {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState({ kind: "sending" });
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const body = (await r.json().catch(() => ({}))) as { error?: string; field?: string };
      if (r.ok) {
        form.reset();
        setState({ kind: "sent" });
      } else setState({ kind: "error", message: body.error ?? "Something went wrong. Please email me directly.", field: body.field });
    } catch {
      setState({ kind: "error", message: "You seem to be offline. Please email me directly." });
    }
  }

  if (state.kind === "sent")
    return (
      <div role="status" className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5">
        <p className="font-semibold">Message sent. Thank you.</p>
        <p className="muted mt-1 text-[0.9375rem]">I read every message and usually reply within a day.</p>
        <button type="button" className="link mt-3 text-[0.9375rem]" onClick={() => setState({ kind: "idle" })}>
          Send another
        </button>
      </div>
    );

  const invalid = (f: string) => (state.kind === "error" && state.field === f ? true : undefined);
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3" aria-describedby={state.kind === "error" ? "contact-error" : undefined}>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5 text-[0.875rem] font-medium">
          Name
          <input name="name" required maxLength={120} autoComplete="name" className="field" aria-invalid={invalid("name")} />
        </label>
        <label className="grid gap-1.5 text-[0.875rem] font-medium">
          Email
          <input name="email" type="email" required maxLength={200} autoComplete="email" className="field" aria-invalid={invalid("email")} />
        </label>
      </div>
      <label className="grid gap-1.5 text-[0.875rem] font-medium">
        <span>
          Company <span className="muted font-normal">(optional)</span>
        </span>
        <input name="company" maxLength={160} autoComplete="organization" className="field" />
      </label>
      <label className="grid gap-1.5 text-[0.875rem] font-medium">
        Message
        <textarea name="message" required minLength={10} maxLength={4000} rows={4} className="field resize-y" aria-invalid={invalid("message")} />
      </label>
      {/* honeypot, hidden from people and assistive tech */}
      <div aria-hidden className="absolute left-[-10000px] h-px w-px overflow-hidden">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {state.kind === "error" && (
        <p id="contact-error" role="alert" className="text-[0.9375rem] text-[#b42318] dark:text-[#ff8a80]">
          {state.message}{" "}
          <a className="link" href={`mailto:${email}`}>
            {email}
          </a>
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn btn-primary" disabled={state.kind === "sending"}>
          {state.kind === "sending" ? "Sending…" : "Send message"}
        </button>
        <span className="muted text-[0.875rem]">
          or email <a className="link" href={`mailto:${email}`}>{email}</a>
        </span>
      </div>
    </form>
  );
}
