import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__links}>
        <ul>
          <li>
            <Link href="/Interventions">
              Interventions
            </Link>
          </li>
          <li>
            <Link href="/Taupier-agree-professionnel-depuis-1994">
              Qui sommes-nous
            </Link>
          </li>
          <li>
            <Link href="/Contact">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/Mentions-Legales">
              Mentions légales
            </Link>
          </li>
          <li>
            <Link href="/Foire-aux-questions">
              Question fréquentes (FAQ)
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
              Contactez-nous !
            </Link>
          </li>
          <li>
            <Link href="https://www.linkedin.com/company/une-taupe-chez-vous" target="_blank">
              <i className="icon-linkedin" />
              Linkedin
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/UneTaupe_" target="_blank">
              <i className="icon-twitter" />
              Twitter
            </Link>
          </li>
          <li>
            <Link href="https://www.facebook.com/unetaupechezvous/" target="_blank">
              <i className="icon-facebook" />
              Facebook
            </Link>
          </li>
        </ul>

      </div>
      <div className={styles.footer__author}>
        <Link href="https://theneaumaxime.fr" target="_blank">
          Site réalisé par Maxime Theneau
        </Link>
      </div>
    </div>
  );
}
