import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__links}>
        <ul>
          <li>

            <h2>
              <Link href="/Interventions">
                Interventions
              </Link>
            </h2>
          </li>
          <li>
            <Link href="/Interventions/Taupe">
              Taupe
            </Link>
          </li>
          <li>
            <Link href="/Interventions/Fouine">
              Fouine
            </Link>
          </li>
          <li>
            <Link href="/Interventions/Ragondin">
              Ragondin
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <h2>
              Informations
            </h2>
          </li>
          <li>
            <Link href="/Taupier-agree-professionnel-depuis-1994">
              Qui sommes-nous

            </Link>
          </li>
          <li>
            <Link href="/Contact">
              Demande de devis

            </Link>
          </li>
          <li>
            <Link href="/Mentions-Legales">
              Mentions légales

            </Link>
          </li>
          <li>
            <Link href="/Foire-aux-questions">
              Foire aux questions
            </Link>
          </li>
          <li>
            <Link href="/Plan-de-site">
              Plan du site
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/Contact">
              <h2>Contact</h2>
            </Link>
          </li>
          <li>
            <Link href="tel:+33232264958">
              <i className="icon-phone" />
              +33 2 32 26 49 58
            </Link>
          </li>
          <li>
            <Link href="/Contact">
              Devis gratuit | Contactez-nous !
            </Link>
          </li>
          <li>
            <Link href="https://www.linkedin.com/company/une-taupe-chez-vous" target="_blank" rel="nofollow">
              <i className="icon-linkedin" />
              Linkedin
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/UneTaupe_" target="_blank" rel="nofollow">
              <i className="icon-twitter" />
              Twitter
            </Link>
          </li>
          <li>
            <Link href="https://www.facebook.com/unetaupechezvous/" target="_blank" rel="nofollow">
              <i className="icon-facebook" />
              Facebook
            </Link>
          </li>
        </ul>

      </div>
      <div className={styles.footer__author}>
        <Link href="https://theneaumaxime.fr" target="_blank" rel="nofollow">
          Site réalisé par Maxime Theneau
        </Link>
      </div>
    </div>
  );
}
