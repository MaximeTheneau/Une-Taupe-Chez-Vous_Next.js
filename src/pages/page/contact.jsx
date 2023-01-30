import Image from 'next/image';
import Head from 'next/head';
import ContactForm from '../../components/contact/contactForm';
import styles from '../../styles/Pages.module.scss';

export async function getStaticProps() {
  const responseContact = await fetch('https://back.unetaupechezvous.fr/public/api/pages/Contact');
  const page = await responseContact.json();

  return {
    props: {
      page,
    },
  };
}

// == Composant
export default function Contact({ page }) {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.subtitle} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="{page.title}" />
        <meta property="og:description" content={page.subtitle} />
        <meta property="og:site_name" content="${process.env.NEXT_PUBLIC_URL}/page/contact" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/contact.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}.fr/page/contact.html`}
          key="canonical"
        />
      </Head>

      <section className={styles.page__image}>
        <h1>{page.title}</h1>
        <Image
            src={`${page.slug}.webp`}
            alt={page.title}
            width='1080'
            height='720'
            sizes='(max-width: 1080px) 100vw, 1080px'
          />
      </section>
      <section>
        <h2>
          {page.subtitle}
        </h2>
        <p>
          {page.contents}
        </p>
      </section>
      <section>
        <h2>{page.contents}</h2>
        <ContactForm />
      </section>
    </>
  );
}
