import Head from 'next/head';
import Layout from '../components/layout';
import '../styles/globals.scss';
// import CookiesModal from '../components/modal/cookies/Cookies';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="yObJd5noBtjUBky_GRbOOETV42Q9qAHf7w00PPz1-ss" />
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
