import Link from 'next/link';
import styles from './Footer.module.scss';
import AnimationHover from '../../hooks/useHoverAnimation/CloneTextWrapper';

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
            <h2>Contact</h2>
          </li>
          <li>
            <Link href="/page/contact">
              <AnimationHover>
                Contacter nous
              </AnimationHover>
            </Link>
          </li>
          <li>
            <Link href="https://www.linkedin.com/company/une-taupe-chez-vous" target="_blank">
              <AnimationHover>
                <i className="icon-linkedin" />
                Linkedin
              </AnimationHover>
            </Link>
          </li>
          <li>
            <Link href="https://www.facebook.com/unetaupechezvous/" target="_blank">
              <AnimationHover>
                <i className="icon-facebook" />
                Facebook
              </AnimationHover>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <h2>Services</h2>
          </li>
          <li>
            <Link href="/services/Taupe">
              <AnimationHover>
                Taupe
              </AnimationHover>
            </Link>
          </li>
          <li>
            <Link href="/services/Fouine">
              <AnimationHover>
                Fouine
              </AnimationHover>
            </Link>
          </li>
          <li>
            <Link href="/services/Ragondin">
              <AnimationHover>
                Ragondin
              </AnimationHover>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.footer__author}>
        <Link href="https://theneaumaxime.fr" target="_blank">
          <AnimationHover>
            Site réaliser par Maxime Theneau
          </AnimationHover>
        </Link>
      </div>
    </div>
  );
}
