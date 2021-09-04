import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/styles.scss';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../components/styles/theme';
import CssBaseline from "@material-ui/core/CssBaseline";
import { useEffect } from 'react';
import PropTypes from 'prop-types';

function CustomApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);
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

CustomApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
