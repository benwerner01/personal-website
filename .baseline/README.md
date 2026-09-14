# Regression baseline

Re-captured on `main` at dfbddbf (14 Sep 2026) after the modernisation
(Next 16 App Router, React 19, MUI 9, three 0.186) and the CP10 performance
work, so later changes can be diffed against the current site. The original
Next 13 baseline (`main` at 14587ba, 13 Sep 2026) is in git history.

| File | What |
| --- | --- |
| `build-routes.txt` | `next build` route table (Next 16 no longer prints sizes) |
| `build-sizes.txt` | gzip JS per route from a local `next start`, via `scripts/jsbytes.cjs` |
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
  Judge it by eye, or use the seeded deterministic capture described in PR #28
  (constant `Math.random`, stepped `requestAnimationFrame`) for 0 px comparisons.
- `/work` and `/work/code/provviz` autoplay videos; diffs inside the `<video>`
  boxes (0.2–1.5%) are playback frames.
- `/f1/2023` depends on a live third-party API; a throttled request renders the
  empty-season message. Its legend labels can differ by ~0.1% (react-spring timing).
- Gallery thumbnails use native `loading="lazy"`; an unscrolled full-page capture of
  `/gallery` shows blur placeholders below the fold, so compare gallery captures
  taken the same way, or scroll to the bottom before capturing.
- Local vs production screenshots at this capture were identical (0 px) on every
  route except `/3d` and the `/work*` video frames.
