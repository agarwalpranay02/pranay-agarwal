"use client";

import { useEffect, useState } from "react";

/** Counts one view per browser session and shows the running total. Silent when the database is not configured. */
export function ViewCount() {
  const [views, setViews] = useState<number | null>(null);
  useEffect(() => {
    let counted = false;
    try {
      counted = sessionStorage.getItem("viewed") === "1";
      sessionStorage.setItem("viewed", "1");
    } catch {
      /* storage blocked: count anyway */
    }
    fetch("/api/views", { method: counted ? "GET" : "POST", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { views?: number } | null) => {
        if (typeof d?.views === "number") setViews(d.views);
      })
      .catch(() => {});
  }, []);
  if (views === null) return null;
  return (
    <>
      <dt className="muted">Visitors</dt>
      <dd className="tabular-nums">{views.toLocaleString("en-IN")}</dd>
    </>
  );
}
