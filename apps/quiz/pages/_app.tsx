import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/styles.scss';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../components/styles/theme';
import CssBaseline from "@material-ui/core/CssBaseline";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <title>アソビュー オールスター感謝祭2021</title>
      </Head>
      {/* ↓ ThemProviderでどのコンポーネントでもthemeを使えるようにする */}
      <ThemeProvider theme={theme}>
        <div className="app">
          <CssBaseline/>
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
