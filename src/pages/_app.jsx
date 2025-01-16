/* eslint-disable @next/next/no-css-tags */
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '../components/layout';
import '../styles/globals.scss';
import CookiesModal from '../components/modal/cookies/Cookies';
import { CookiesProvider } from '../context/CookiesContext';

const title = Inter({
  weight: '400',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>
        {`
      :root {
        --font-heading: ${title.style.fontFamily};
      }
    `}
      </style>
      <Head>
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_WEBMASTER_ID} />
        <meta name="yandex-verification" content={process.env.NEXT_PUBLIC_YANDEX_WEBMASTER_ID} />
        <meta name="ahrefs-site-verification" content="80e1e4c68c5760798a0c167d6db84e79e9b343301fd1eb054f1da5fc8529e778" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon/apple-icon.png" key="apple" />
        <link rel="icon" href="/favicon/favicon-16x16.png" sizes="16x16" key="icon16" />
        <link rel="icon" href="/favicon/favicon-32x32.png" sizes="32x32" key="icon32" />
        <link rel="icon" href="/favicon/favicon-96x96.png" sizes="96x96" key="icon96" />
        {/* <link rel="manifest" href="/favicon/manifest.json" /> */}
        <link rel="preload" href="/font/principal/principal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* <link rel="stylesheet" href="/print.css" media="print" type="text/css" /> */}
        <link rel="alternate" type="application/rss+xml" href="https://unetaupechezvous.fr/rss.xml" />
      </Head>
      <CookiesProvider>
        <CookiesModal />
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </>
  );
}

export default MyApp;
