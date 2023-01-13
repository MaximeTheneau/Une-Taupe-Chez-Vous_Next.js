import '../styles/globals.scss';
import Layout from '../components/layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [animateTransition, setAnimateTransition] = useState(false);
  useEffect(() => {
    setAnimateTransition(true);
    setTimeout(() => {
      setAnimateTransition(false);
    }, 2000);
  }, [router.pathname]);
  console.log(animateTransition);
  return (
    <Layout {...pageProps}>
      {animateTransition && <div className="transition" />}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
