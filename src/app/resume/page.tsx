import type { Metadata } from "next";
import { Rich } from "@/components/Rich";
import { DocIcon } from "@/components/Icons";
import { PrintButton } from "@/components/PrintButton";
import { RESUME } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Résumé",
  description: "One-page résumé of Pranay Agarwal, AI/ML engineer: education, experience, shipped products, publications and skills.",
  alternates: { canonical: "/resume" },
};

const PDF_PATH = "/pranay-agarwal-resume.pdf";
const TEX_PATH = "/pranay-agarwal-resume.tex";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cv-block">
      <h2 className="cv-h">{title}</h2>
      {children}
    </section>
  );
}

export default function ResumePage() {
  const r = RESUME;
  return (
    <div className="frame pad pt-10 sm:pt-12">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="h2">Résumé</h1>
        <div className="flex flex-wrap gap-2.5">
          <a className="btn btn-primary" href={PDF_PATH} download>
            <DocIcon /> Download PDF
          </a>
          <a className="btn" href={TEX_PATH} download>LaTeX source</a>
          <PrintButton />
        </div>
      </div>

      <article className="cv" aria-label="Résumé of Pranay Agarwal">
        <header className="cv-head">
          <p className="cv-name">{r.name}</p>
          <ul className="cv-contact">
            {r.contacts.map((c) => (
              <li key={c.url}><a href={c.url}>{c.label}</a></li>
            ))}
          </ul>
        </header>

        <Block title="Education">
          {r.education.map((e) => (
            e.compact ? (
              <div key={e.title} className="cv-item">
                <div className="cv-row"><p><strong>{e.title}</strong> <span className="cv-sep">|</span> <em className="cv-tech">{e.sub}</em></p><p>{e.right}</p></div>
              </div>
            ) : (
            <div key={e.title} className="cv-item">
              <div className="cv-row"><p><strong>{e.title}</strong></p><p>{e.right}</p></div>
              {e.sub && <div className="cv-row cv-sub"><p><Rich text={e.sub} /></p><p>{e.subRight}</p></div>}
            </div>
            )
          ))}
        </Block>

        <Block title="Experience">
          {r.experience.map((e) => (
            <div key={e.title} className="cv-item">
              <div className="cv-row"><p><strong>{e.title}</strong></p><p>{e.right}</p></div>
              {e.roles?.map((role) => (
                <div key={role.title} className="cv-row cv-sub"><p>{role.title}</p><p>{role.dates}</p></div>
              ))}
              <ul className="cv-list">{e.bullets?.map((b) => <li key={b}><Rich text={b} /></li>)}</ul>
            </div>
          ))}
        </Block>

        <Block title="Projects">
          {r.projects.map((p) => (
            <div key={p.name} className="cv-item">
              <div className="cv-row">
                <p><strong>{p.name}</strong> <span className="cv-sep">|</span> <em className="cv-tech">{p.tech}</em></p>
                <p className="cv-links">
                  {p.links.map((l, i) => (
                    <span key={l.url}>{i > 0 && <span className="cv-sep"> | </span>}<a className="cv-link" href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a></span>
                  ))}
                </p>
              </div>
              <ul className="cv-list">{p.bullets.map((b) => <li key={b}><Rich text={b} /></li>)}</ul>
            </div>
          ))}
        </Block>

        <Block title="Publications">
          <ul className="cv-list">
            {r.publications.map((p) => (
              <li key={p.text}>
                {p.url ? <a className="cv-pub" href={p.url} target="_blank" rel="noopener noreferrer"><Rich text={p.text} /></a> : <Rich text={p.text} />}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Technical Skills">
          <dl className="cv-skills">
            {r.skills.map((s) => (
              <div key={s.label}><dt>{s.label}:</dt><dd>{s.items}</dd></div>
            ))}
          </dl>
        </Block>

        <Block title="Achievements & Certifications">
          <ul className="cv-list">{r.achievements.map((a) => <li key={a}><Rich text={a} /></li>)}</ul>
        </Block>
      </article>
    </div>
  );
}
