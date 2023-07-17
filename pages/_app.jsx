// import '@/assets/base.css';
import { Layout } from '@/components/Layout';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';
// import '../assets/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      {/* <Layout> */}
      <Component {...pageProps} />
      <Toaster />
      {/* </Layout> */}
    </ThemeProvider>
  );
}
