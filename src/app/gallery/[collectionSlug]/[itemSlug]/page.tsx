import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Typography, Container, Button, Box } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getGallery, getCollectionItems } from "../../../../lib/gallery";
import { STATIC_COLLECTIONS } from "../../../../lib/gallery-shared";
import { NAV_BAR_HEIGHT } from "../../../../lib/navBar";
import KeyboardNavigation from "../../../../components/gallery/KeyboardNavigation";
import { ogImageUrl, pageMetadata } from "../../../../lib/metadata";

type Params = {
  collectionSlug: string;
  itemSlug: string;
};

type CollectionItemPageProps = {
  params: Promise<Params>;
};

// every item is prerendered; unknown slugs 404 (`fallback: false`)
export const dynamicParams = false;

export const generateStaticParams = (): Params[] =>
  getGallery().flatMap(({ slug, items }) =>
    items.map((item) => ({ collectionSlug: slug, itemSlug: item.slug })),
  );

const getCollectionAndItem = ({ collectionSlug, itemSlug }: Params) => {
  const staticCollection = STATIC_COLLECTIONS.find(
    ({ slug }) => slug === collectionSlug,
  );
  if (!staticCollection) notFound();

  const collection = {
    ...staticCollection,
    items: getCollectionItems(collectionSlug),
  };
  const item = collection.items.find(({ slug }) => slug === itemSlug);
  if (!item) notFound();

  return { collection, item };
};

export const generateMetadata = async ({
  params,
}: CollectionItemPageProps): Promise<Metadata> => {
  const { collection, item } = getCollectionAndItem(await params);

  return pageMetadata({
    title: `${collection.name} — ${item.slug} — Ben Werner`,
    description: `Photo ${item.slug} from ${collection.name} by Ben Werner.`,
    path: `/gallery/${collection.slug}/${item.slug}`,
    image: ogImageUrl(`/gallery/${collection.slug}/${item.slug}.jpeg`),
  });
};

const CollectionItemPage = async ({ params }: CollectionItemPageProps) => {
  const { collection, item } = getCollectionAndItem(await params);

  const itemIndex = collection.items.findIndex(
    ({ slug }) => slug === item.slug,
  );

  const previousItemIndex =
    itemIndex > 0 ? itemIndex - 1 : collection.items.length - 1;
  const nextItemIndex =
    itemIndex < collection.items.length - 1 ? itemIndex + 1 : 0;
  const previousHref = `/gallery/${collection.slug}/${collection.items[previousItemIndex].slug}`;
  const nextHref = `/gallery/${collection.slug}/${collection.items[nextItemIndex].slug}`;

  return (
    <Container
      sx={{
        height: `calc(100% - ${NAV_BAR_HEIGHT}px)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <KeyboardNavigation previousHref={previousHref} nextHref={nextHref} />
      <Typography gutterBottom variant="h5">
        <Link href={`/gallery/${collection.slug}`}>{collection.name}</Link>
        {" > "}
        {item.slug}
      </Typography>
      <Box
        sx={{
          position: "relative",
          flexGrow: 1,
        }}
      >
        <Image
          alt={item.slug}
          src={`/gallery/${collection.slug}/${item.slug}.jpeg`}
          fill
          style={{ objectFit: "contain" }}
          // The photo is the largest contentful paint, so preload it and
          // size it to the Container (maxWidth "lg") rather than 100vw
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          mt: 2,
        }}
      >
        <Link href={previousHref}>
          <Button startIcon={<ChevronLeftIcon />}>Previous</Button>
        </Link>
        <Link href={nextHref}>
          <Button endIcon={<ChevronRightIcon />}>Next</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default CollectionItemPage;
