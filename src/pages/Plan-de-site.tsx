import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/SiteMap.module.scss';
import fetcher from '../utils/fetcher';

export async function getStaticProps() {
  const page = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Plan-de-site`);
  const interventions = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Interventions`);
  const subcategory = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=subcategory`);

  return {
    props: {
      page,
      interventions,
      subcategory,
    },
  };
}

export default function SiteMapPage({
  page,
  interventions,
  subcategory,
}) {
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

      <section className={styles.siteMap}>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.contentsHTML }} />
        <ul className={styles.siteMap__list}>
          <li className={styles['siteMap__list--title']}>
            Accueil
            <ul className={styles['siteMap__list--secondary']}>
              <li>
                <Link href="/">
                  Page d&apos;accueil
                </Link>
              </li>
            </ul>
          </li>
          <li className={styles['siteMap__list--title']}>
            Qui sommes-nous ?
            <ul className={styles['siteMap__list--secondary']}>
              <li>
                <Link href="/Taupier-agree-professionnel-depuis-1994">
                  Présentation de l&apos;entreprise
                </Link>
              </li>
              <li>
                <Link href="/Temoignages">
                  Témoignages de nos clients
                </Link>
              </li>
              <li>
                <Link href="/Contact">
                  Contactez-nous
                </Link>
              </li>
              <li>
                <Link href="/Devis-en-ligne">
                  Devis en ligne
                </Link>
              </li>
              <li>
                <Link href="/Tarifs">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/Foire-aux-questions">
                  Foire aux questions
                </Link>
              </li>
            </ul>
          </li>
          <li className={styles['siteMap__list--title']}>
            Nos prestations
            <ul className={styles['siteMap__list--secondary']}>
              {interventions.map((intervention) => (
                <li key={intervention.id}>
                  <Link href={`/Interventions/${intervention.slug}`}>
                    {intervention.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className={styles['siteMap__list--title']}>
            <Link href="/Articles">
              Articles
            </Link>
            <ul className={styles['siteMap__list--secondary']}>
              <li>
                <Link href="/Articles">
                  Retrouvez tous nos articles
                </Link>
              </li>
              {subcategory.map((category) => (
                <li key={category.name}>
                  <Link href={`Articles/${category.slug}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className={styles['siteMap__list--title']}>
            Annuaires
            <ul className={styles['siteMap__list--secondary']}>
              <li>
                <Link href="/Annuaire">
                  Retrouvez tous les annuaires
                </Link>
              </li>
              <li>
                <Link href="/Annuaire/Inscription-annuaire-gratuite">
                  Possibilité d&apos;ajouter son site à l&apos;annuaire gratuitement
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </>
  );
}
