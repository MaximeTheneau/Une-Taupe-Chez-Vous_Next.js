import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__links}>
        <ul>
          <li>
            <h2>
              L'entreprise
            </h2>
          </li>
          <li>
            <Link href="/page/qui-sommes-nous">Qui-sommes-nous</Link>
          </li>
          <li>
            <Link href="/page/contact">Demande de devis</Link>
          </li>
          <li>
            <Link href="/page/mention-legal">Mentions légales</Link>
          </li>
        </ul>
        <ul>
          <li>
            <h2>Contacter</h2>
          </li>
          <li>
            <Link href="/page/contact">
              <i className="icon-linkedin" />
              Contacter nous
            </Link>
          </li>
          <li>
            <Link href="#zeze">
              <i className="icon-linkedin" />
              Linkedin
            </Link>
          </li>
          <li>
            <Link href="r#rrr">
              <i className="icon-facebook" />
              Facebook
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <h2>Services</h2>
          </li>
          <li>
            <Link href="/services/Taupe">Taupe</Link>
          </li>
          <li>
            <Link href="/services/Fouine">Fouine</Link>
          </li>
          <li>
            <Link href="/services/Ragondin">Ragondin</Link>
          </li>
        </ul>
      </div>
      <div className={styles.footer__author}>
        Site réaliser par
        <Link href="https://theneaumaxime.fr" target="_blank"> Maxime Theneau</Link>
      </div>
    </div>
  );
}
