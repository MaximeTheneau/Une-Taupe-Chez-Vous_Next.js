import Head from 'next/head';
import styles from '../../styles/Pages.module.scss';
import DirectoryRegistrationForm from '../../components/directoryRegistrationForm/DirectoryRegistrationForm';
import fetcher from '../../utils/fetcher';
import ImageLoader from '../../components/image/ImageLoader';

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
        <meta property="og:title" content={page.heading} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/Annuaire/${page.slug}`} />
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
          href={`${process.env.NEXT_PUBLIC_URL}/Annuaire/${page.slug}`}
          key="canonical"
        />
        {/* Image Preload */}
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href={page.imgPost}
          imagesrcset={page.srcset}
          imagesizes="100w"
          fetchpriority="high"
        />
      </Head>
      <section className={styles.page}>
        <figure>
          <ImageLoader
            src={page.imgPost}
            alt={page.altImg || page.title}
            width={page.imgWidth}
            height={page.imgHeight}
            srcset={page.srcset}
            priority
          />
          {page.title !== page.altImg && (
          <figcaption className="caption">
            {page.altImg}
          </figcaption>
          )}
        </figure>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.contentsHTML }} />
        <DirectoryRegistrationForm
          article={article}
        />
        {/* <TableOfContents post={page} /> */}
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
