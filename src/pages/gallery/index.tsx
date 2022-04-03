import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  getGallery,
  formatCollectionTimeRange,
  Gallery,
} from "../../lib/gallery";
import CollectionPreview from "../../components/CollectionPreview";

type GalleryPageProps = {
  gallery: Gallery;
};

export const getStaticProps: GetStaticProps<GalleryPageProps> = async () => ({
  props: { gallery: getGallery() },
});

const GalleryPage: React.FC<GalleryPageProps> = ({ gallery }) => (
  <Container>
    {gallery.map((collection) => (
      <Box key={collection.name} mb={4}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5">
            <Link href={`/gallery/${collection.slug}`}>
              <a>{collection.name}</a>
            </Link>
          </Typography>
          <Typography variant="h5">
            {formatCollectionTimeRange(collection)}
          </Typography>
        </Box>
        <CollectionPreview collection={collection} />
      </Box>
    ))}
  </Container>
);

export default GalleryPage;
