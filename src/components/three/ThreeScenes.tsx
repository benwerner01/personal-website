"use client";

import React from "react";
import dynamic from "next/dynamic";
import { NAV_BAR_HEIGHT } from "../../lib/navBar";

// A box the size of the first scene's canvas, so the page has its height
// before the three.js chunks arrive (no layout shift). Deliberately not
// derived from `./scenes`: importing it here would pull three.js into the
// server render and the initial chunk that the dynamic import below avoids.
const scenesPlaceholder = () => (
  <div style={{ height: `calc(100vh - ${NAV_BAR_HEIGHT}px)` }} />
);

// The WebGL scenes only render in the browser: the three.js stack is neither
// server-rendered nor part of the page's initial chunks.
const ScenesCanvas = dynamic(() => import("./ScenesCanvas"), {
  ssr: false,
  loading: scenesPlaceholder,
});

const ThreeScenes: React.FC = () => <ScenesCanvas />;

export default ThreeScenes;
