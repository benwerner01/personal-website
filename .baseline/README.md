# Regression baseline

Captured on `main` at 14587ba (13 Sep 2026) before any dependency changes, so
later upgrades can be diffed against it mechanically.

| File | What |
| --- | --- |
| `build-routes.txt` | `next build` route table and First Load JS sizes |
| `screenshots/local/` | full-page screenshots of every route at 1440px and 375px, from `next build && next start` |
| `screenshots/production/` | the same routes captured from https://ben-werner.com |
| `lighthouse.production.json` | Lighthouse medians of 3 runs (mobile + desktop) for `/`, `/work`, `/gallery`, `/3d` on production |
| `scripts/` | the scripts that produced the above |

The scripts deliberately have no entry in `package.json`, so the baseline tooling
adds no dependencies to the site. Install them anywhere and point `NODE_PATH` at
that `node_modules`:

```sh
mkdir -p /tmp/baseline-tools && cd /tmp/baseline-tools
npm init -y && npm i playwright@1 lighthouse pixelmatch pngjs
npx playwright install chromium
export NODE_PATH=/tmp/baseline-tools/node_modules
export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"  # for Lighthouse
```

Then, from the repo root:

```sh
# screenshots + status codes + sitemap for every route in scripts/routes.json
node .baseline/scripts/screenshots.cjs http://localhost:3000 /tmp/shots/local
node .baseline/scripts/screenshots.cjs https://<preview>.vercel.app /tmp/shots/preview

# pixel diff against the baseline (writes diff images to the third arg)
node .baseline/scripts/compare.cjs .baseline/screenshots/local /tmp/shots/local /tmp/shots/diff

# Lighthouse medians
node .baseline/scripts/lighthouse.cjs https://ben-werner.com /tmp/lighthouse.json
```

Known noise:

- `/3d` is an animated WebGL scene, so its screenshots never match pixel-for-pixel.
  Judge it by eye (scene present, bloom present, nav rendered) rather than by percentage.
- `/f1/2023` depends on a live third-party API; a rate-limited request renders an empty chart.
- Local vs production screenshots on `main` were otherwise identical (0 px) except a
  0.4% diff on `/work/code/provviz` mobile, which is a video poster frame.
