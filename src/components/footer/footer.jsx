import Link from 'next/link';
import styles from './Footer.module.scss';
import Search from '../search/Search';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__links}>
        <div>
          <ul>
            <li>
              <Link href="/Devis-en-ligne">
                Devis en ligne gratuit
              </Link>
            </li>
            <li>
              <Link href="/Contact">
                Formulaire de contact
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
            <li>
              <Search id="footer-search" />
            </li>
          </ul>
        </div>
        <div>
          <ul>

            <li>
              <Link href="https://www.linkedin.com/company/une-taupe-chez-vous" rel="noopener" target="_blank" prefetch={false}>
                <i className="icon-linkedin" />
                Linkedin
              </Link>
            </li>
            <li>
              <Link href="https://x.com/UneTaupe_" target="_blank" rel="noopener" prefetch={false}>
                <i className="icon-twitter" />
                Twitter
              </Link>
            </li>
            <li>
              <Link href="https://www.facebook.com/unetaupechezvous/" target="_blank" rel="noopener" prefetch={false}>
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
