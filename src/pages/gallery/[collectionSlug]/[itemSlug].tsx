import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
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

const useCollectionItemStyles = makeStyles(() => ({
  containerRoot: {
    height: `calc(100% - ${NAV_BAR_HEIGHT}px)`,
    display: "flex",
    flexDirection: "column",
  },
  imageWrapper: {
    position: "relative",
  },
}));

const CollectionItemPage: React.FC<CollectionItemPageProps> = ({
  collection,
  item,
}) => {
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
        <Link href={`/gallery/${collection.slug}`}>
          <a>{collection.name}</a>
        </Link>
        {" > "}
        {item.slug}
      </Typography>
      <Box className={classes.imageWrapper} flexGrow={1}>
        <Image
          src={`/gallery/${collection.slug}/${item.slug}.jpeg`}
          layout="fill"
          objectFit="contain"
        />
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2} mt={2}>
        <Link href={`/gallery/${collection.slug}/${previousItem.slug}`}>
          <a>
            <Button startIcon={<ChevronLeftIcon />}>Previous</Button>
          </a>
        </Link>
        <Link href={`/gallery/${collection.slug}/${nextItem.slug}`}>
          <a>
            <Button endIcon={<ChevronRightIcon />}>Next</Button>
          </a>
        </Link>
      </Box>
    </Container>
  );
};

export default CollectionItemPage;
