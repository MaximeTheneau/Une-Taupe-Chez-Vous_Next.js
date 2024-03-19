import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page introuvable</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <section>
        <h1>Page introuvable</h1>
        <p>La page que vous recherchez n&apos;existe pas.</p>
        <button type="button" className="button">
          <Link
            href="/"
          >
            Page d&apos;accueil
          </Link>
        </button>
      </section>
    </>
  );
}
