// Server-only gallery helpers (they read `public/gallery` from disk).
//
// Only import this module from `getStaticProps` / `getStaticPaths`. Types and
// helpers that page components need live in `./gallery-shared.ts`.
import { readdirSync, readFileSync } from "fs";
import { imageSize } from "image-size";
import blurdata from "../../public/gallery/blurdata.json";
import { CollectionItem, Gallery, STATIC_COLLECTIONS } from "./gallery-shared";

export const getCollectionItems = (slug: string): CollectionItem[] =>
  readdirSync(`public/gallery/${slug}/`)
    .filter((fileName) => fileName.endsWith(".jpeg"))
    .map((fileName) => {
      const imageURL = `public/gallery/${slug}/${fileName}`;

      const { width, height } = imageSize(readFileSync(imageURL));

      return {
        variant: "image",
        slug: fileName.replace(/\.[^/.]+$/, ""),
        blurDataURL: blurdata[imageURL],
        width,
        height,
      };
    });

export const getGallery = (): Gallery =>
  STATIC_COLLECTIONS.map((collection) => ({
    ...collection,
    items: getCollectionItems(collection.slug),
  }));
