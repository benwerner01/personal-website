"use client";

import React, { FunctionComponent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/legacy/image";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Collection, CollectionItem } from "../../../../lib/gallery";
import { NAV_BAR_HEIGHT } from "../../../nav-bar";

const useCollectionItemStyles = makeStyles<Theme>(() => ({
  containerRoot: {
    height: `calc(100% - ${NAV_BAR_HEIGHT}px)`,
    display: "flex",
    flexDirection: "column",
  },
  imageWrapper: {
    position: "relative",
  },
}));

export const CollectionItemPageView: FunctionComponent<{
  collection: Collection;
  item: CollectionItem;
}> = ({ collection, item }) => {
  const classes = useCollectionItemStyles();
  const router = useRouter();

  const itemIndex = collection.items.findIndex(
    ({ slug }) => slug === item.slug
  );

  const previousItemIndex =
    itemIndex > 0 ? itemIndex - 1 : collection.items.length - 1;
  const nextItemIndex =
    itemIndex < collection.items.length - 1 ? itemIndex + 1 : 0;
  const previousItem = collection.items[previousItemIndex];
  const nextItem = collection.items[nextItemIndex];

  const onKeyDown = ({ key }: KeyboardEvent) => {
    if (key === "ArrowLeft") {
      router.push(`/gallery/${collection.slug}/${previousItem.slug}`);
    } else if (key === "ArrowRight") {
      router.push(`/gallery/${collection.slug}/${nextItem.slug}`);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <Container classes={{ root: classes.containerRoot }}>
      <Typography gutterBottom variant="h5">
        <Link href={`/gallery/${collection.slug}`}>{collection.name}</Link>
        {" > "}
        {item.slug}
      </Typography>
      <Box className={classes.imageWrapper} flexGrow={1}>
        <Image
          alt={item.slug}
          src={`/gallery/${collection.slug}/${item.slug}.jpeg`}
          layout="fill"
          objectFit="contain"
        />
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2} mt={2}>
        <Link href={`/gallery/${collection.slug}/${previousItem.slug}`}>
          <Button startIcon={<ChevronLeftIcon />}>Previous</Button>
        </Link>
        <Link href={`/gallery/${collection.slug}/${nextItem.slug}`}>
          <Button endIcon={<ChevronRightIcon />}>Next</Button>
        </Link>
      </Box>
    </Container>
  );
};
