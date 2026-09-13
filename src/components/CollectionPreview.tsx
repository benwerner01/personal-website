import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import { Collection, CollectionImage } from "../lib/gallery";

const IMAGE_HEIGHT = 400;

// Items per row below and at/above the `sm` breakpoint
const ITEMS_PER_ROW_XS = 3;
const ITEMS_PER_ROW_SM = 5;

type CollectionImageComponentProps = {
  image: CollectionImage;
  collectionSlug: string;
};

const CollectionImageComponent: React.FC<CollectionImageComponentProps> = ({
  collectionSlug,
  image,
}) => {
  const intrinsicWidth = (IMAGE_HEIGHT / image.height) * image.width;

  return (
    <Box
      mt={1}
      mx={1}
      sx={{
        // Grow in proportion to the intrinsic width so every image in a row
        // ends up the same height, but never beyond the intrinsic width
        flex: `${intrinsicWidth} 1 0px`,
        maxWidth: intrinsicWidth,
        "& image": {
          opacity: 1,
          transition: ({ transitions }) => transitions.create("opacity"),
          "&:hover": {
            opacity: 0.75,
          },
        },
      }}
    >
      <Link href={`/gallery/${collectionSlug}/${image.slug}`}>
        <Image
          alt={image.slug}
          quality={100}
          src={`/gallery/${collectionSlug}/${image.slug}.jpeg`}
          width={intrinsicWidth}
          height={IMAGE_HEIGHT}
          blurDataURL={image.blurDataURL}
          placeholder={image.blurDataURL ? "blur" : undefined}
        />
      </Link>
    </Box>
  );
};

// A zero-height flex item that forces a new row at one breakpoint only, so
// the number of images per row is decided by CSS rather than by a media
// query hook (which renders the desktop layout first and then shifts)
const RowBreak: React.FC<{ below?: "sm"; from?: "sm" }> = ({ below, from }) => (
  <Box
    sx={{
      flexBasis: "100%",
      height: 0,
      display: below
        ? { xs: "block", [below]: "none" }
        : { xs: "none", [from]: "block" },
    }}
  />
);

const CollectionPreview: React.FC<{ collection: Collection }> = ({
  collection,
}) => (
  <Box display="flex" flexWrap="wrap" mt={-1} mx={-1}>
    {collection.items.map((item, i) => (
      <React.Fragment key={item.slug}>
        <CollectionImageComponent
          image={item}
          collectionSlug={collection.slug}
        />
        {(i + 1) % ITEMS_PER_ROW_XS === 0 && <RowBreak below="sm" />}
        {(i + 1) % ITEMS_PER_ROW_SM === 0 && <RowBreak from="sm" />}
      </React.Fragment>
    ))}
  </Box>
);

export default CollectionPreview;
