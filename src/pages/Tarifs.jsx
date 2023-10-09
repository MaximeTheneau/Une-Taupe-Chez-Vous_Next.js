import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Pages.module.scss';
// import ReactMarkdown from 'react-markdown';

export async function getStaticProps() {
  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Tarifs`);
  const page = await responsePage.json();

  return {
    props: {
      page,
    },
  };
}
// == Composant
export default function pricing({ page }) {

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>
      <section className={styles.page}>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.contents }} />
        {page.paragraphPosts.map((paragraphPosts) => (
          <>
            <h2>{paragraphPosts.subtitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: paragraphPosts.paragraph }} />
          </>
        ))}
      </section>
    </>
  );
}
