import ContactForm from '../../components/contactForm';
import styles from '../../styles/Contact.module.scss';

// == Composant
export default function Contact() {
  return (
    <div className="contact">
      <h1>Contact</h1>
      <div>
        <h2 className={styles.contact__title}>
          Besoin d'un taupier professionnel dans les Yvelines?
        </h2>
        <p className={styles.contact__text}>
          N'hésitez pas à nous contacter! Artisan taupier expérimenté et qualifié, n'hésitez pas
          à remplir le formulaire ci-dessous pour nous faire part de vos besoins et nous vous 
          répondrons dans les plus brefs délais.
        </p>
      </div>
      <div>
        <h2 className={styles.contact__title}>Formulaire de contact</h2>
        <ContactForm />
      </div>
    </div>
  );
}
