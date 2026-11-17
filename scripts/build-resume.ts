/**
 * Writes resume/pranay-agarwal-resume.tex from src/lib/resume.ts (Jake Gutierrez's template,
 * MIT licence) and compiles it to public/pranay-agarwal-resume.pdf with pdflatex.
 * Usage: npm run resume   (needs a TeX Live install with pdflatex)
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { RESUME } from "../src/lib/resume";

const esc = (s: string) =>
  s
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([&%$#_{}])/g, "\\$1")
    .replace(/~/g, "$\\sim$")
    .replace(/\^/g, "\\textasciicircum{}")
    .replace(/±/g, "$\\pm$")
    .replace(/×/g, "$\\times$")
    .replace(/–/g, "--")
    .replace(/’/g, "'");

/** escape, then turn **bold**, *italic* and [label](url) into LaTeX */
const inline = (s: string) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, "\\textbf{$1}")
    .replace(/\*(.+?)\*/g, "\\textit{$1}");
const tex = (s: string) =>
  s
    .split(/(\[[^\]]+\]\([^)]+\))/g)
    .map((part) => {
      const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      return m ? `\\href{${m[2].replace(/([%#])/g, "\\$1")}}{\\underline{${inline(m[1])}}}` : inline(part);
    })
    .join("");

const href = (url: string, label: string) => `\\href{${url}}{\\underline{${esc(label)}}}`;

const lines: string[] = [];
const out = (s = "") => lines.push(s);

out(String.raw`%-------------------------
% Résumé of Pranay Agarwal. Generated from src/lib/resume.ts by scripts/build-resume.ts.
% Layout: Jake Gutierrez's resume template (https://github.com/jakegut/resume), MIT licence.
% Opens directly in Overleaf: New Project > Upload Project > this .tex file.
%-------------------------
\documentclass[a4paper,10pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\usepackage[T1]{fontenc}
\usepackage{xurl}
\input{glyphtounicode}

\pagestyle{fancy}
\fancyhf{}
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% A4 page, tight margins
\usepackage[a4paper,top=0.45in,bottom=0.4in,left=0.5in,right=0.5in]{geometry}

\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Section formatting
\titleformat{\section}{
  \vspace{-1pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-6pt}]

\pdfgentounicode=1

%-------------------------
% Custom commands
\newcommand{\resumeItem}[1]{\item\fontsize{9.5}{11.6}\selectfont{{#1 \vspace{-2pt}}}}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-6pt}
}

\newcommand{\resumeOneLine}[2]{
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
    \end{tabular*}\vspace{-6pt}
}

\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & #2 \\
    \end{tabular*}\vspace{-6pt}
}

\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-4pt}}

%-------------------------------------------
\begin{document}
`);

out(`\\begin{center}`);
out(`    \\textbf{\\Huge \\scshape ${esc(RESUME.name)}} \\\\ \\vspace{2pt}`);
out(`    \\small ${RESUME.contacts.map((c) => href(c.url, c.label)).join(" $|$ ")}`);
out(`\\end{center}`);
out();

const subheadings = (title: string, entries: typeof RESUME.education | typeof RESUME.experience) => {
  out(`\\section{${title}}`);
  out(`  \\resumeSubHeadingListStart`);
  for (const e of entries) {
    if (e.sub) out(`    \\resumeSubheading{${tex(e.title)}}{${tex(e.right)}}{${tex(e.sub)}}{${tex(e.subRight)}}`);
    else out(`    \\resumeOneLine{${tex(e.title)}}{${tex(e.right)}}`);
    if (e.bullets?.length) {
      out(`      \\resumeItemListStart`);
      for (const b of e.bullets) out(`        \\resumeItem{${tex(b)}}`);
      out(`      \\resumeItemListEnd`);
    }
  }
  out(`  \\resumeSubHeadingListEnd`);
  out();
};

subheadings("Education", RESUME.education);
subheadings("Experience", RESUME.experience);

out(`\\section{Projects}`);
out(`  \\resumeSubHeadingListStart`);
for (const p of RESUME.projects) {
  out(`    \\resumeProjectHeading{\\textbf{${tex(p.name)}} $|$ \\emph{${tex(p.tech)}}}{${href(p.link.url, p.link.label)}}`);
  out(`      \\resumeItemListStart`);
  for (const b of p.bullets) out(`        \\resumeItem{${tex(b)}}`);
  out(`      \\resumeItemListEnd`);
}
out(`  \\resumeSubHeadingListEnd`);
out();

out(`\\section{Research \\& Publications}`);
out(`  \\resumeSubHeadingListStart`);
out(`    \\item \\begin{itemize}[leftmargin=0.15in]`);
for (const p of RESUME.publications) out(`      \\resumeItem{${p.url ? `\\href{${p.url}}{${tex(p.text)}}` : tex(p.text)}}`);
out(`    \\end{itemize}\\vspace{-4pt}`);
out(`  \\resumeSubHeadingListEnd`);
out();

out(`\\section{Technical Skills}`);
out(` \\begin{itemize}[leftmargin=0.15in, label={}]`);
out(`    \\small{\\item{`);
out(RESUME.skills.map((s) => `     \\textbf{${tex(s.label)}}{: ${tex(s.items)}}`).join(" \\\\\n"));
out(`    }}`);
out(` \\end{itemize}`);
out();

out(`\\section{Achievements \\& Certifications}`);
out(`  \\resumeSubHeadingListStart`);
out(`    \\item \\begin{itemize}[leftmargin=0.15in]`);
for (const a of RESUME.achievements) out(`      \\resumeItem{${tex(a)}}`);
out(`    \\end{itemize}\\vspace{-4pt}`);
out(`  \\resumeSubHeadingListEnd`);
out();
out(`\\end{document}`);

mkdirSync("resume/build", { recursive: true });
writeFileSync("resume/pranay-agarwal-resume.tex", lines.join("\n") + "\n");
const run = () =>
  execFileSync("pdflatex", ["-interaction=nonstopmode", "-halt-on-error", "-output-directory=resume/build", "resume/pranay-agarwal-resume.tex"], { stdio: "pipe" });
run();
run(); // second pass settles hyperref
copyFileSync("resume/build/pranay-agarwal-resume.pdf", "public/pranay-agarwal-resume.pdf");
copyFileSync("resume/pranay-agarwal-resume.tex", "public/pranay-agarwal-resume.tex");
console.log("wrote resume/pranay-agarwal-resume.tex and public/pranay-agarwal-resume.pdf");
