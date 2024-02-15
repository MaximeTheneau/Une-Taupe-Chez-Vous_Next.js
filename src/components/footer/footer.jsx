import Link from 'next/link';
import styles from './Footer.module.scss';
import Search from '../search/Search';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__links}>
        <div>
          <p className={styles['footer__links--title']}>
            Rechercher
          </p>
          <Search />
        </div>
        <div>
          <p className={styles['footer__links--title']}>
            Services
          </p>
          <ul>
            <li>
              <Link href="/Devis-en-ligne">
                Devis en ligne gratuit
              </Link>
            </li>
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
          </ul>
        </div>
        <div>
          <p className={styles['footer__links--title']}>
            Contact
          </p>
          <ul>
            <li>
              <Link href="/Contact">
                Contactez-nous !
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/company/une-taupe-chez-vous" target="_blank" prefetch={false}>
                <i className="icon-linkedin" />
                Linkedin
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com/UneTaupe_" target="_blank" prefetch={false}>
                <i className="icon-twitter" />
                Twitter
              </Link>
            </li>
            <li>
              <Link href="https://www.facebook.com/unetaupechezvous/" target="_blank" prefetch={false}>
                <i className="icon-facebook" />
                Facebook
              </Link>
            </li>
          </ul>
        </div>

      </div>
      <div className={styles.footer__lower}>
        <p>
          <Link href="/Plan-de-site">
            Plan du site
          </Link>
        </p>
        <p>
          <Link href="/Foire-aux-questions">
            Question fréquentes (FAQ)
          </Link>
        </p>
        <p>
          <Link href="/Mentions-Legales">
            Mentions légales
          </Link>
        </p>
      </div>
    </div>
  );
}
