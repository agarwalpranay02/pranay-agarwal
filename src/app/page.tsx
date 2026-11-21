import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { DetectLabel } from "@/components/DetectLabel";
import { Rich } from "@/components/Rich";
import { ArrowUpRight, DocIcon, LinkedInIcon, MailIcon, OrcidIcon, PinIcon, ScholarIcon } from "@/components/Icons";
import {
  BEYOND, CERTIFICATIONS, DATASETS, DESIGN_REGISTRATION, EDUCATION, PAPERS, PERSON, PRODUCTS, RECOGNITION, SCHOOLING,
} from "@/lib/content";
import { RESUME } from "@/lib/resume";
import { STACK } from "@/lib/stack";

function Section({ id, title, aside, children }: { id: string; title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="frame rule pad">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 id={`${id}-h`} className="h2">{title}</h2>
        {aside && <div className="muted text-[0.875rem]">{aside}</div>}
      </div>
      {children}
    </section>
  );
}

/** Puts the author's own name in bold in an author list. */
function Authors({ list }: { list: string }) {
  const parts = list.split(/(P\. Agarwal)/);
  return <>{parts.map((p, i) => (p === "P. Agarwal" ? <strong key={i} className="font-semibold text-[var(--ink)]">{p}</strong> : p))}</>;
}

function Hero() {
  return (
    <section className="frame pad pt-14 sm:pt-16">
      <div className="grid items-center gap-x-10 gap-y-10 sm:grid-cols-[auto_1fr]">
        <div className="relative mt-6 ml-3 size-[132px] shrink-0 sm:mt-4">
          <Image
            src="/img/pranay.webp"
            alt="Portrait of Pranay Agarwal"
            width={265}
            height={265}
            priority
            className="size-[132px] rounded-[3px] object-cover"
          />
          <span className="detect-frame" aria-hidden />
          <DetectLabel />
        </div>
        <div>
          <h1 className="text-[2.6rem] leading-[1.02] font-[720] tracking-[-0.035em] sm:text-[3.25rem]">{PERSON.name}</h1>
          <p className="mt-3 text-[1.0625rem] font-medium">
            {PERSON.role} at {PERSON.company}
          </p>
          <ul className="muted mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
            <li className="flex items-center gap-1.5"><PinIcon width={15} height={15} /> {PERSON.location}</li>
            <li className="flex items-center gap-2"><span className="dot-live" aria-hidden /> {PERSON.status}</li>
          </ul>
        </div>
      </div>
      <p className="lead mt-8 max-w-[62ch]">
        {PERSON.summary} Three of my products are live. The research behind two of them is published by Springer, and the field device I co-designed is a registered design with the Government of India.
      </p>
      <div className="no-print mt-7 flex flex-wrap gap-2.5">
        <a className="btn btn-primary" href={`mailto:${PERSON.email}`}><MailIcon /> Email me</a>
        <Link className="btn" href="/resume"><DocIcon /> Résumé</Link>
        <a className="btn" href={PERSON.links.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon /> LinkedIn</a>
        <a className="btn" href={PERSON.links.scholar} target="_blank" rel="noopener noreferrer"><ScholarIcon /> Scholar</a>
        <a className="btn" href={PERSON.links.orcid} target="_blank" rel="noopener noreferrer"><OrcidIcon /> ORCID</a>
      </div>
    </section>
  );
}

function Products() {
  return (
    <Section id="products" title="Products" aside={<Link href="/work" className="link">Case studies</Link>}>
      <div className="grid gap-10">
        {PRODUCTS.map((p) => (
          <article key={p.slug} className="det">
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel)]" tabIndex={-1} aria-hidden>
              <Image src={p.image} alt="" width={1280} height={800} sizes="(min-width: 784px) 704px, 100vw" className="aspect-[16/10] w-full object-cover object-top" />
            </a>
            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[1.25rem] font-[680] tracking-[-0.02em]">{p.name}</h3>
              <span className="mono muted">{new URL(p.url).host}</span>
            </div>
            <p className="font-medium">{p.tagline}</p>
            <p className="ink-2 mt-2 text-[0.9375rem]">{p.summary}</p>
            <dl className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)]">
              {p.metrics.map((m) => (
                <div key={m.label} className="bg-[var(--panel)] px-3 py-3">
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="text-[1.0625rem] font-[680] tracking-[-0.01em]">{m.value}</dd>
                  <dd className="muted mt-0.5 text-[0.75rem] leading-snug">{m.label}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${p.name} stack`}>
              {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a className="btn btn-primary" href={p.url} target="_blank" rel="noopener noreferrer">Open {p.name} <ArrowUpRight /></a>
              <Link className="btn" href={`/work#${p.slug}`}>How it works</Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/** The site carries no GitHub links (by request); the résumé keeps its code links. */
const withoutGitHub = (t: string) => t.replace(/\s*\(\[code\]\(https:\/\/github\.com[^)]*\)\)/g, "");

function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="grid gap-9">
        {RESUME.experience.map((r) => (
          <li key={r.title}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-[1.0625rem] font-[650]">{r.title}</h3>
              <span className="muted text-[0.875rem]">{r.right}</span>
            </div>
            <p className="ink-2 text-[0.9375rem]">
              {r.sub}
              {r.current && <span className="ml-2 rounded-[4px] bg-[var(--accent-soft)] px-1.5 py-px text-[0.75rem] font-medium text-[var(--accent)]">Current</span>}
            </p>
            <p className="muted text-[0.875rem]">{r.subRight}</p>
            <ul className="exp-list ink-2 mt-3 grid list-disc gap-1.5 pl-5 text-[0.9375rem] marker:text-[var(--line-strong)]">
              {r.bullets?.map((b) => <li key={b}><Rich text={withoutGitHub(b)} /></li>)}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
function Stack() {
  return (
    <Section id="stack" title="Tech stack">
      <div className="grid gap-7">
        {STACK.map((g) => (
          <div key={g.name} className="grid gap-x-6 gap-y-2.5 sm:grid-cols-[176px_1fr]">
            <h3 className="pt-1 text-[0.9375rem] font-[650]">{g.name}</h3>
            <ul className="flex flex-wrap content-start gap-1.5">
              {g.tools.map((t) => (
                <li key={t.name} className="chip">
                  {t.icon ? (
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden className="shrink-0 text-[var(--ink)]"><path d={t.icon.path} /></svg>
                  ) : (
                    <span aria-hidden className="grid size-3.5 shrink-0 place-items-center rounded-[3px] bg-[var(--ink)] text-[8px] font-bold text-[var(--bg)]">{t.name[0]}</span>
                  )}
                  {t.name}
                  {t.note && <span className="muted">{t.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Research() {
  return (
    <Section id="research" title="Research" aside={<a className="link" href={PERSON.links.scholar} target="_blank" rel="noopener noreferrer">Google Scholar</a>}>
      <h3 className="mb-3 text-[0.9375rem] font-[650]">Papers</h3>
      <ol className="grid gap-5">
        {PAPERS.map((p) => (
          <li key={p.title} className="grid gap-1">
            <p className="font-medium leading-snug">
              {p.url || p.doi ? <a className="link" href={p.url ?? `https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer">{p.title}</a> : p.title}
            </p>
            <p className="muted text-[0.875rem]"><Authors list={p.authors} /> · {p.year}</p>
            <p className="ink-2 text-[0.875rem]">{p.venue}</p>
            <p className="my-1.5 max-w-[68ch] border-l-2 border-[var(--line-strong)] pl-3 text-[0.9375rem] leading-relaxed text-[var(--ink-2)]">
              {p.summary}
              {p.product && (
                <>
                  {" "}
                  <Link className="link whitespace-nowrap" href={`/work#${p.product}`}>
                    Became {PRODUCTS.find((x) => x.slug === p.product)?.name}
                  </Link>
                </>
              )}
            </p>
            <p className="flex flex-wrap items-center gap-2 text-[0.8125rem]">
              <span className={`rounded-[4px] px-1.5 py-px font-medium ${p.status === "published" ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "border border-[var(--line-strong)] text-[var(--ink-2)]"}`}>
                {p.status === "published" ? "Published" : "To appear"}
              </span>
              {p.note && <span className="muted">{p.note}</span>}
              {p.doi && <span className="mono muted">doi:{p.doi}</span>}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-9 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 text-[0.9375rem] font-[650]">Registered design</h3>
          <p className="font-medium leading-snug">{DESIGN_REGISTRATION.title}</p>
          <p className="ink-2 mt-1 text-[0.875rem]">{DESIGN_REGISTRATION.office}, {DESIGN_REGISTRATION.law}</p>
          <p className="muted text-[0.875rem]">Design No. <span className="mono">{DESIGN_REGISTRATION.number}</span>, registered {DESIGN_REGISTRATION.date}</p>
          <p className="muted text-[0.875rem]"><Authors list={DESIGN_REGISTRATION.people} /></p>
          <a className="link mt-2 inline-block text-[0.875rem]" href={DESIGN_REGISTRATION.certificate} target="_blank" rel="noopener noreferrer">View the certificate</a>
        </div>
        <div>
          <h3 className="mb-3 text-[0.9375rem] font-[650]">Public datasets</h3>
          <ul className="grid gap-4">
            {DATASETS.map((d) => (
              <li key={d.doi}>
                <a className="link font-medium leading-snug" href={d.url} target="_blank" rel="noopener noreferrer">{d.title}</a>
                <p className="ink-2 mt-0.5 text-[0.875rem]">{d.host}: {d.detail}</p>
                <p className="mono muted text-[0.8125rem]">doi:{d.doi}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Recognition() {
  const withImg = RECOGNITION.filter((r) => r.image);
  const rest = RECOGNITION.filter((r) => !r.image);
  return (
    <Section id="recognition" title="Recognition and certifications">
      <div className="grid gap-6 sm:grid-cols-2">
        {withImg.map((r) => {
          const img = (
            <Image src={r.image!} alt={r.imageAlt ?? ""} width={1000} height={720} sizes="(min-width: 640px) 340px, 100vw" className="aspect-[4/3] w-full rounded-md border border-[var(--line)] object-cover object-top" />
          );
          return (
            <figure key={r.title} className="det">
              {r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer" aria-label={`${r.title}, open`}>{img}</a> : img}
              <figcaption className="mt-3">
                <p className="font-medium leading-snug">{r.title}</p>
                <p className="muted mt-0.5 text-[0.875rem]">{r.detail}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <ul className="mt-6 grid gap-3">
        {rest.map((r) => (
          <li key={r.title} className="text-[0.9375rem]">
            {r.url ? <a className="link font-medium" href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a> : <span className="font-medium">{r.title}</span>}. <span className="muted">{r.detail}</span>
          </li>
        ))}
      </ul>

      <h3 className="mt-10 mb-4 text-[0.9375rem] font-[650]">Certifications</h3>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
        {CERTIFICATIONS.filter((c) => c.image).map((c) => (
          <li key={c.name}>
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="group block text-center">
              <Image src={c.image!} alt="" width={240} height={240} className="mx-auto size-[104px] transition-transform group-hover:-translate-y-0.5" />
              <span className="mt-2 block text-[0.8125rem] leading-snug font-medium group-hover:text-[var(--accent)]">{c.name}</span>
              <span className="muted block text-[0.75rem]">{c.issuer}, {c.date}</span>
            </a>
          </li>
        ))}
      </ul>
      {CERTIFICATIONS.filter((c) => !c.image).map((c) => (
        <p key={c.name} className="mt-5 text-[0.9375rem]">
          <a className="link font-medium" href={c.url} target="_blank" rel="noopener noreferrer">{c.name}</a>{" "}
          <span className="muted">{c.issuer}, {c.date}</span>
        </p>
      ))}
      <p className="mt-2 text-[0.9375rem]">
        <span className="font-medium">{EDUCATION.extra.name}: {EDUCATION.extra.score}</span>{" "}
        <span className="muted">{EDUCATION.extra.detail}</span>
      </p>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" title="Education">
      <div className="grid gap-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <div>
            <h3 className="font-[650]">{EDUCATION.school}</h3>
            <p className="ink-2 text-[0.9375rem]">{EDUCATION.degree}</p>
            <p className="muted text-[0.875rem]">{EDUCATION.grade}</p>
          </div>
          <span className="muted text-[0.875rem]">{EDUCATION.period}</span>
        </div>
        {SCHOOLING.map((s) => (
          <div key={s.level} className="flex flex-wrap items-baseline justify-between gap-x-4">
            <p className="text-[0.9375rem]">
              <span className="font-medium">{s.level}: {s.score}</span> <span className="muted">{s.school}</span>
            </p>
            <span className="muted text-[0.875rem]">{s.year}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Beyond() {
  return (
    <Section id="beyond" title="Leadership and volunteering">
      <ul className="grid gap-4">
        {BEYOND.map((b) => (
          <li key={b.title}>
            <p className="font-medium">{b.title}</p>
            <p className="muted text-[0.9375rem]">{b.detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Get in touch">
      <p className="lead mb-6 max-w-[56ch]">Hiring for an ML or software engineering role, or want to work on a research problem together? Send a note and I will get back to you.</p>
      <ContactForm email={PERSON.email} />
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Experience />
      <Research />
      <Stack />
      <Recognition />
      <Education />
      <Beyond />
      <Contact />
    </>
  );
}
