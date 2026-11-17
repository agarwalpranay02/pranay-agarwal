import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GlobalCommandMenu, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { DATASETS, PAPERS, PERSON, SITE } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s · ${PERSON.name}` },
  description: SITE.description,
  applicationName: PERSON.name,
  authors: [{ name: PERSON.name, url: SITE.url }],
  keywords: ["Pranay Agarwal", "AI/ML engineer", "computer vision", "TinyML", "edge AI", "deep learning", "BIT Mesra", "Jaipur"],
  alternates: { canonical: "/" },
  openGraph: { type: "profile", url: "/", siteName: PERSON.name, title: SITE.title, description: SITE.description, firstName: "Pranay", lastName: "Agarwal" },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
  width: "device-width",
  initialScale: 1,
};

/** Runs before paint so the saved or system theme applies without a flash. */
const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t;if(t==="dark")document.querySelector('meta[name="theme-color"]')?.setAttribute("content","#0d0d0f")}catch(e){}`;

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON.name,
  jobTitle: PERSON.role,
  worksFor: { "@type": "Organization", name: PERSON.company },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Birla Institute of Technology, Mesra" },
  address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressCountry: "IN" },
  email: `mailto:${PERSON.email}`,
  url: SITE.url,
  image: `${SITE.url}/img/pranay.webp`,
  sameAs: [PERSON.links.linkedin, PERSON.links.scholar, PERSON.links.orcid],
  knowsAbout: ["Computer vision", "Deep learning", "TinyML", "On-device machine learning", "Plant disease detection", "Human activity recognition"],
  subjectOf: [
    ...PAPERS.filter((p) => p.doi).map((p) => ({ "@type": "ScholarlyArticle", headline: p.title, sameAs: `https://doi.org/${p.doi}` })),
    ...DATASETS.map((d) => ({ "@type": "Dataset", name: d.title, sameAs: `https://doi.org/${d.doi}` })),
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </head>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only z-50 rounded-lg bg-[var(--ink)] px-3 py-2 text-[var(--bg)] focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <GlobalCommandMenu />
        {/* Vercel builds only: the analytics endpoint does not exist locally or in CI */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
