"use client";

import { useEffect, useState } from "react";

/** What a detector would print over the photo. Starts on "person", the real COCO class for a human. */
const LABELS = ["person 0.99", "researcher 0.97", "engineer 0.98", "builder 0.96"];

export function DetectLabel() {
  // tick counts every swap, so the first render keeps the slower entrance and later ones fade in quickly
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((n) => n + 1), 2600);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span key={tick} className={tick === 0 ? "detect-label" : "detect-label detect-swap"} aria-hidden>
      {LABELS[tick % LABELS.length]}
    </span>
  );
}
