import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/Icons";
import { CASE_STUDIES, PRODUCTS, type CaseStudy, type Product } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies of LeafCheckup, TinyMotion, FormFino and AugLeak: the problem, the pipeline, the engineering decisions and the measured results.",
  alternates: { canonical: "/work" },
};

function Pipeline({ stages }: { stages: CaseStudy["pipeline"] }) {
  return (
    <ol className="pipeline" aria-label="Pipeline, in order">
      {stages.map((s, i) => (
        <li key={s.title} className="pipeline-stage det">
          <span className="pipeline-where">{s.where}</span>
          <span className="font-medium">{s.title}</span>
          <span className="muted text-[0.84rem] leading-snug">{s.detail}</span>
          {i < stages.length - 1 && <span className="pipeline-link" aria-hidden />}
        </li>
      ))}
    </ol>
  );
}

function Study({ product, study }: { product: Product; study: CaseStudy }) {
  const landscape = study.shots.filter((s) => s.w >= s.h);
  const portrait = study.shots.filter((s) => s.w < s.h);
  return (
    <article id={product.slug} aria-labelledby={`${product.slug}-h`} className="frame rule pad scroll-mt-16">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id={`${product.slug}-h`} className="text-[1.875rem] font-[680] tracking-[-0.025em]">{product.name}</h2>
        <a className="btn btn-primary no-print" href={product.url} target="_blank" rel="noopener noreferrer">
          Open {product.name} <ArrowUpRight />
        </a>
      </div>
      <p className="mt-1 text-[1.0625rem]">{product.tagline}</p>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="h3">Problem</h3>
          <p className="body mt-2">{study.problem}</p>
        </div>
        <div>
          <h3 className="h3">Approach</h3>
          <p className="body mt-2">{study.approach}</p>
        </div>
      </div>

      <Image
        src={product.image}
        alt={product.imageAlt}
        width={1280}
        height={800}
        sizes="(min-width: 800px) 704px, 100vw"
        className="mt-10 w-full rounded-lg border border-[var(--line)]"
        priority={product.slug === "leafcheckup"}
      />

      <h3 className="h3 mt-12">Results</h3>
      <p className="muted mt-2 max-w-[68ch] text-[0.9375rem]">{study.resultsNote}</p>
      <table className="results mt-5">
        <tbody>
          {study.results.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td>
                <span className="font-semibold tabular-nums">{r.value}</span>
                {r.note && <span className="muted block text-[0.8125rem]">{r.note}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="h3 mt-12">How it works</h3>
      <Pipeline stages={study.pipeline} />

      <h3 className="h3 mt-12">Decisions that mattered</h3>
      <div className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {study.decisions.map((d) => (
          <div key={d.title}>
            <p className="font-medium">{d.title}</p>
            <p className="muted mt-1.5 text-[0.9375rem] leading-relaxed">{d.detail}</p>
          </div>
        ))}
      </div>

      <div className={`mt-12 grid gap-5 ${portrait.length ? "sm:grid-cols-[1fr_200px]" : ""}`}>
        {landscape.map((s) => (
          <figure key={s.src}>
            <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="(min-width: 800px) 704px, 100vw" className="w-full rounded-lg border border-[var(--line)]" />
            <figcaption className="muted mt-2 text-[0.84rem]">{s.caption}</figcaption>
          </figure>
        ))}
        {portrait.map((s) => (
          <figure key={s.src} className="mx-auto w-[200px] sm:row-start-1 sm:-row-end-1 sm:col-start-2">
            <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="200px" className="w-full rounded-[22px] border border-[var(--line)]" />
            <figcaption className="muted mt-2 text-[0.84rem]">{s.caption}</figcaption>
          </figure>
        ))}
      </div>

      <h3 className="h3 mt-12">Stack</h3>
      <dl className="stack-table mt-4">
        {study.stack.map((s) => (
          <div key={s.area}>
            <dt>{s.area}</dt>
            <dd>{s.items}</dd>
          </div>
        ))}
      </dl>

      <h3 className="h3 mt-12">Quality and security</h3>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {study.quality.map((q) => (
          <li key={q} className="tick text-[0.9375rem] leading-relaxed">{q}</li>
        ))}
      </ul>

      {study.research && (
        <p className="muted mt-10 border-t border-[var(--line)] pt-5 text-[0.9375rem]">
          {study.research} <Link className="link" href="/#research">Papers and datasets</Link>
        </p>
      )}
    </article>
  );
}

export default function WorkPage() {
  return (
    <>
      <header className="frame pad pt-14 sm:pt-16">
        <h1 className="text-[2.4rem] leading-[1.05] font-[720] tracking-[-0.035em] sm:text-[3rem]">Work</h1>
        <p className="lead mt-4 max-w-[60ch]">
          Four products I designed and shipped end to end. Three grew out of my research, and all four run in the browser of whoever opens them.
        </p>
        <nav aria-label="Case studies" className="mt-7 flex flex-wrap gap-2.5">
          {PRODUCTS.map((p) => (
            <a key={p.slug} href={`#${p.slug}`} className="btn">{p.name}</a>
          ))}
        </nav>
      </header>
      {PRODUCTS.map((p) => {
        const study = CASE_STUDIES.find((c) => c.slug === p.slug);
        return study ? <Study key={p.slug} product={p} study={study} /> : null;
      })}
    </>
  );
}
