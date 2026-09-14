import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getCollectionItems } from "../../../lib/gallery";
import {
  Collection,
  formatCollectionTimeRange,
  STATIC_COLLECTIONS,
} from "../../../lib/gallery-shared";
import CollectionPreview from "../../../components/CollectionPreview";
import { ogImageUrl, pageMetadata } from "../../../lib/metadata";

type Params = {
  collectionSlug: string;
};

type CollectionPageProps = {
  params: Promise<Params>;
};

// every collection is prerendered; unknown slugs 404 (`fallback: false`)
export const dynamicParams = false;

export const generateStaticParams = (): Params[] =>
  STATIC_COLLECTIONS.map(({ slug }) => ({ collectionSlug: slug }));

const getCollection = (collectionSlug: string): Collection => {
  const staticCollection = STATIC_COLLECTIONS.find(
    ({ slug }) => slug === collectionSlug,
  );
  if (!staticCollection) notFound();

  return {
    ...staticCollection,
    items: getCollectionItems(collectionSlug),
  };
};

export const generateMetadata = async ({
  params,
}: CollectionPageProps): Promise<Metadata> => {
  const { collectionSlug } = await params;
  const collection = getCollection(collectionSlug);

  return pageMetadata({
    title: `${collection.name} — Ben Werner`,
    description: `Photos from ${collection.name} (${formatCollectionTimeRange(
      collection,
    )}) by Ben Werner.`,
    path: `/gallery/${collection.slug}`,
    image: collection.items[0]
      ? ogImageUrl(
          `/gallery/${collection.slug}/${collection.items[0].slug}.jpeg`,
        )
      : undefined,
  });
};

const CollectionPage = async ({ params }: CollectionPageProps) => {
  const { collectionSlug } = await params;
  const collection = getCollection(collectionSlug);

  return (
    <Container>
      <Typography gutterBottom variant="h1">
        {collection.name}
      </Typography>
      <CollectionPreview collection={collection} />
    </Container>
  );
};

export default CollectionPage;
