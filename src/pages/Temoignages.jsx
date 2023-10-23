import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Pages.module.scss';

export async function getStaticProps() {
  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Temoignages`);
  const page = await responsePage.json();

  return {
    props: {
      page,
    },
  };
}
// == Composant
export default function testimonials({ page }) {
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
        <p>{page.contents}</p>
        <div className={styles.home__testimonials}>
          <h2>
            {page.title}
            {' '}
            :
          </h2>
          <ul>
            {page.paragraphPosts.map((paragraphTestimonial) => (
              <li>
                <h3>
                  De :
                  {paragraphTestimonial.subtitle}
                </h3>
                <h4>Notes : ⭐⭐⭐⭐⭐</h4>
                <p>
                  <strong>
                    Avis :
                  </strong>
                  {paragraphTestimonial.paragraph}
                </p>
              </li>
            ))}
          </ul>
          <Link href="https://goo.gl/maps/8Q9vNCtioX7Nz1BLA" target="_blank">
            Découvrez les avis de nos clients
          </Link>
        </div>
      </section>
    </>
  );
}
