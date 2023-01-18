import Head from 'next/head';
import Link from 'next/link';
import CloneTextWrapper from '../hooks/useHoverAnimation/CloneTextWrapper';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page d&apos;erreur</title>
        <meta name="description" content="404 Pages - " />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="404 - Page d'erreur" />
        <meta property="og:description" content="404 - Page d'erreur" />
        <meta property="og:site_name" content="https://unetaupechezvous.fr" />
        {/* <meta property="og:image" content="" /> */}
      </Head>
      <section>
        <h1>Désolé</h1>
        <p>Oups la page que vous recherche est innaccessible</p>
        <button type="button">
          <Link
            href="/"
          >
            <CloneTextWrapper>
              Page d&apos;accueil
            </CloneTextWrapper>
          </Link>
        </button>
      </section>
    </>
  );
}
