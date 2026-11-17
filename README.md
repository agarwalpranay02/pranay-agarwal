# Pranay Agarwal — portfolio

Personal site of Pranay Agarwal, AI/ML engineer: two shipped AI products, Springer publications, public datasets and a registered design, on three pages.

| Page | What's there |
|---|---|
| `/` | Profile, products, experience, tech stack, research, recognition, education, contact form |
| `/work` | Case studies of LeafCheckup and TinyMotion: problem, pipeline, decisions, measured results |
| `/resume` | One-page A4 résumé, printable, with a PDF download |

## Stack

- **Framework:** Next.js 16 (App Router, statically generated pages), React 19, TypeScript, Tailwind CSS 4
- **Data:** Neon serverless Postgres over HTTP for contact messages and the visit counter; Zod validation
- **Features:** ⌘K command menu, light and dark themes with no flash, Open Graph image and icons generated with `next/og`, JSON-LD for search engines, print stylesheet
- **Security:** Content-Security-Policy, HSTS, `frame-ancestors 'none'`, Permissions-Policy; contact form with a honeypot, size caps and per-IP rate limits (IPs are stored only as salted hashes)
- **Quality:** Playwright tests on desktop and phone (page health, overflow, images, links, keyboard menu, theme, API validation, headers); CodeQL, gitleaks, npm audit and Dependabot
- **Hosting:** Vercel, with Vercel Web Analytics (no cookies)

All content lives in [`src/lib/content.ts`](src/lib/content.ts), so updating the site means editing one file.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional; the site runs without a database
npm run dev                  # http://localhost:3000
```

Tests: `npm run build && npm start`, then `npm run test:e2e` in another shell.
Résumé PDF: with the production server running, `npm run pdf` writes `public/pranay-agarwal-resume.pdf`.

## Licence

Copyright © 2026 Pranay Agarwal. All rights reserved; see [LICENSE](LICENSE).
