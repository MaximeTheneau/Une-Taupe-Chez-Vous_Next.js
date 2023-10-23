/* eslint-disable quote-props */
import Head from 'next/head';
import Cards from '../../components/cards/cards';
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
      <>
        <section>

          <h1>{page.title}</h1>
          <p>
            {page.contents}
          </p>
          <h2>Nos interventions</h2>
          <div className={styles.home}>
            <Cards cards={articles} />
          </div>
          <TableOfContents post={page} />
          {page.paragraphPosts.map((paragraphPosts) => (
            <>
              <h2 id={paragraphPosts.slug}>{paragraphPosts.subtitle}</h2>
              <p>{paragraphPosts.paragraph}</p>
            </>
          ))}
        </section>
        {/* --Articles--*/}

      </>
    </>
  );
}
