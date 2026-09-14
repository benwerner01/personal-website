"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createCustomTheme } from "../lib/theme";

const DARK_MODE_PATHS = ["/3d"];

type ThemeRegistryProps = {
  /** The `next/font` family, resolved in the root layout */
  fontFamily: string;
  children: React.ReactNode;
};

// Emotion cache + MUI theme for the App Router. `AppRouterCacheProvider`
// collects the styles of every server render and inserts them into the
// streamed HTML with `useServerInsertedHTML`, so the critical CSS is in the
// SSR HTML (no unstyled first paint). `key: "css"` and `prepend: true` are
// what the Pages Router's `createEmotionCache` used: MUI's styles stay at the
// top of the <head>, where other CSS can override them.
const ThemeRegistry: React.FC<ThemeRegistryProps> = ({
  fontFamily,
  children,
}) => {
  const pathname = usePathname();

  const isDarkTheme =
    DARK_MODE_PATHS.find((path) => pathname.startsWith(path)) !== undefined;

  const theme = useMemo(
    () => createCustomTheme({ dark: isDarkTheme, fontFamily }),
    [isDarkTheme, fontFamily],
  );

  return (
    <AppRouterCacheProvider options={{ key: "css", prepend: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default ThemeRegistry;
