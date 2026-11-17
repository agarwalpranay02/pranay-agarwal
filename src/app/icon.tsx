import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const bold = await readFile(join(process.cwd(), "src/assets/fonts/schibsted-grotesk-latin-700-normal.woff"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1c1917", color: "#fafaf9", borderRadius: 14, fontFamily: "Schibsted", fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
        PA
      </div>
    ),
    { ...size, fonts: [{ name: "Schibsted", data: bold, weight: 700, style: "normal" }] },
  );
}
