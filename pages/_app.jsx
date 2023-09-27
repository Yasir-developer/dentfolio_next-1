// import '@/assets/base.css';
import { Layout } from '@/components/Layout';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tagsinput/react-tagsinput.css';
import '../styles/nprogress.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import withReduxStore from '../lib/with-redux-store';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import Script from 'next/script';

import { useRouter } from 'next/router';
import { useCurrentUser } from '@/lib/user';
import Head from 'next/head';

// import '../assets/globals.css';

const MyApp = ({ Component, pageProps, reduxStore }) => {
  const persistor = persistStore(reduxStore);

  const router = useRouter();

  NProgress.configure({
    minimum: 0.3,
    easing: 'ease',
    speed: 500,
    showSpinner: false,
  });

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start());
    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () => NProgress.done());
  }, []);
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-VBN79YJDXV');
  }, []);

  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ThemeProvider> */}
        <Layout>
          <Component {...pageProps} />
          <Toaster />
          <Head>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-VBN79YJDXV"
            ></script>
            <Script>
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-VBN79YJDXV')`}
            </Script>
            {/* <Script id="google-analytics">
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());


              gtag('config', 'G-0BTT5R168E');
            `}
            </Script> */}
          </Head>
        </Layout>
        {/* </ThemeProvider> */}
      </PersistGate>
    </Provider>
  );
};
export default withReduxStore(MyApp);
