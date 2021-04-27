import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import gallery, { Collection } from '../../../lib/gallery';
import CollectionPreview from '../../../components/CollectionPreview';

type ParsedQueryURL = {
  collectionSlug: string;
}

type CollectionPageProps = {
  collection: Collection;
}

export const getStaticPaths: GetStaticPaths<ParsedQueryURL> = async () => ({
  paths: gallery.map(({ slug }) => ({ params: { collectionSlug: slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<CollectionPageProps, ParsedQueryURL> = async ({
  params,
}) => {
  const { collectionSlug } = params;
  return {
    props: {
      collection: gallery.find(({ slug }) => slug === collectionSlug),
    },
  };
};

const CollectionPage: React.FC<CollectionPageProps> = ({ collection }) => (
  <Container>
    <Typography variant="h1">{collection.name}</Typography>
    <CollectionPreview collection={collection} />
  </Container>
);

export default CollectionPage;
