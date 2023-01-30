import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [animateTransition, setAnimateTransition] = useState(false);
  useEffect(() => {
    setAnimateTransition(true);
    setTimeout(() => {
      setAnimateTransition(false);
    }, 600);
  }, [router.pathname]);
  return (
    <Layout {...pageProps} >
      {animateTransition && <div className="transition" />}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
