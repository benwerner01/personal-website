/*
 * Full-page screenshots of every route at desktop (1440) and mobile (375) widths.
 *
 * Usage:
 *   NODE_PATH=<dir with playwright installed>/node_modules \
 *     node .baseline/scripts/screenshots.cjs <baseUrl> <outDir>
 *
 * e.g. node .baseline/scripts/screenshots.cjs http://localhost:3000 .baseline/screenshots/local
 *
 * Also records /sitemap.xml as text and the HTTP status of every route.
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const [, , baseUrl = "http://localhost:3000", outDir = ".baseline/screenshots/local"] =
  process.argv;

const routes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "routes.json"), "utf8")
);

const WIDTHS = { desktop: 1440, mobile: 375 };

const slug = (route) => (route === "/" ? "index" : route.replace(/^\//, "").replace(/\//g, "__"));

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const statuses = {};
  const consoleErrors = {};

  for (const [name, width] of Object.entries(WIDTHS)) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    for (const route of routes) {
      const page = await context.newPage();
      const errors = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
      const response = await page.goto(baseUrl + route, {
        waitUntil: "networkidle",
        timeout: 60000,
      });
      statuses[`${name} ${route}`] = response ? response.status() : "no response";
      // Let JS-driven animations (react-spring, three.js) settle.
      await page.waitForTimeout(2000);
      await page.screenshot({
        path: path.join(outDir, `${slug(route)}.${name}.png`),
        fullPage: true,
        animations: "disabled",
      });
      if (errors.length) consoleErrors[`${name} ${route}`] = errors;
      await page.close();
    }
    await context.close();
  }

  const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
  fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);

  fs.writeFileSync(
    path.join(outDir, "statuses.json"),
    JSON.stringify({ baseUrl, statuses, consoleErrors }, null, 2)
  );
  await browser.close();

  const bad = Object.entries(statuses).filter(([, s]) => s !== 200);
  console.log(JSON.stringify({ statuses, consoleErrors }, null, 2));
  if (bad.length) {
    console.error("NON-200 ROUTES:", bad);
    process.exit(1);
  }
})();
