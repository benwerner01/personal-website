"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { FunctionComponent } from "react";

import CollectionPreview from "../../components/collection-preview";
import { formatCollectionTimeRange, Gallery } from "../../lib/gallery";

type GalleryPageProps = {
  gallery: Gallery;
};

export const GalleryPageView: FunctionComponent<GalleryPageProps> = ({
  gallery,
}) => (
  <Container>
    {gallery.map((collection) => (
      <Box key={collection.name} mb={4}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5">
            <Link href={`/gallery/${collection.slug}`}>{collection.name}</Link>
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
