import Image from 'next/image';
import ContactForm from '../../components/contactForm';
import styles from '../../styles/Contact.module.scss';

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
    <div className="contact">
      <h1>{page.title}</h1>
      <div>
        <Image
          src={page.imgHeader.path}
          alt={page.title}
          width={page.imgHeader.width}
          height={page.imgHeader.height}
        />
      </div>
      <div>
        <h2 className={styles.contact__title}>
          {page.subtitle}
        </h2>
        <p className={styles.contact__text}>
          {page.contents}
        </p>
      </div>
      <div>
        <h2 className={styles.contact__title}>{page.contents}</h2>
        <ContactForm />
      </div>
    </div>
  );
}
