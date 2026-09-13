import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { Collection, CollectionImage } from "../lib/gallery";

const IMAGE_HEIGHT = 400;

// Items per row below and at/above the `sm` breakpoint
const ITEMS_PER_ROW_XS = 3;
const ITEMS_PER_ROW_SM = 5;

// The page `Container` (maxWidth "lg") and the m={1} gutter between items
const CONTAINER_MAX_WIDTH = 1200;
const CONTAINER_PADDING_XS = 16;
const CONTAINER_PADDING_SM = 24;
const GUTTER = 16;

const intrinsicWidth = (image: CollectionImage) =>
  (IMAGE_HEIGHT / image.height) * image.width;

type RowShare = {
  // fraction of the row's image width this image takes
  share: number;
  // gutter pixels between the images of the row
  gutters: number;
};

// Each row is a flex row of intrinsic-size images shrunk to fit, so every
// image takes a share of the row width proportional to its intrinsic width
const rowShares = (items: CollectionImage[], perRow: number): RowShare[] =>
  new Array(Math.ceil(items.length / perRow)).fill([]).flatMap((_, i) => {
    const row = items.slice(i * perRow, i * perRow + perRow);
    const total = row.reduce((sum, item) => sum + intrinsicWidth(item), 0);
    return row.map((item) => ({
      share: intrinsicWidth(item) / total,
      gutters: GUTTER * (row.length - 1),
    }));
  });

// The rendered width of a thumbnail for the `sizes` attribute, so the
// browser picks a srcset candidate of the displayed size (times the DPR)
// rather than the 1200px variant for every thumbnail
const thumbnailSizes = (
  image: CollectionImage,
  xs: RowShare,
  sm: RowShare,
  breakpoints: { sm: number; lg: number },
) => {
  const width = intrinsicWidth(image);
  const round = (n: number) => Math.round(n * 1000) / 1000;
  const lgWidth =
    (CONTAINER_MAX_WIDTH - 2 * CONTAINER_PADDING_SM - sm.gutters) * sm.share;

  return [
    `(max-width: ${breakpoints.sm - 0.05}px) min((100vw - ${
      2 * CONTAINER_PADDING_XS + xs.gutters
    }px) * ${round(xs.share)}, ${round(width)}px)`,
    `(max-width: ${breakpoints.lg - 0.05}px) min((100vw - ${
      2 * CONTAINER_PADDING_SM + sm.gutters
    }px) * ${round(sm.share)}, ${round(width)}px)`,
    `${round(Math.min(lgWidth, width))}px`,
  ].join(", ");
};

type CollectionImageComponentProps = {
  image: CollectionImage;
  collectionSlug: string;
  sizes: string;
};

const CollectionImageComponent: React.FC<CollectionImageComponentProps> = ({
  collectionSlug,
  image,
  sizes,
}) => (
  <Box
    m={1}
    sx={{
      // let the row shrink the item below the wrapper's intrinsic width
      minWidth: 0,
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
      {/* `sizes` only applies to the "responsive" layout, so this wrapper
          gives the image the same inline box the "intrinsic" layout had */}
      <Box
        component="span"
        sx={{
          display: "inline-block",
          width: intrinsicWidth(image),
          maxWidth: "100%",
        }}
      >
        <Image
          alt={image.slug}
          src={`/gallery/${collectionSlug}/${image.slug}.jpeg`}
          width={intrinsicWidth(image)}
          height={IMAGE_HEIGHT}
          layout="responsive"
          sizes={sizes}
          blurDataURL={image.blurDataURL}
          placeholder={image.blurDataURL ? "blur" : undefined}
        />
      </Box>
    </Link>
  </Box>
);

const CollectionPreview: React.FC<{ collection: Collection }> = ({
  collection,
}) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const itemsPerRow = sm ? ITEMS_PER_ROW_XS : ITEMS_PER_ROW_SM;

  const xsShares = rowShares(collection.items, ITEMS_PER_ROW_XS);
  const smShares = rowShares(collection.items, ITEMS_PER_ROW_SM);

  return (
    <>
      {new Array(Math.ceil(collection.items.length / itemsPerRow))
        .fill([])
        .map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={i} display="flex" m={-1}>
            {collection.items
              .slice(i * itemsPerRow, i * itemsPerRow + itemsPerRow)
              .map((item, j) => {
                const index = i * itemsPerRow + j;
                return (
                  <CollectionImageComponent
                    key={item.slug}
                    image={item}
                    collectionSlug={collection.slug}
                    sizes={thumbnailSizes(
                      item,
                      xsShares[index],
                      smShares[index],
                      theme.breakpoints.values,
                    )}
                  />
                );
              })}
          </Box>
        ))}
    </>
  );
};

export default CollectionPreview;
