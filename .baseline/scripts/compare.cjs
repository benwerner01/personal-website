/*
 * Pixel-diff two screenshot directories produced by screenshots.cjs.
 *
 * Usage:
 *   NODE_PATH=<dir with pixelmatch+pngjs installed>/node_modules \
 *     node .baseline/scripts/compare.cjs <baselineDir> <candidateDir> [diffOutDir]
 *
 * Prints a table of mismatched-pixel percentages per screenshot. Any pair whose
 * dimensions differ is reported as such. Diff images are written to diffOutDir.
 */
const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");
const pixelmatchModule = require("pixelmatch");
const pixelmatch = pixelmatchModule.default || pixelmatchModule;

const [, , baselineDir, candidateDir, diffOutDir = "/tmp/screenshot-diffs"] =
  process.argv;
if (!baselineDir || !candidateDir) {
  console.error("usage: compare.cjs <baselineDir> <candidateDir> [diffOutDir]");
  process.exit(2);
}
fs.mkdirSync(diffOutDir, { recursive: true });

const files = fs
  .readdirSync(baselineDir)
  .filter((f) => f.endsWith(".png"))
  .sort();

const rows = [];
for (const file of files) {
  const a = PNG.sync.read(fs.readFileSync(path.join(baselineDir, file)));
  const bPath = path.join(candidateDir, file);
  if (!fs.existsSync(bPath)) {
    rows.push([file, "MISSING in candidate"]);
    continue;
  }
  const b = PNG.sync.read(fs.readFileSync(bPath));
  if (a.width !== b.width || a.height !== b.height) {
    rows.push([file, `SIZE ${a.width}x${a.height} -> ${b.width}x${b.height}`]);
    continue;
  }
  const diff = new PNG({ width: a.width, height: a.height });
  const mismatched = pixelmatch(a.data, b.data, diff.data, a.width, a.height, {
    threshold: 0.1,
  });
  const pct = ((mismatched / (a.width * a.height)) * 100).toFixed(3);
  if (mismatched > 0) {
    fs.writeFileSync(path.join(diffOutDir, file), PNG.sync.write(diff));
  }
  rows.push([file, `${pct}% (${mismatched} px)`]);
}

const w = Math.max(...rows.map(([f]) => f.length));
for (const [f, r] of rows) console.log(f.padEnd(w + 2), r);
