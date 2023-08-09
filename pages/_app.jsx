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
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ThemeProvider> */}
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
        {/* </ThemeProvider> */}
      </PersistGate>
    </Provider>
  );
};
export default withReduxStore(MyApp);
