import React from "react";
import type { Viewport } from "next";
import { Manrope } from "next/font/google";
import ThemeRegistry from "../components/ThemeRegistry";
import NavBar from "../components/NavBar";
import "../lib/styles/globals.css";

// Self-hosted variable Manrope (weights 200-800) instead of the render-blocking
// Google Fonts CSS import
const manrope = Manrope({ subsets: ["latin"], display: "swap" });

// There is no root `metadata`: every page sets its own absolute title,
// description, canonical and Open Graph tags (see src/lib/metadata.ts). No
// `metadataBase` either: with one set, Next collapses the root canonical to
// the bare origin (`https://ben-werner.com`), whereas the site's canonical for
// "/" is `https://ben-werner.com/`; every URL in the metadata is absolute
// already, so nothing needs resolving.

// The viewport the Pages Router emitted: `width=device-width` only. Next's App
// Router default would add `initial-scale=1`.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: undefined,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <ThemeRegistry fontFamily={manrope.style.fontFamily}>
        <NavBar />
        {/* `display: contents` so the landmark adds no box: pages that size
            themselves with percentage heights keep resolving against body */}
        <main style={{ display: "contents" }}>{children}</main>
      </ThemeRegistry>
    </body>
  </html>
);

export default RootLayout;
