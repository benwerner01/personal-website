import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Collection,
  getCollectionItems,
  STATIC_COLLECTIONS,
} from "../../lib/gallery";
import CollectionPreview from "../../components/CollectionPreview";

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
    <Typography gutterBottom variant="h1">
      {collection.name}
    </Typography>
    <CollectionPreview collection={collection} />
  </Container>
);

export default CollectionPage;
