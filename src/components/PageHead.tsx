import React from "react";
import Head from "next/head";

export const SITE_URL = "https://ben-werner.com";

/** Route an image through the Next.js image optimizer for link previews. */
export const ogImageUrl = (src: string) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=75`;

type PageHeadProps = {
  title: string;
  description: string;
  /** Path of the page (starting with "/"), used for the canonical and og:url */
  path: string;
  /** Site-relative path of a preview image, if the page has a natural one */
  image?: string;
};

const PageHead: React.FC<PageHeadProps> = ({
  title,
  description,
  path,
  image,
}) => {
  const url = `${SITE_URL}${path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={`${SITE_URL}${image}`} />}
    </Head>
  );
};

export default PageHead;
