import Head from 'next/head';
import Layout from '../components/layout';
import '../styles/globals.scss';

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
      <Layout {...pageProps}>
        {/* {animateTransition && <div className="transition" aria-hidden="true" />} */}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
