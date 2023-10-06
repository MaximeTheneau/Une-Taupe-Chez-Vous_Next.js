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
  const descriptionMeta = page.contents.replace(/(<([^>]+)>)/gi, '').substring(0, 160);

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:description" content={descriptionMeta} />
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
              {/* <ReactMarkdown> */}
              {page.contents}
              {/* </ReactMarkdown> */}
        {page.paragraphPosts.map((paragraphPosts) => (
          <>

            <h2>{paragraphPosts.subtitle}</h2>
            {/* <ReactMarkdown> */}
              {paragraphPosts.paragraph}
            {/* </ReactMarkdown> */}
          </>
        ))}
      </section>
    </>
  );
}
