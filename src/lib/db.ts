import "server-only";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { createHash } from "node:crypto";

let client: NeonQueryFunction<false, false> | null = null;
let ready: Promise<void> | null = null;

/** Null when no database is configured (local development without Neon): callers degrade gracefully. */
export function db(): NeonQueryFunction<false, false> | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  client ??= neon(url);
  return client;
}

/** Creates the two small tables on first use; idempotent. */
export function ensureSchema(sql: NeonQueryFunction<false, false>): Promise<void> {
  ready ??= (async () => {
    await sql`CREATE TABLE IF NOT EXISTS messages (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      message TEXT NOT NULL,
      ip_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
    await sql`CREATE INDEX IF NOT EXISTS messages_ip_time ON messages (ip_hash, created_at DESC)`;
    await sql`CREATE TABLE IF NOT EXISTS page_views (slug TEXT PRIMARY KEY, count BIGINT NOT NULL DEFAULT 0)`;
  })().catch((e) => {
    ready = null;
    throw e;
  });
  return ready;
}

/** One-way hash of the client IP so rate limits work without storing addresses. */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || "portfolio";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export function clientIp(req: Request): string {
  return req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
