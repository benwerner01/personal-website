import { Theme, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@mui/styles";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

import { Collection, CollectionImage } from "../lib/gallery";

const IMAGE_HEIGHT = 400;

type CollectionImageComponentProps = {
  image: CollectionImage;
  collectionSlug: string;
};

const useCollectionImageStyles = makeStyles<Theme>((theme) => ({
  image: {
    opacity: 1,
    transition: theme.transitions.create("opacity"),
    "&:hover": {
      opacity: 0.75,
    },
  },
}));

const CollectionImageComponent: React.FC<CollectionImageComponentProps> = ({
  collectionSlug,
  image,
}) => {
  const classes = useCollectionImageStyles();

  return (
    <Box m={1}>
      <Link href={`/gallery/${collectionSlug}/${image.slug}`}>
        <Image
          alt={image.slug}
          quality={100}
          className={classes.image}
          src={`/gallery/${collectionSlug}/${image.slug}.jpeg`}
          width={(IMAGE_HEIGHT / image.height) * image.width}
          height={IMAGE_HEIGHT}
          blurDataURL={image.blurDataURL}
          placeholder={image.blurDataURL ? "blur" : undefined}
        />
      </Link>
    </Box>
  );
};

const CollectionPreview: React.FC<{ collection: Collection }> = ({
  collection,
}) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const itemsPerRow = sm ? 3 : 5;

  return (
    <>
      {new Array(Math.ceil(collection.items.length / itemsPerRow))
        .fill([])
        .map((_, i) => (
           
          <Box key={i} display="flex" m={-1}>
            {collection.items
              .slice(i * itemsPerRow, i * itemsPerRow + itemsPerRow)
              .map((item) => (
                <CollectionImageComponent
                  key={item.slug}
                  image={item}
                  collectionSlug={collection.slug}
                />
              ))}
          </Box>
        ))}
    </>
  );
};

export default CollectionPreview;
