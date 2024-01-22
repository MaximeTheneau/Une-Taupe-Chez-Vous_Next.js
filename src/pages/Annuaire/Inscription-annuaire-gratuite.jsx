import Head from 'next/head';
import styles from '../../styles/Pages.module.scss';
import DirectoryRegistrationForm from '../../components/directoryRegistrationForm/DirectoryRegistrationForm';
import TableOfContents from '../../components/tableOfContents/TableOfContents';
import fetcher from '../../utils/fetcher';

export async function getStaticProps() {
  const article = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Annuaire`);
  const page = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Inscription-annuaire-gratuite`);

  return {
    props: {
      article,
      page,
    },
  };
}

// == Composant
export default function Page({ page, article }) {
  return (
    <>
      <Head>
        <title>{page.heading}</title>
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
        <div dangerouslySetInnerHTML={{ __html: page.contentsHTML }} />
        <DirectoryRegistrationForm
          article={article}
        />
        <TableOfContents post={page} />
        {page.paragraphPosts.map((paragraphPosts) => (
          <div key={paragraphPosts.id}>
            <h2 id={paragraphPosts.slug}>{paragraphPosts.subtitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: paragraphPosts.paragraph }} />
          </div>
        ))}
      </section>
    </>
  );
}
