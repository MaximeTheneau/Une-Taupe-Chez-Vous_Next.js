import Head from 'next/head';
import Layout from '../components/layout';
import '../styles/globals.scss';
import CookiesModal from '../components/modal/cookies/Cookies';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_WEBMASTER_ID} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      {/* <CookiesModal /> */}
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
