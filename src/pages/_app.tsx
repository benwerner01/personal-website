import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../lib/theme';
import '../lib/styles/globals.css';
import NavBar from '../components/NavBar';
// import BackgroundAnimation from '../components/BackgroundAnimation';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Component {...pageProps} />
      {/* <BackgroundAnimation /> */}
    </ThemeProvider>
  );
}

export default MyApp;
