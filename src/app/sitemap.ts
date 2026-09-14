import type { MetadataRoute } from "next";
import { CODE_PROJECTS } from "../lib/work/code";
import { getGallery } from "../lib/gallery";
import { SITE_URL } from "../lib/metadata";

// Every route of the site, in the order they are listed in the nav. Generated
// at build time, when public/gallery is on disk (the sitemap used to be a
// prebuild script writing public/sitemap.xml for the same reason).
const sitemap = (): MetadataRoute.Sitemap =>
  [
    "",
    "work",
    ...CODE_PROJECTS.map(({ slug }) => `work/code/${slug}`),
    "gallery",
    ...getGallery().flatMap(({ slug, items }) => [
      `gallery/${slug}`,
      ...items.map((item) => `gallery/${slug}/${item.slug}`).sort(),
    ]),
    "contact",
    "3d",
    "privacy",
  ].map((route) => ({ url: `${SITE_URL}/${route}` }));

export default sitemap;
