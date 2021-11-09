import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/styles.scss';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import theme from '../components/styles/theme';
import { CssBaseline, Container } from '@material-ui/core/';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AdminManageDisplayContentProvider } from '../components/contexts/AdminManageContext'

export const GO_TO_DESIGNATED_PAGE = 'go_to_designated_page'
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
          <CssBaseline />
          <StylesProvider injectFirst>
            <Container>
              <main>
                <AdminManageDisplayContentProvider>
                  <Component {...pageProps} />
                </AdminManageDisplayContentProvider>
              </main>
            </Container>
          </StylesProvider>
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
