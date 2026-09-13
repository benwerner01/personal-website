// Next's default `experimental.optimizePackageImports` list includes
// `@mui/material` / `@mui/icons-material`, which Turbopack implements by
// bundling those packages into the server chunks together with their own copy
// of `@emotion/react`. The `@emotion/react` that `_app` imports for
// `CacheProvider` is externalised instead, so MUI's styled components see a
// different EmotionCacheContext, ignore the cache `_document` extracts
// critical CSS from, and emit inline <style> tags in the body. Bundling the
// Emotion runtime too keeps a single instance. Webpack externalises both MUI
// and Emotion to Node, so it must not get this (it would recreate the same
// split the other way round). `TURBOPACK` is set by Next before this file is
// loaded and is unset under `next build --webpack`.
const emotionTranspilePackages = process.env.TURBOPACK
  ? ["@emotion/react", "@emotion/styled", "@emotion/cache"]
  : [];

module.exports = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.jsx"],
  transpilePackages: emotionTranspilePackages,
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap",
      },
    ];
  },
};
