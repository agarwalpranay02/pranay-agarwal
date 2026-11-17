import type { Metadata } from "next";
import { DocIcon } from "@/components/Icons";
import { PrintButton } from "@/components/PrintButton";
import {
  CERTIFICATIONS, DATASETS, DESIGN_REGISTRATION, EDUCATION, EXPERIENCE, PAPERS, PERSON, PRODUCTS, SITE,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Résumé of Pranay Agarwal, AI/ML engineer: experience, shipped products, publications, skills and education.",
  alternates: { canonical: "/resume" },
};

const PDF_PATH = "/pranay-agarwal-resume.pdf";

const SKILLS: { area: string; items: string }[] = [
  { area: "Machine learning", items: "PyTorch, TensorFlow, Keras, scikit-learn, XGBoost, timm, OpenCV, NumPy, pandas, SciPy" },
  { area: "On-device AI", items: "ONNX Runtime Web, WebAssembly, WebGPU, TensorFlow Lite (INT8), TFLite Micro, C99 inference" },
  { area: "Generative AI", items: "LangChain, RAG, vector search, OpenAI API, prompt engineering" },
  { area: "Languages", items: "Python, TypeScript, JavaScript, C, C++, Java, SQL, Bash" },
  { area: "Web and data", items: "Next.js, React, Node.js, FastAPI, Flask, PostgreSQL, MongoDB, Elasticsearch, Drizzle ORM" },
  { area: "Infrastructure", items: "Docker, Vercel, Neon, GitHub Actions, Playwright, Vitest, pytest, OpenTelemetry, Linux" },
];

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cv-block">
      <h2 className="cv-h">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function ResumePage() {
  const papers = PAPERS;
  return (
    <div className="frame pad pt-10 sm:pt-12">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="h2">Résumé</h1>
        <div className="flex flex-wrap gap-2.5">
          <a className="btn btn-primary" href={PDF_PATH} download>
            <DocIcon /> Download PDF
          </a>
          <PrintButton />
        </div>
      </div>

      <article className="cv" aria-label="Résumé of Pranay Agarwal">
        <header className="cv-head">
          <div>
            <p className="cv-name">{PERSON.name}</p>
            <p className="cv-role">{PERSON.role}, {PERSON.company} · {PERSON.location}</p>
          </div>
          <ul className="cv-contact">
            <li><a href={`mailto:${PERSON.email}`}>{PERSON.email}</a></li>
            <li><a href={SITE.url}>{host(SITE.url)}</a></li>
            <li><a href={PERSON.links.linkedin}>linkedin.com/in/pranay-agarwal-83b177295</a></li>
            <li><a href={PERSON.links.orcid}>ORCID {PERSON.orcidId}</a></li>
          </ul>
        </header>

        <p className="cv-summary">
          {PERSON.summary}
        </p>

        <Block title="Experience">
          {EXPERIENCE.map((r) => (
            <div key={r.company} className="cv-item">
              <div className="cv-row">
                <p><strong>{r.title}</strong>, {r.company}, {r.place}</p>
                <p className="cv-date">{r.period}</p>
              </div>
              <ul className="cv-list">
                {r.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </Block>

        <Block title="Products">
          {PRODUCTS.map((p) => (
            <div key={p.slug} className="cv-item">
              <div className="cv-row">
                <p><strong>{p.name}</strong>: {p.tagline.toLowerCase()}</p>
                <p className="cv-date"><a href={p.url}>{host(p.url)}</a></p>
              </div>
              <ul className="cv-list">
                <li>{p.summary} {p.metrics.map((m) => `${m.value} ${m.label}`).join("; ")}.</li>
              </ul>
            </div>
          ))}
        </Block>

        <Block title="Publications">
          <ol className="cv-pubs">
            {papers.map((p) => (
              <li key={p.title}>
                {p.authors.split(/(P\. Agarwal)/).map((part, i) => (part === "P. Agarwal" ? <strong key={i}>{part}</strong> : part))}.{" "}
                <em>{p.title}.</em> {p.venue}, {p.year}.{" "}
                {p.doi ? <>doi:{p.doi}</> : <>To appear.</>}
              </li>
            ))}
          </ol>
          <p className="cv-line">
            <strong>Registered design</strong> No. {DESIGN_REGISTRATION.number}, Government of India, {DESIGN_REGISTRATION.date}: {DESIGN_REGISTRATION.title}.
          </p>
          <p className="cv-line">
            <strong>Datasets</strong>{" "}
            {DATASETS.map((d, i) => (
              <span key={d.doi}>{i > 0 && "; "}{d.short}, {d.host}, doi:{d.doi}</span>
            ))}.
          </p>
        </Block>

        <Block title="Skills">
          <dl className="cv-skills">
            {SKILLS.map((s) => (
              <div key={s.area}><dt>{s.area}</dt><dd>{s.items}</dd></div>
            ))}
          </dl>
        </Block>

        <Block title="Education">
          <div className="cv-row">
            <p><strong>{EDUCATION.school}</strong>, {EDUCATION.degree}. {EDUCATION.grade}. {EDUCATION.extra.name} {EDUCATION.extra.score}.</p>
            <p className="cv-date">{EDUCATION.period}</p>
          </div>
        </Block>

        <Block title="Certifications and recognition">
          <ul className="cv-list">
            <li>Oracle: {CERTIFICATIONS.filter((c) => c.issuer === "Oracle").map((c) => c.name.replace(/^OCI 2025 Certified |^Oracle /, "").replace(" Certified Professional", " Professional")).join(", ")} (2025). McKinsey.org Forward Program (2025).</li>
            <li>Featured researcher, Springer Nature India Research Tour 2025; ridge gourd work covered by Punjab Kesari; dataset featured in the IEEE DataPort newsletter.</li>
            <li>Paper presenter, WCAIAA 2026 (NFSU Goa). Coordinator, Sports Committee, BIT Mesra.</li>
          </ul>
        </Block>
      </article>
    </div>
  );
}
