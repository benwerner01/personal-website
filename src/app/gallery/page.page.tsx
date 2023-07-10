import { NextPage } from "next";
import React from "react";

import { getGallery } from "../../lib/gallery";
import { GalleryPageView } from "./gallery-page-view";

const GalleryPage: NextPage = () => {
  const gallery = getGallery();

  return <GalleryPageView gallery={gallery} />;
};

export default GalleryPage;
