import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import ContactForm from '../components/contact/ContactForm';
import styles from '../styles/Pages.module.scss';
import imageLoaderFull from '../utils/imageLoaderFull';
import NotCopie from '../components/notCopie/NotCopie';
import { fetcher } from '../utils/fetcher';

export async function getStaticProps() {
  const responsePage = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Contact`);

  return {
    props: {
      responsePage,
    },
  };
}

export default function Contact({ responsePage }) {
  const { data: pageSwr } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/Contact`, fetcher);

  const page = pageSwr || responsePage;
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Contactez-nous - Devis gratuit - Nous vous répondrons dans les plus brefs délais pour vous fournir une estimation gratuite et répondre à toutes vos questions." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact" />
        <meta property="og:description" content="Contactez-nous - Devis gratuit - Nous vous répondrons dans les plus brefs délais pour vous fournir une estimation gratuite et répondre à toutes vos questions." />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>

      <section className={styles.page}>
        <h1>{page.title}</h1>
        <p>
          {page.contents}
        </p>
        <h2>Contactez-nous - Devis gratuit</h2>
        <div className={styles.page__contact}>
          <div className={styles.page__contact__block} itemScope itemType="https://schema.org/PostalAdress">
            <p itemProp="address">
              <strong>Adresse : </strong>
              <span itemProp="streetAddress">71 Marie Curie </span>
              <span itemProp="postalCode">27780 </span>
              <span itemProp="addressLocality">Garrennes-Sur-Eure </span>
            </p>
            <p itemProp="telephone">
              <strong>Téléphone : </strong>
              <Link href="tel:+33232264958"> +33 2 32 26 49 58</Link>
            </p>
            <NotCopie />
          </div>
          <div className={styles.page__contact__block}>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
