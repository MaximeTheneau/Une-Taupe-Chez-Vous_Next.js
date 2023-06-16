import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/SiteMap.module.scss';

export async function getStaticProps() {
  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Plan-de-site-Une-Taupe-Chez-Vous`);
  const page = await responsePage.json();

  const responseInterventions = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Interventions`);
  const interventions = await responseInterventions.json();

  const responseSubcategory = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=subcategory`);
  const subcategory = await responseSubcategory.json();

  const responseAnnuaire = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Annuaire`);
  const annuaire = await responseAnnuaire.json();
  return {
    props: {
      page,
      interventions,
      subcategory,
      annuaire,
    },
  };
}

// == Components
export default function SiteMapPage({
  page, interventions, subcategory, annuaire,
}) {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content="Mention legales de Une Taupe Chez Vous" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content="Mention legales de Une Taupe Chez Vous" />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>

      <section className={styles.siteMap}>
        <h1>{page.title}</h1>
        <p>{page.contents}</p>
        <ul className={styles.siteMap__list}>
          <li className={styles['siteMap__list--title']}>
            Accueil
            <ul className={styles['siteMap__list--secondary']}>
              <li>
                <Link href="/">
                  Page d&apos;accueil
                </Link>
              </li>
              <li>
                <Link href="/Taupier-agree-professionnel-depuis-1994">
                  Qui sommes-nous ?
                </Link>
              </li>
            </ul>
          </li>
          <li className={styles['siteMap__list--title']}>
            À propos
            <ul className={styles['siteMap__list--secondary']}>
              <li>
                <Link href="/Taupier-agree-professionnel-depuis-1994">
                  Taupier agréé professionnel depuis 1994
                </Link>
              </li>
              <li>
                <Link href="/Tarifs">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/Mentions-Legales">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/plan-de-site">
                  Plan du site
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
            Contact
            <ul className={styles['siteMap__list--secondary']}>
              <li>
                <Link href="/Contact">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link href="tel:+33232264958">
                  +33 2 32 26 49 58
                </Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/company/une-taupe-chez-vous" target="_blank">
                  Linkedin
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com/UneTaupe_" target="_blank">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="https://www.facebook.com/unetaupechezvous/" target="_blank">
                  Facebook
                </Link>
              </li>
            </ul>
          </li>
          <li className={styles['siteMap__list--title']}>
            <Link href="/Articles">
              Articles
            </Link>
            <ul className={styles['siteMap__list--secondary']}>
              <li>
                <Link href="/Articles">
                  Tous les articles
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
            <Link href="/Foire-aux-questions">
              Foire aux questions
            </Link>
          </li>
          {/* <li className={styles['siteMap__list--title']}>
            <Link href="/Temoignages">
              Témoignages
            </Link>
          </li> */}
          <li className={styles['siteMap__list--title']}>
            Liste des ressources
            <ul className={styles['siteMap__list--secondary']}>
              <li>
                <Link href="/Annuaire">
                  Toutes les ressources
                </Link>
              </li>
              <li>
                <Link href="/Annuaire/Inscription-annuaire-gratuite">
                  Ajouter mon site
                </Link>
              </li>
              {annuaire.map((annuaires) => (
                <li key={annuaires.id}>
                  <Link href={`/Annuaire/${annuaires.slug}`}>
                    {annuaires.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </section>
    </>
  );
}
