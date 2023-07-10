import { NextPage } from "next";
import React from "react";

import { getCollectionItems, STATIC_COLLECTIONS } from "../../../lib/gallery";
import { CollectionPageView } from "./collection-page-view";

const CollectionPage: NextPage<{ params: { collectionSlug: string } }> = ({
  params,
}) => {
  const { collectionSlug } = params;

  const collection = {
    ...STATIC_COLLECTIONS.find(({ slug }) => slug === collectionSlug)!,
    items: getCollectionItems(collectionSlug),
  };

  return <CollectionPageView collection={collection} />;
};

export default CollectionPage;
