// Writes public/sitemap.xml. Runs from the `prebuild` script, so `yarn build`
// (locally and on Vercel) regenerates it before `next build` copies public/.
//
// The sitemap used to be a `/sitemap` page rewritten from /sitemap.xml, but
// that ran `readdirSync("public/gallery/...")` inside a serverless function
// where public/ does not exist, so the gallery URLs had to be left out. At
// build time the whole repo is on disk, so every route can be listed.
//
// Plain Node on purpose: the TSX data files (src/lib/work/code.tsx,
// src/lib/gallery.ts) cannot be imported without a TS loader, so the route
// lists are derived from the same directories those modules read.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE_URL = "https://ben-werner.com/";
const OUTPUT = path.join(ROOT, "public", "sitemap.xml");

const listDirectories = (directory) =>
  readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

// Project slugs come from CODE_PROJECTS in src/lib/work/code.tsx, in
// declaration order. Repository slugs in the same file contain a "/", so
// they are excluded.
const codeProjectSlugs = () => {
  const source = readFileSync(
    path.join(ROOT, "src", "lib", "work", "code.tsx"),
    "utf8",
  );
  const slugs = [...source.matchAll(/^\s*slug: "([^"/]+)",?$/gm)].map(
    ([, slug]) => slug,
  );

  // every asset directory under public/work/code must belong to a project,
  // which also catches the regex silently matching nothing
  const assetDirectories = listDirectories(
    path.join(ROOT, "public", "work", "code"),
  );
  const unknown = assetDirectories.filter((slug) => !slugs.includes(slug));
  if (slugs.length === 0 || unknown.length > 0) {
    throw new Error(
      `public/work/code has directories with no matching CODE_PROJECTS slug: ${unknown.join(", ")}`,
    );
  }

  return slugs;
};

// Mirrors getCollectionItems in src/lib/gallery.ts: every collection is a
// directory under public/gallery and every .jpeg in it is an item.
const galleryCollections = () => {
  const galleryDirectory = path.join(ROOT, "public", "gallery");
  return listDirectories(galleryDirectory).map((slug) => ({
    slug,
    items: readdirSync(path.join(galleryDirectory, slug))
      .filter((fileName) => fileName.endsWith(".jpeg"))
      .map((fileName) => fileName.replace(/\.[^/.]+$/, ""))
      .sort(),
  }));
};

const routes = [
  "",
  "work",
  ...codeProjectSlugs().map((slug) => `work/code/${slug}`),
  "gallery",
  ...galleryCollections().flatMap(({ slug, items }) => [
    `gallery/${slug}`,
    ...items.map((item) => `gallery/${slug}/${item}`),
  ]),
  "contact",
  "3d",
  "privacy",
];

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(
    (route) => `  <url><loc>${escapeXml(BASE_URL + route)}</loc></url>`,
  ),
  "</urlset>",
  "",
].join("\n");

if (!existsSync(path.dirname(OUTPUT))) {
  throw new Error(`${path.dirname(OUTPUT)} does not exist`);
}
writeFileSync(OUTPUT, sitemap);
console.log(`wrote ${path.relative(ROOT, OUTPUT)} with ${routes.length} URLs`);
