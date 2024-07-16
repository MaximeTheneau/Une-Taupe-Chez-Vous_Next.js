/* eslint-disable @next/next/no-css-tags */
import Head from 'next/head';
import { Suspense } from 'react';
import Layout from '../components/layout';
import '../styles/globals.scss';
import CookiesModal from '../components/modal/cookies/Cookies';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_WEBMASTER_ID} />
        <meta name="yandex-verification" content={process.env.NEXT_PUBLIC_YANDEX_WEBMASTER_ID} />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon/apple-icon.png" key="apple" />
        <link rel="icon" href="/favicon/favicon-16x16.png" sizes="16x16" key="icon16" />
        <link rel="icon" href="/favicon/favicon-32x32.png" sizes="32x32" key="icon32" />
        <link rel="icon" href="/favicon/favicon-96x96.png" sizes="96x96" key="icon96" />
        <link rel="manifest" href="/favicon/manifest.json" />
        <link rel="preload" href="/font/principal/principal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/font/title/title.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/print.css" media="print" type="text/css" />
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <CookiesModal />
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Suspense>
    </>
  );
}

export default MyApp;
