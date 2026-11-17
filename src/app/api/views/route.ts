import { db, ensureSchema } from "@/lib/db";


const SLUG = "site";
const headers = { "Cache-Control": "no-store" };

async function count(increment: boolean) {
  const sql = db();
  if (!sql) return Response.json({ views: null }, { headers });
  try {
    await ensureSchema(sql);
    const rows = (increment
      ? await sql`INSERT INTO page_views (slug, count) VALUES (${SLUG}, 1)
                  ON CONFLICT (slug) DO UPDATE SET count = page_views.count + 1 RETURNING count`
      : await sql`SELECT count FROM page_views WHERE slug = ${SLUG}`) as { count: string | number }[];
    return Response.json({ views: Number(rows[0]?.count ?? 0) }, { headers });
  } catch (e) {
    console.error("views: database error", e);
    return Response.json({ views: null }, { status: 500, headers });
  }
}

export const dynamic = "force-dynamic";
export const GET = () => count(false);
export const POST = () => count(true);
