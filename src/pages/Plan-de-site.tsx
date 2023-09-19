import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import styles from '../styles/SiteMap.module.scss';
import fetcher from '../utils/fetcher';

export async function getStaticProps() {
  const responsePage = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Plan-de-site`);
  const responseInterventions = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Interventions`);
  const responseSubcategory = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=subcategory`);
  const responseAnnuaire = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Annuaire`);

  return {
    props: {
      responsePage,
      responseInterventions,
      responseSubcategory,
      responseAnnuaire,
    },
  };
}

export default function SiteMapPage({
  responsePage,
  responseInterventions,
  responseSubcategory,
  responseAnnuaire,
}) {
  const { data: pageSwr } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/Plan-de-site`, fetcher);
  const { data: interventionsSwr } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Interventions`, fetcher);
  const { data: subcategorySwr } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=subcategory`, fetcher);
  const { data: annuaireSwr } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Annuaire`, fetcher);

  const page = pageSwr || responsePage;
  const interventions = interventionsSwr || responseInterventions;
  const subcategory = subcategorySwr || responseSubcategory;
  const annuaire = annuaireSwr || responseAnnuaire;

  const descriptionMeta = page.contents.replace(/(<([^>]+)>)/gi, '').substring(0, 160);

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
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
                  Page d&apos;accueil de Une Taupe Chez Vous !
                </Link>
              </li>
              <li>
                <Link href="/Taupier-agree-professionnel-depuis-1994">
                  Qui sommes-nous ? Une présentation de notre entreprise,
                  de notre histoire et de notre équipe dédiée.
                </Link>
              </li>
            </ul>
          </li>
          <li className={styles['siteMap__list--title']}>
            À propos
            <ul className={styles['siteMap__list--secondary']}>
              <li>
                <Link href="/Taupier-agree-professionnel-depuis-1994">
                  Nos valeurs : Découvrez nos valeurs fondamentales
                  qui guident notre travail au quotidien.
                </Link>
              </li>
              <li>
                <Link href="/Tarifs">
                  Tarifs : Découvrez nos tarifs pour nos prestations
                </Link>
              </li>
              <li>
                <Link href="/Temoignages">
                  Témoignages : Découvrez les témoignages de nos clients
                </Link>
              </li>
              <li>
                <Link href="/Mentions-Legales">
                  Mentions légales : Informations juridiques sur Notre
                  Entreprise, y compris les détails de l&apos;entreprise et les réglementations.
                </Link>
              </li>
              <li>
                <Link href="/Contact">
                  Nous contacter, obtenir un devis gratuit ou prendre rendez-vous avec nous.
                </Link>
              </li>
              <li>
                <Link href="/Foire-aux-questions">
                  Foire aux questions : Retrouvez les questions les plus fréquentes
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
                  Retrouvez tous nos articles sur les taupes, ragondins, fouines, etc.
                </Link>
              </li>
              {subcategory.map((category) => (
                <li key={category.name}>
                  <Link href={`Articles/${category.slug}`}>
                    Articles :
                    {' '}
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* <li className={styles['siteMap__list--title']}>
            <Link href="/Temoignages">
              Témoignages
            </Link>
          </li> */}
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
                  Ajouter mon site à l&apos;annuaire gratuitement !
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
