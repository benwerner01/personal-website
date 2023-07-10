"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React, { FunctionComponent } from "react";

import CollectionPreview from "../../../components/collection-preview";
import { Collection } from "../../../lib/gallery";

export const CollectionPageView: FunctionComponent<{
  collection: Collection;
}> = ({ collection }) => (
  <Container>
    <Typography gutterBottom variant="h1">
      {collection.name}
    </Typography>
    <CollectionPreview collection={collection} />
  </Container>
);
