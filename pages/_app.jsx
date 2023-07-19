// import '@/assets/base.css';
import { Layout } from '@/components/Layout';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tagsinput/react-tagsinput.css';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
// import '../assets/globals.css';

const MyApp = ({ Component, pageProps, reduxStore }) => {
  const persistor = persistStore(reduxStore);

  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
            <Toaster />
          </Layout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
export default withReduxStore(MyApp);
