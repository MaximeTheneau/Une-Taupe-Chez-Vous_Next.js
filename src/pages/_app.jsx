import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import '../styles/globals.scss';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [animateTransition, setAnimateTransition] = useState(false);
  useEffect(() => {
    setAnimateTransition(true);
    setTimeout(() => {
      setAnimateTransition(false);
    }, 500);
  }, [router.pathname]);

  return (
    <>
      <Head />
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=UA-208648445-2" />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-208648445-2', {
                page_path: window.location.pathname,
              });
            `,
        }}
      />
      <Layout {...pageProps}>
        {animateTransition && <div className="transition" aria-hidden="true" />}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
