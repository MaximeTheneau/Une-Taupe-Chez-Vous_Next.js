import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '../components/layout';
import '../styles/globals.scss';
import { CookiesProvider } from '../context/CookiesContext';

const CookiesModal = dynamic(() => import('../components/modal/cookies/Cookies'), { ssr: false });

const title = Inter({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
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
        <meta name="author" content="Laurent THENEAU" />
        <meta name="geo.region" content="FR-78" />
        <meta name="geo.placename" content="Yvelines" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon/apple-icon.png" key="apple" />
        <link rel="icon" href="/favicon/favicon-16x16.png" sizes="16x16" key="icon16" />
        <link rel="icon" href="/favicon/favicon-32x32.png" sizes="32x32" key="icon32" />
        <link rel="icon" href="/favicon/favicon-96x96.png" sizes="96x96" key="icon96" />
        <link rel="manifest" href="/favicon/manifest.json" />
        <link rel="preload" href="/font/principal/principal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
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
