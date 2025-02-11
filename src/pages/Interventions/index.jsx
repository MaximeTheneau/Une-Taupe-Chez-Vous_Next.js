/* eslint-disable quote-props */
import Head from 'next/head';
import Cards from '../../components/cards/Cards';
import styles from '../../styles/Pages.module.scss';
import fetcher from '../../utils/fetcher';
import TableOfContents from '../../components/tableOfContents/TableOfContents';

export async function getStaticProps() {
  const articles = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Interventions`);
  const page = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Interventions`);

  return {
    props: {
      articles,
      page,
    },
  };
}

export default function Home({ articles, page }) {
  return (
    <>
      <Head>
        <title>{page.heading}</title>
        <meta name="description" content={page.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.heading} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:image" content={`${page.imgPost}?format=jpeg`} />
        <meta property="og:image:width" content={page.imgWidth} />
        <meta property="og:image:height" content={page.imgHeight} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.heading} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={`${page.imgPost}?format=jpeg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>
      <section>

        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.contentsHTML }} />
        <p>Nos interventions</p>
        <div className={styles.home}>
          <Cards cards={articles} />
        </div>
        <TableOfContents post={page} />
        {page.paragraphPosts.map((paragraphPosts) => (
          <>
            <h2 id={paragraphPosts.slug}>{paragraphPosts.subtitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: paragraphPosts.paragraph }} />
          </>
        ))}
      </section>
    </>
  );
}
