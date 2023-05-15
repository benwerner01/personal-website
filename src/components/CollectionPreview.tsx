import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { Collection, CollectionImage } from "../lib/gallery";

const IMAGE_HEIGHT = 400;

type CollectionImageComponentProps = {
  image: CollectionImage;
  collectionSlug: string;
};

const CollectionImageComponent: React.FC<CollectionImageComponentProps> = ({
  collectionSlug,
  image,
}) => (
  <Box
    m={1}
    sx={{
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
        width={(IMAGE_HEIGHT / image.height) * image.width}
        height={IMAGE_HEIGHT}
        blurDataURL={image.blurDataURL}
        placeholder={image.blurDataURL ? "blur" : undefined}
      />
    </Link>
  </Box>
);

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
          // eslint-disable-next-line react/no-array-index-key
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
