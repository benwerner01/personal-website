"use client";

import React, { FunctionComponent } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Collection } from "../../../lib/gallery";
import CollectionPreview from "../../../components/CollectionPreview";

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
