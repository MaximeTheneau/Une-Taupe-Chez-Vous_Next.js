import Layout from '../components/layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  // const router = useRouter();
  // const [animateTransition, setAnimateTransition] = useState(false);
  // useEffect(() => {
  //   setAnimateTransition(true);
  //   setTimeout(() => {
  //     setAnimateTransition(false);
  //   }, 600);
  // }, [router.pathname]);
  // console.log(animateTransition);
  return (
    <Layout {...pageProps}>
      {/* {animateTransition && <div className="transition" />} */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
