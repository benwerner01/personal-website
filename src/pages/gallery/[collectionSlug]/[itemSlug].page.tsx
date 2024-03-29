import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/legacy/image";
import { Typography, Container, Button, Box } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  getGallery,
  Collection,
  CollectionItem,
  STATIC_COLLECTIONS,
  getCollectionItems,
} from "../../../lib/gallery";
import { NAV_BAR_HEIGHT } from "../../../components/NavBar";

type ParsedQueryURL = {
  collectionSlug: string;
  itemSlug: string;
};

type CollectionItemPageProps = {
  collection: Collection;
  item: CollectionItem;
};

export const getStaticPaths: GetStaticPaths<ParsedQueryURL> = async () => ({
  paths: getGallery()
    .map(({ slug, items }) =>
      items.map((item) => ({
        params: {
          collectionSlug: slug,
          itemSlug: item.slug,
        },
      }))
    )
    .flat(),
  fallback: false,
});

export const getStaticProps: GetStaticProps<
  CollectionItemPageProps,
  ParsedQueryURL
> = async ({ params }) => {
  const { collectionSlug, itemSlug } = params;

  const collection = {
    ...STATIC_COLLECTIONS.find(({ slug }) => slug === collectionSlug),
    items: getCollectionItems(collectionSlug),
  };

  return {
    props: {
      collection,
      item: collection.items.find((item) => item.slug === itemSlug),
    },
  };
};

const CollectionItemPage: React.FC<CollectionItemPageProps> = ({
  collection,
  item,
}) => {
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

  useEffect(() => {
    const onKeyDown = ({ key }: KeyboardEvent) => {
      if (key === "ArrowLeft") {
        router.push(`/gallery/${collection.slug}/${previousItem.slug}`);
      } else if (key === "ArrowRight") {
        router.push(`/gallery/${collection.slug}/${nextItem.slug}`);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [router, collection.slug, previousItem.slug, nextItem.slug]);

  return (
    <Container
      sx={{
        height: `calc(100% - ${NAV_BAR_HEIGHT}px)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography gutterBottom variant="h5">
        <Link href={`/gallery/${collection.slug}`}>{collection.name}</Link>
        {" > "}
        {item.slug}
      </Typography>
      <Box position="relative" flexGrow={1}>
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

export default CollectionItemPage;
