import Head from 'next/head';
import styles from '../styles/Pages.module.scss';
import ImageObjectJsonLd from '../components/jsonLd/ImageObjectJsonLd';
import BreadcrumbJsonLd from '../components/jsonLd/BreadcrumbJsonLd';

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
        <title>{page.heading}</title>
        <meta name="description" content={page.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.heading} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:image" content="https://picture.unetaupechezvous.fr/Accueil.webp?format=jpeg" />
        <meta property="og:image:width" content={page.imgWidth} />
        <meta property="og:image:height" content={page.imgHeight} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.heading} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content="https://picture.unetaupechezvous.fr/Accueil.webp?format=jpeg" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>
      {/* Schema.org */}
      <ImageObjectJsonLd post={page} />
      <BreadcrumbJsonLd paragraphPosts={page.paragraphPosts} urlPost={`${process.env.NEXT_PUBLIC_URL}/${page.urlPost}`} />
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
