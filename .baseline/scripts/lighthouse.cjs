/*
 * Run Lighthouse (mobile + desktop presets) against a set of routes and write a
 * compact JSON summary of category scores and Core Web Vitals.
 *
 * Usage:
 *   NODE_PATH=<dir with lighthouse installed>/node_modules \
 *     node .baseline/scripts/lighthouse.cjs <baseUrl> <outFile>
 */
const fs = require("fs");
const lighthouse = require("lighthouse").default;
const { launch } = require("chrome-launcher");
const desktopConfig = require("lighthouse/core/config/desktop-config.js").default;

const [, , baseUrl = "https://ben-werner.com", outFile = ".baseline/lighthouse.json"] =
  process.argv;

const ROUTES = ["/", "/work", "/gallery", "/3d"];
const RUNS = 3;

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

(async () => {
  const chrome = await launch({ chromeFlags: ["--headless=new", "--no-sandbox"] });
  const summary = { baseUrl, date: new Date().toISOString(), runs: RUNS, results: {} };
  for (const route of ROUTES) {
    for (const preset of ["mobile", "desktop"]) {
      const samples = [];
      for (let i = 0; i < RUNS; i += 1) {
        const { lhr } = await lighthouse(
          baseUrl + route,
          { port: chrome.port, output: "json", logLevel: "error" },
          preset === "desktop" ? desktopConfig : undefined
        );
        const a = lhr.audits;
        samples.push({
          performance: Math.round(lhr.categories.performance.score * 100),
          accessibility: Math.round(lhr.categories.accessibility.score * 100),
          bestPractices: Math.round(lhr.categories["best-practices"].score * 100),
          seo: Math.round(lhr.categories.seo.score * 100),
          lcpMs: Math.round(a["largest-contentful-paint"].numericValue),
          cls: Number(a["cumulative-layout-shift"].numericValue.toFixed(3)),
          tbtMs: Math.round(a["total-blocking-time"].numericValue),
          fcpMs: Math.round(a["first-contentful-paint"].numericValue),
          speedIndexMs: Math.round(a["speed-index"].numericValue),
          totalByteWeightKb: Math.round(a["total-byte-weight"].numericValue / 1024),
        });
      }
      const agg = {};
      for (const k of Object.keys(samples[0])) agg[k] = median(samples.map((s) => s[k]));
      summary.results[`${route} [${preset}]`] = agg;
      console.log(route, preset, JSON.stringify(agg));
    }
  }
  await chrome.kill();
  fs.writeFileSync(outFile, `${JSON.stringify(summary, null, 2)}\n`);
})();
