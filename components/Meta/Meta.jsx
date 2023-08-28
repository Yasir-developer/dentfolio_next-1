import Head from 'next/head';
import doctor from '../../public/images/Dentfolio_favicon.png';

// import { useSelector } from "react-redux";

const Meta = () => {
  // const { setting } = useSelector(state => state.settingReducer)

  return (
    <Head>
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {/* <meta name='keywords' content={setting?.meta_keywords} />
      <meta name='description' content={setting?.meta_description} />
      <meta property="og:title" content={setting?.meta_title} /> */}
      <meta charSet="utf-8" />
      <link rel="icon" href={doctor} />
      {/* <title>{setting?.meta_title}</title> */}
    </Head>
  );
};

export default Meta;
