import type { Metadata } from "next";

export const SITE_URL = "https://ben-werner.com";

/** Route an image through the Next.js image optimizer for link previews. */
export const ogImageUrl = (src: string) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=75`;

type PageMetadataParams = {
  title: string;
  description: string;
  /** Path of the page (starting with "/"), used for the canonical and og:url */
  path: string;
  /** Site-relative path of a preview image, if the page has a natural one */
  image?: string;
};

/**
 * The per-page `<head>` tags: title, description, canonical and Open Graph.
 * Every page passes an absolute title, so no title template applies.
 */
export const pageMetadata = ({
  title,
  description,
  path,
  image,
}: PageMetadataParams): Metadata => {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      ...(image ? { images: [`${SITE_URL}${image}`] } : {}),
    },
  };
};
