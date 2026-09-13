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

// Left to Node, the server render of /3d loads @react-three/fiber's CommonJS
// build, which `require("three")`s three's CommonJS build – deprecated since
// r16x (a build-time THREE_CJS_DEPRECATED warning) and slated for removal.
// Bundling the three.js stack into the server chunks makes Turbopack resolve
// it as ESM instead (the webpack fallback still picks the CommonJS build).
const threeTranspilePackages = [
  "three",
  "three-stdlib",
  "@react-three/fiber",
  "@react-three/drei",
];

module.exports = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  transpilePackages: [...emotionTranspilePackages, ...threeTranspilePackages],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
