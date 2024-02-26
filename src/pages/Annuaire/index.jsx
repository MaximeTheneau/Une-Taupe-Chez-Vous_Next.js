/* eslint-disable quote-props */
import Head from 'next/head';
import Link from 'next/link';
import Cards from '../../components/cards/cards';
import styles from '../../styles/Pages.module.scss';
import fetcher from '../../utils/fetcher';

export async function getStaticProps() {
  const articles = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Annuaire`);
  const page = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Annuaire`);
  return {
    props: {
      articles,
      page,
    },
  };
}

export default function Home({ page, articles }) {
  return (
    <>
      <Head>
        <title>{page.heading}</title>
        <meta name="description" content={page.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
        <meta property="og:image:width" content={page.imgWidth} />
        <meta property="og:image:height" content={page.imgHeight} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>
      <section>

        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.contentsHTML }} />

        {/* --Articles--*/}
        <h2>Nos Annuaire</h2>
        <div className={styles.home}>
          <Cards cards={articles} />
        </div>
        <h3>Référencez-vous gratuitement en tant que professionnel </h3>
        <p>
          Le référencement gratuit, c&apos;est comme une publicité gratuite en continu pour
          votre entreprise. Vous pouvez apparaître dans les résultats de recherche lorsque
          les clients potentiels cherchent des services dans votre domaine. Et devinez quoi
          ? Vous pouvez le faire sans débourser un centime !
        </p>
        <Link href="/Annuaire/Inscription-annuaire-gratuite" className="stronk">
          Inscrivez vôtre entreprise gratuitement
        </Link>
      </section>
    </>
  );
}
