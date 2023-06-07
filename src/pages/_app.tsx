import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from '@/contexts/auth-context';
import { useNProgress } from '@/hooks/use-nprogress';
import { createTheme } from '@/theme';
import { createEmotionCache } from '@/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { SessionProvider } from 'next-auth/react';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { session } = pageProps;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Devias Kit
        </title>
        <meta
          name='viewport'
          content='initial-scale=1, width=device-width'
        />
      </Head>
      {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
      {/*  <AuthProvider>*/}
      {/*    <ThemeProvider theme={theme}>*/}
      {/*      <CssBaseline />*/}
      {/*      <AuthConsumer>*/}
      {/*        {*/}
      {/*          (auth) => auth.isLoading*/}
      {/*            ? <SplashScreen />*/}
      {/*            : getLayout(<Component {...pageProps} />)*/}
      {/*        }*/}
      {/*      </AuthConsumer>*/}
      {/*    </ThemeProvider>*/}
      {/*</LocalizationProvider>*/}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SessionProvider session={session}
refetchInterval={10 * 60}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {
              getLayout(<Component {...pageProps} />)
            }
          </ThemeProvider>
        </SessionProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
