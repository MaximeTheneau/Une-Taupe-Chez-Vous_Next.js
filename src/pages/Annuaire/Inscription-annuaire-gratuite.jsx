import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Pages.module.scss';
import imageLoaderFull from '../../utils/imageLoaderFull';
import Button from '../../components/button/button';
import DirectoryRegistrationForm from '../../components/directoryRegistrationForm/DirectoryRegistrationForm';
import TableOfContents from '../../components/tableOfContents/TableOfContents';

export async function getStaticProps() {
  const responseArticles = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Annuaire`);
  const article = await responseArticles.json();

  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Inscription-annuaire-gratuite`);
  const page = await responsePage.json();

  return {
    props: {
      page,
      article,
    },
  };
}

// == Composant
export default function Page({ page, article }) {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content="Mention legales de Une Taupe Chez Vous" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content="Mention legales de Une Taupe Chez Vous" />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>

      <section className={styles.page}>
        <h1>{page.title}</h1>
        <p>
          {page.contents}
        </p>
        <TableOfContents post={page} />
        {page.paragraphPosts.map((paragraphPosts) => (
          <>
            <h2>{paragraphPosts.subtitle}</h2>
            <p>{paragraphPosts.paragraph}</p>
          </>
        ))}

        <DirectoryRegistrationForm
          article={article}
        />

      </section>
    </>
  );
}
