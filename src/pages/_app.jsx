import Head from 'next/head';
import { GoogleAnalytics } from '@next/third-parties/google';
import Layout from '../components/layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_WEBMASTER_ID} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon/apple-icon.png" key="apple" />
        <link rel="icon" href="/favicon/favicon-16x16.png" sizes="16x16" key="icon16" />
        <link rel="icon" href="/favicon/favicon-32x32.png" sizes="32x32" key="icon32" />
        <link rel="icon" href="/favicon/favicon-96x96.png" sizes="96x96" key="icon96" />
      </Head>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      {/* <CookiesModal /> */}
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
