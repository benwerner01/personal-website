"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

import { createCustomTheme } from "../lib/theme";

export const DARK_MODE_PATHS = ["/3d"];

type Props = {
  children: ReactNode;
};

export const MuiWrapper = ({ children }: Props) => {
  const pathname = usePathname();

  const isDarkTheme =
    !!pathname &&
    DARK_MODE_PATHS.find((path) => pathname.startsWith(path)) !== undefined;

  const theme = useMemo(
    () => createCustomTheme({ dark: isDarkTheme }),
    [isDarkTheme]
  );

  return (
    <>
      {/* MUI (but actually underlying Emotion) isn't ready to work with Next's experimental `app/` directory feature.
          I'm using the lowest-code approach suggested by this guy here: https://github.com/emotion-js/emotion/issues/2928#issuecomment-1386197925 */}
      <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
};
