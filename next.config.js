module.exports = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.jsx"],
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap",
      },
    ];
  },
};
