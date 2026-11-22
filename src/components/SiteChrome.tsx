import Link from "next/link";
import { PERSON, PRODUCTS } from "@/lib/content";
import { CommandMenu, SearchButton, type Command } from "./CommandMenu";
import { ThemeToggle } from "./ThemeToggle";

const COMMANDS: Command[] = [
  { id: "home", group: "Pages", label: "Home", href: "/", keywords: "overview start" },
  { id: "work", group: "Pages", label: "Work: case studies", href: "/work", keywords: "projects leafcheckup tinymotion formfino augleak architecture" },
  { id: "resume", group: "Pages", label: "Résumé", href: "/resume", keywords: "cv resume pdf" },
  { id: "s-products", group: "Sections", label: "Products", href: "/#products", keywords: "projects apps" },
  { id: "s-experience", group: "Sections", label: "Experience", href: "/#experience", keywords: "work job maxbrain starlight" },
  { id: "s-research", group: "Sections", label: "Research", href: "/#research", keywords: "papers publications patent datasets" },
  { id: "s-stack", group: "Sections", label: "Tech stack", href: "/#stack", keywords: "skills tools languages" },
  { id: "s-recognition", group: "Sections", label: "Recognition and certifications", href: "/#recognition", keywords: "awards oracle springer press" },
  { id: "s-education", group: "Sections", label: "Education", href: "/#education", keywords: "bit mesra degree ielts" },
  { id: "s-contact", group: "Sections", label: "Contact", href: "/#contact", keywords: "message hire email" },
  ...PRODUCTS.map((p) => ({ id: `p-${p.slug}`, group: "Products", label: `Open ${p.name}`, url: p.url, hint: new URL(p.url).host, keywords: p.tagline })),
  { id: "copy-email", group: "Contact", label: "Copy email address", copy: PERSON.email, hint: PERSON.email, keywords: "mail" },
  { id: "linkedin", group: "Contact", label: "LinkedIn", url: PERSON.links.linkedin },
  { id: "scholar", group: "Contact", label: "Google Scholar", url: PERSON.links.scholar, keywords: "citations" },
  { id: "orcid", group: "Contact", label: "ORCID", url: PERSON.links.orcid, hint: PERSON.orcidId },
  { id: "github", group: "Contact", label: "GitHub", url: PERSON.links.github, keywords: "code repositories" },
  { id: "theme", group: "Settings", label: "Toggle dark mode", action: "theme", keywords: "theme light dark" },
];

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-md">
      <div className="frame flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-[-0.01em]" aria-label="Pranay Agarwal, home">
          <span className="grid size-7 place-items-center rounded-md bg-[var(--ink)] text-[0.75rem] font-bold text-[var(--bg)]">{PERSON.initials}</span>
          <span className="hidden sm:inline">{PERSON.name}</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 text-[0.9375rem]">
          <Link href="/work" className="rounded-lg px-2.5 py-1.5 text-[var(--ink-2)] hover:text-[var(--ink)]">Work</Link>
          <Link href="/resume" className="rounded-lg px-2.5 py-1.5 text-[var(--ink-2)] hover:text-[var(--ink)]">Résumé</Link>
          <span className="mx-1 h-5 w-px bg-[var(--line)]" aria-hidden />
          <SearchButton />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="no-print">
      <div className="frame rule flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-7 text-[0.875rem] sm:px-10">
        <p className="muted">© {new Date().getFullYear()} {PERSON.name}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          <li><a className="link" href={`mailto:${PERSON.email}`}>Email</a></li>
          <li><a className="link" href={PERSON.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a className="link" href={PERSON.links.scholar} target="_blank" rel="noopener noreferrer">Google Scholar</a></li>
          <li><a className="link" href={PERSON.links.orcid} target="_blank" rel="noopener noreferrer">ORCID</a></li>
          <li><a className="link" href={PERSON.links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </div>
    </footer>
  );
}

export function GlobalCommandMenu() {
  return <CommandMenu commands={COMMANDS} />;
}
