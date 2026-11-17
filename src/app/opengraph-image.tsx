import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PERSON } from "@/lib/content";

export const alt = "Pranay Agarwal, AI/ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (f: string) => readFile(join(process.cwd(), "src/assets", f));

export default async function Image() {
  const [bold, medium, mono, photo] = await Promise.all([
    asset("fonts/schibsted-grotesk-latin-700-normal.woff"),
    asset("fonts/schibsted-grotesk-latin-500-normal.woff"),
    asset("fonts/fragment-mono-latin-400-normal.woff"),
    asset("pranay-og.jpg"),
  ]);
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const facts = [
    ["2", "AI products live"],
    ["3", "Springer papers"],
    ["22,600", "field images published"],
    ["1", "registered design"],
  ];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#fafaf9", fontFamily: "Schibsted", color: "#1c1917", padding: "64px 72px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 64 }}>
          <div style={{ position: "relative", display: "flex", width: 236, height: 236, marginTop: 30 }}>
            <img src={src} width={236} height={236} alt="" style={{ borderRadius: 4, objectFit: "cover" }} />
            <div style={{ position: "absolute", top: -16, left: -16, width: 268, height: 268, border: "3px solid #1f4bff", borderRadius: 3 }} />
            <div style={{ position: "absolute", top: -54, left: -17, display: "flex", background: "#1f4bff", color: "#fff", fontFamily: "Fragment", fontSize: 22, padding: "4px 12px" }}>
              person 0.99
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3.5, lineHeight: 1 }}>{PERSON.name}</div>
            <div style={{ fontSize: 34, fontWeight: 500, marginTop: 22 }}>{`${PERSON.role} at ${PERSON.company}`}</div>
            <div style={{ fontSize: 26, fontWeight: 500, marginTop: 14, color: "#6f6964", maxWidth: 640, lineHeight: 1.35 }}>
              Computer vision and on-device ML, from field datasets to models that run in a phone&apos;s browser.
            </div>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "auto", borderTop: "2px solid #e7e5e4", paddingTop: 30 }}>
          {facts.map(([n, l], i) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", flex: 1, paddingLeft: i ? 28 : 0, borderLeft: i ? "2px solid #e7e5e4" : "none" }}>
              <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>{n}</div>
              <div style={{ fontSize: 22, fontWeight: 500, color: "#6f6964", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Schibsted", data: bold, weight: 700, style: "normal" },
        { name: "Schibsted", data: medium, weight: 500, style: "normal" },
        { name: "Fragment", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
