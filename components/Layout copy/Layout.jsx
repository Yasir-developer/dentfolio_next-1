// import { server } from "Config";
import Head from 'next/head';
import AppHeader from '../Header/Header';
import Footer from '../Footer/Footer';
import doctor from '../../public/images/Dentfolio_favicon.png';

// import Meta from '../Meta/Meta';
// import Footer from './Footer';
// import styles from './Layout.module.css';
// import Header from './Nav';

const Layout = ({ children }) => {
  // console.log(children, "children");
  return (
    <div>
      {/* <Meta title="Math Scouts" /> */}
      <AppHeader />
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
        {/* <meta
          property="og:image"
          content="https://repository-images.githubusercontent.com/201392697/5d392300-eef3-11e9-8e20-53310193fbfd"
        /> */}
        <link rel="icon" href={doctor} />
      </Head>
      <main>{children}</main>
      {/* <p className='text-center h2'>Website under Construction</p> */}
      <Footer />
    </div>
  );
};

export default Layout;
