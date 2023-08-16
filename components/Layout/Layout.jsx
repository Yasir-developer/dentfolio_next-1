import Head from 'next/head';
// import Footer from './Footer';
import styles from './Layout.module.css';
import Nav from './Nav';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const path = router.pathname;
    if (path) {
      console.log(path, 'path');
      if (user && user.role == 0) {
        console.log(path.split('/')[1], 'splitted path');
        switch (path.split('/')[1]) {
          case 'admin':
            // case "student":
            toast.error('Unauthorized path');
            router.back();
            break;
        }
      }
      if (user && user.role == 1) {
        console.log(path.split('/')[1], 'splitted path');
        switch (path.split('/')[1]) {
          case 'dentist':
            toast.error('Unauthorized path');
            router.back();
            break;
        }
      }

      // if (user && user.type == "3") {
      //   console.log(path.split("/")[1], "splitted path");
      //   switch (path.split("/")[1]) {
      //     case "admin":
      //     case "teacher":
      //       toast.error("Unauthorized path");
      //       router.back();
      //       break;
      //   }
      // }
    }

    return () => {};
  }, [router, user]);

  return (
    <>
      <Head>
        <title>Dentfolio</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps."
        />
        <meta property="og:title" content="Dentfolio" />
        <meta
          property="og:description"
          content="nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps."
        />
        <meta
          property="og:image"
          content="https://repository-images.githubusercontent.com/201392697/5d392300-eef3-11e9-8e20-53310193fbfd"
        />
      </Head>
      <Nav />
      <main>{children}</main>
      <Footer />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
