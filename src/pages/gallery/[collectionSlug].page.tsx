import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getCollectionItems } from "../../lib/gallery";
import {
  Collection,
  formatCollectionTimeRange,
  STATIC_COLLECTIONS,
} from "../../lib/gallery-shared";
import CollectionPreview from "../../components/CollectionPreview";
import PageHead, { ogImageUrl } from "../../components/PageHead";

type ParsedQueryURL = {
  collectionSlug: string;
};

type CollectionPageProps = {
  collection: Collection;
};

export const getStaticPaths: GetStaticPaths<ParsedQueryURL> = async () => ({
  paths: STATIC_COLLECTIONS.map(({ slug }) => ({
    params: { collectionSlug: slug },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<
  CollectionPageProps,
  ParsedQueryURL
> = async ({ params }) => {
  const { collectionSlug } = params;
  return {
    props: {
      collection: {
        ...STATIC_COLLECTIONS.find(({ slug }) => slug === collectionSlug),
        items: getCollectionItems(collectionSlug),
      },
    },
  };
};

const CollectionPage: React.FC<CollectionPageProps> = ({ collection }) => (
  <Container>
    <PageHead
      title={`${collection.name} — Ben Werner`}
      description={`Photos from ${collection.name} (${formatCollectionTimeRange(
        collection,
      )}) by Ben Werner.`}
      path={`/gallery/${collection.slug}`}
      image={
        collection.items[0]
          ? ogImageUrl(
              `/gallery/${collection.slug}/${collection.items[0].slug}.jpeg`,
            )
          : undefined
      }
    />
    <Typography gutterBottom variant="h1">
      {collection.name}
    </Typography>
    <CollectionPreview collection={collection} />
  </Container>
);

export default CollectionPage;
