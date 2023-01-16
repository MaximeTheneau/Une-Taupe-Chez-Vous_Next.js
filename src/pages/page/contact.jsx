import Image from 'next/image';
import ContactForm from '../../components/contact/contactForm';
import styles from './Pages.module.scss';

export async function getStaticProps() {
  const responseContact = await fetch('http://localhost:8000/api/pages/Contact');
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
      <section className={styles.page__image}>
        <h1>{page.title}</h1>
        <Image
          src={page.imgHeader.path}
          alt={page.title}
          width={page.imgHeader.width}
          height={page.imgHeader.height}
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
