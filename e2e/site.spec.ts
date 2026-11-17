import { expect, test, type Page } from "@playwright/test";

const PAGES = ["/", "/work", "/resume"];

/** Collects console errors, ignoring the analytics script that only exists on Vercel. */
function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error" && !m.text().includes("_vercel")) errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(e.message));
  return errors;
}

for (const path of PAGES) {
  test(`${path} loads cleanly, without sideways scroll`, async ({ page }) => {
    const errors = watchErrors(page);
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test("home page shows the essentials", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Pranay Agarwal" })).toBeVisible();
  for (const id of ["products", "experience", "stack", "research", "recognition", "education", "contact"]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.getByRole("link", { name: /LeafCheckup/ }).first()).toBeAttached();
  await expect(page.getByRole("link", { name: /TinyMotion/ }).first()).toBeAttached();
  // no GitHub links, by request
  expect(await page.locator('a[href*="github.com"]').count()).toBe(0);
});

test("every image has loaded and has alt text", async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path);
    // load every lazy image now, then wait until each has decoded (or failed)
    await page.locator("img").evaluateAll((imgs) =>
      Promise.all(imgs.map((i) => { (i as HTMLImageElement).loading = "eager"; return (i as HTMLImageElement).decode().catch(() => {}); })),
    );
    const broken = await page.locator("img").evaluateAll((imgs) =>
      imgs.filter((i) => !(i as HTMLImageElement).complete || (i as HTMLImageElement).naturalWidth === 0 || !i.hasAttribute("alt")).map((i) => (i as HTMLImageElement).src),
    );
    expect(broken, path).toEqual([]);
  }
});

test("internal links resolve", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const path of PAGES) {
    await page.goto(path);
    const hrefs = await page.locator("a[href^='/']").evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
    for (const h of hrefs) seen.add(h.split("#")[0] || "/");
  }
  for (const h of seen) {
    const r = await request.get(h);
    expect(r.status(), h).toBe(200);
  }
});

test("command menu opens with the keyboard and navigates", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard shortcut is a desktop feature");
  await page.goto("/");
  await page.waitForLoadState("networkidle"); // the shortcut listener attaches after hydration
  const dialog = page.getByRole("dialog");
  await expect(async () => {
    await page.keyboard.press("Control+k");
    await expect(dialog).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 10_000 });
  await page.keyboard.type("work");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work/);
});

test("theme toggle switches and persists", async ({ page }) => {
  await page.goto("/");
  const before = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("button", { name: /theme/i }).click();
  const after = await page.locator("html").getAttribute("data-theme");
  expect(after).not.toBe(before);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", after!);
});

test("résumé PDF is downloadable", async ({ request }) => {
  const r = await request.get("/pranay-agarwal-resume.pdf");
  expect(r.status()).toBe(200);
  expect(r.headers()["content-type"]).toContain("pdf");
});

test("unknown pages return the 404 page", async ({ page }) => {
  const res = await page.goto("/does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "This page does not exist" })).toBeVisible();
});

test("contact API validates input", async ({ request }) => {
  const bad = await request.post("/api/contact", { data: { name: "", email: "not-an-email", message: "" } });
  expect(bad.status()).toBe(400);
  const bot = await request.post("/api/contact", { data: { name: "A", email: "a@b.co", message: "hello there", website: "spam" } });
  expect(bot.status()).toBe(200);
});

test("security headers are set", async ({ request }) => {
  const r = await request.get("/");
  const h = r.headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["x-powered-by"]).toBeUndefined();
});
