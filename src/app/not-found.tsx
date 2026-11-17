import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="frame pad py-24">
      <p className="font-mono text-[0.8125rem] text-[var(--accent)]">404 · no detection</p>
      <h1 className="mt-3 text-[2.2rem] font-[700] tracking-[-0.03em]">This page does not exist</h1>
      <p className="lead mt-3 max-w-[52ch]">The link may be out of date. Everything on this site lives on three pages.</p>
      <div className="mt-7 flex flex-wrap gap-2.5">
        <Link className="btn btn-primary" href="/">Home</Link>
        <Link className="btn" href="/work">Work</Link>
        <Link className="btn" href="/resume">Résumé</Link>
      </div>
    </section>
  );
}
