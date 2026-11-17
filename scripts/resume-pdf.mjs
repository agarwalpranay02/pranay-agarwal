// Renders /resume to public/pranay-agarwal-resume.pdf with Chromium's print engine.
// Usage: npm run build && npm start, then in another shell: npm run pdf
import { chromium } from "@playwright/test";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await (await browser.newContext({ colorScheme: "light" })).newPage();
await page.goto(`${base}/resume`, { waitUntil: "load" });
await page.emulateMedia({ media: "print" });
await page.pdf({ path: "public/pranay-agarwal-resume.pdf", format: "A4", preferCSSPageSize: true, printBackground: true });
await browser.close();
console.log("wrote public/pranay-agarwal-resume.pdf");
