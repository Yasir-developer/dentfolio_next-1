// import { server } from "Config";
import Head from "next/head";
import AppHeader from "../Header/Header";
import Footer from "../Footer/Footer";
// import Meta from '../Meta/Meta';
// import Footer from './Footer';
// import styles from './Layout.module.css';
// import Header from './Nav';

const Layout = ({ children }) => {
  console.log(children, "children");
  return (
    <div>
      {/* <Meta title="Math Scouts" /> */}
      <AppHeader />
      <main>{children}</main>
      {/* <p className='text-center h2'>Website under Construction</p> */}
      <Footer />
    </div>
  );
};

export default Layout;
