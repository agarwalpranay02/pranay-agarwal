import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { width: 16, height: 16, viewBox: "0 0 24 24", "aria-hidden": true } as const;

export const MailIcon = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" strokeLinejoin="round" />
  </svg>
);
export const LinkedInIcon = (p: P) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);
export const ScholarIcon = (p: P) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M12 3 1.5 9.5 12 16l8.5-5.26V17h2V9.5L12 3Zm-6.5 9.37V16c0 2.5 2.9 4.5 6.5 4.5s6.5-2 6.5-4.5v-3.63L12 16.4l-6.5-4.03Z" />
  </svg>
);
export const OrcidIcon = (p: P) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21ZM8.3 17.2H6.9V7.7h1.4v9.5ZM7.6 6.6a.95.95 0 1 1 0-1.9.95.95 0 0 1 0 1.9Zm3.2 10.6V7.7h3.5c3.3 0 4.8 2.4 4.8 4.75 0 2.6-2 4.75-4.8 4.75h-3.5Zm1.4-1.25h2c2.6 0 3.4-1.9 3.4-3.5 0-2-1.3-3.5-3.4-3.5h-2v7Z" />
  </svg>
);
export const ArrowUpRight = (p: P) => (
  <svg {...base} width={14} height={14} fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const DocIcon = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" strokeLinejoin="round" />
    <path d="M14 3v5h5M9 13h6M9 17h6" strokeLinecap="round" />
  </svg>
);
export const PinIcon = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" strokeLinejoin="round" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
