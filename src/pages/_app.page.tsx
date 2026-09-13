import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { createCustomTheme } from "../lib/theme";
import "../lib/styles/globals.css";
import createEmotionCache from "../lib/createEmotionCache";
import NavBar from "../components/NavBar";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const DARK_MODE_PATHS = ["/3d"];

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache: EmotionCache }) => {
  const { asPath } = useRouter();

  const isDarkTheme =
    DARK_MODE_PATHS.find((path) => asPath.startsWith(path)) !== undefined;

  const theme = useMemo(
    () => createCustomTheme({ dark: isDarkTheme }),
    [isDarkTheme],
  );

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        {/* `display: contents` so the landmark adds no box: pages that size
            themselves with percentage heights keep resolving against #__next */}
        <Box component="main" sx={{ display: "contents" }}>
          <Component {...pageProps} />
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
