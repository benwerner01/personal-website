import React from "react";
import type { Metadata } from "next";
import ThreeScenes from "../../components/three/ThreeScenes";
import { pageMetadata } from "../../lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "3D — Ben Werner",
  description:
    "Interactive 3D scenes by Ben Werner, rendered in the browser with three.js.",
  path: "/3d",
});

// The dark theme for this route is chosen by path in ThemeRegistry
const ThreeDPage = () => <ThreeScenes />;

export default ThreeDPage;
