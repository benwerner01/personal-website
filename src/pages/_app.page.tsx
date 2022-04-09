import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../lib/theme";
import "../lib/styles/globals.css";
import NavBar from "../components/NavBar";
import createEmotionCache from "../lib/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// import BackgroundAnimation from '../components/BackgroundAnimation';

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache: EmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Component {...pageProps} />
        {/* <BackgroundAnimation /> */}
      </ThemeProvider>{" "}
    </CacheProvider>
  );
}

export default MyApp;
