import { NextPage } from "next";
import React from "react";

import {
  getCollectionItems,
  STATIC_COLLECTIONS,
} from "../../../../lib/gallery";
import { CollectionItemPageView } from "./collection-item-page-view";

const CollectionItemPage: NextPage<{
  params: { collectionSlug: string; itemSlug: string };
}> = ({ params }) => {
  const { collectionSlug, itemSlug } = params;

  const collection = {
    ...STATIC_COLLECTIONS.find(({ slug }) => slug === collectionSlug)!,
    items: getCollectionItems(collectionSlug),
  };

  const item = collection.items.find(({ slug }) => slug === itemSlug)!;

  return <CollectionItemPageView collection={collection} item={item} />;
};

export default CollectionItemPage;
