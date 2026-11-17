import { z } from "zod";
import { clientIp, db, ensureSchema, hashIp } from "@/lib/db";


const Body = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(120),
  email: z.string().trim().email("Please use a valid email address.").max(200),
  company: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(10, "A few more words, please (10 characters or more).").max(4000),
  // honeypot: real people never see or fill this field
  website: z.string().max(0).optional().default(""),
});

const PER_HOUR = 3;

const json = (status: number, body: Record<string, unknown>) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  if (!(req.headers.get("content-type") ?? "").includes("application/json")) return json(415, { error: "Send JSON." });
  const raw = await req.text();
  if (raw.length > 16_000) return json(413, { error: "That message is too long." });

  let parsed;
  try {
    parsed = Body.safeParse(JSON.parse(raw));
  } catch {
    return json(400, { error: "That request could not be read." });
  }
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    // a filled honeypot gets a quiet success so bots learn nothing
    if (first?.path[0] === "website") return json(200, { ok: true });
    return json(400, { error: first?.message ?? "Please check the form.", field: String(first?.path[0] ?? "") });
  }
  const { name, email, company, message } = parsed.data;

  const sql = db();
  if (!sql) return json(503, { error: "The form is offline right now. Please email me directly." });

  try {
    await ensureSchema(sql);
    const ip = hashIp(clientIp(req));
    const recent = (await sql`SELECT count(*)::int AS n FROM messages WHERE ip_hash = ${ip} AND created_at > now() - interval '1 hour'`) as { n: number }[];
    if ((recent[0]?.n ?? 0) >= PER_HOUR) return json(429, { error: "You have sent a few messages already. Please try again in an hour, or email me." });
    await sql`INSERT INTO messages (name, email, company, message, ip_hash) VALUES (${name}, ${email}, ${company || null}, ${message}, ${ip})`;
  } catch (e) {
    console.error("contact: database error", e);
    return json(500, { error: "Something went wrong on my side. Please email me directly." });
  }

  // Optional email notification; the message is already saved either way.
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (key && to) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject: `Portfolio message from ${name}${company ? ` (${company})` : ""}`,
          text: `${message}\n\n— ${name} <${email}>${company ? `\n${company}` : ""}`,
        }),
        signal: AbortSignal.timeout(5000),
      });
      if (!r.ok) console.error("contact: email notification failed", r.status, await r.text());
    } catch (e) {
      console.error("contact: email notification failed", e);
    }
  }
  return json(200, { ok: true });
}
