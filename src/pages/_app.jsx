import Head from 'next/head';
import Layout from '../components/layout';
import '../styles/globals.scss';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  // const router = useRouter();
  // const [animateTransition, setAnimateTransition] = useState(false);
  // useEffect(() => {
  //   setAnimateTransition(true);
  //   setTimeout(() => {
  //     setAnimateTransition(false);
  //   }, 500);
  // }, [router.pathname]);

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="yObJd5noBtjUBky_GRbOOETV42Q9qAHf7w00PPz1-ss" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <Script 
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />
      <Script 
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
          `
        }}
      />
      <Layout {...pageProps}>
        {/* {animateTransition && <div className="transition" aria-hidden="true" />} */}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
