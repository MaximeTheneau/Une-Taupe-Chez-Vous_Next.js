import Head from 'next/head';
import useSWR from 'swr';
import styles from '../../styles/Pages.module.scss';
import DirectoryRegistrationForm from '../../components/directoryRegistrationForm/DirectoryRegistrationForm';
import TableOfContents from '../../components/tableOfContents/TableOfContents';
import fetcher from '../../utils/fetcher';

export async function getStaticProps() {
  const responseArticles = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Annuaire`);
  const responsePage = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Inscription-annuaire-gratuite`);

  return {
    props: {
      responseArticles,
      responsePage,
    },
  };
}

// == Composant
export default function Page({ responsePage, responseArticles }) {
  const { data: articleSwr } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Annuaire`, fetcher);
  const { data: pageSwr } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/Inscription-annuaire-gratuite`, fetcher);

  const page = pageSwr || responsePage;
  const article = articleSwr || responseArticles;

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/Annuaire/${page.slug}`} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_URL}/Annuaire/${page.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/Annuaire/${page.slug}`}
          key="canonical"
        />
      </Head>

      <section className={styles.page}>
        <h1>{page.title}</h1>
        <p>
          {page.contents}
        </p>
        <DirectoryRegistrationForm
          article={article}
        />
        <TableOfContents post={page} />
        {page.paragraphPosts.map((paragraphPosts) => (
          <>
            <h2 id={paragraphPosts.slug}>{paragraphPosts.subtitle}</h2>
            <p>{paragraphPosts.paragraph}</p>
          </>
        ))}
      </section>
    </>
  );
}
