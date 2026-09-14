import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getGallery } from "../../lib/gallery";
import {
  formatCollectionTimeRange,
  STATIC_COLLECTIONS,
} from "../../lib/gallery-shared";
import CollectionPreview from "../../components/CollectionPreview";
import { pageMetadata } from "../../lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Gallery — Ben Werner",
  description: `Photography by Ben Werner: ${STATIC_COLLECTIONS.map(
    ({ name }) => name,
  ).join(", ")}.`,
  path: "/gallery",
});

const GalleryPage = () => {
  const gallery = getGallery();

  return (
    <Container>
      {gallery.map((collection) => (
        <Box
          key={collection.name}
          sx={{
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h5">
              <Link href={`/gallery/${collection.slug}`}>
                {collection.name}
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
};

export default GalleryPage;
