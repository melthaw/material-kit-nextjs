import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ClientOnly } from '@/pages/_app/ClientOnly';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const queryClient = new QueryClient({
  //disable auto refetch & retry , handle it manually in the component
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retryOnMount: false,
      retry: false
    },
    mutations: {}
  }
});

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
      <SessionProvider session={session}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <QueryClientProvider client={queryClient}>
            <ClientOnly>
              <AuthProvider>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <AuthConsumer>
                    {
                      (auth) => auth.isLoading
                        ? <SplashScreen />
                        : getLayout(<Component {...pageProps} />)
                    }
                  </AuthConsumer>
                </ThemeProvider>
              </AuthProvider>
            </ClientOnly>
          </QueryClientProvider>
        </LocalizationProvider>
      </SessionProvider>
    </CacheProvider>
  );
};

export default App;
