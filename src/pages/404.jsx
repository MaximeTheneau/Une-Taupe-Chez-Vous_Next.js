import Head from 'next/head';
import Link from 'next/link';
import CloneTextWrapper from '../hooks/useHoverAnimation/CloneTextWrapper';

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
            <CloneTextWrapper>
              Page d&apos;accueil
            </CloneTextWrapper>
          </Link>
        </button>
      </section>
    </>
  );
}
