import Link from 'next/link';
import styles from './Footer.module.scss';
import AnimationHover from '../../hooks/useHoverAnimation/CloneTextWrapper';

export default function Footer({services}) {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__links}>
        <ul>
          <li>
            <h2>
              L&apos;entreprise
            </h2>
          </li>
          <li>
            <Link href="/page/qui-sommes-nous">
              <AnimationHover>
                Qui-sommes-nous
              </AnimationHover>
            </Link>
          </li>
          <li>
            <Link href="/page/contact">
              <AnimationHover>
                Demande de devis
              </AnimationHover>
            </Link>
          </li>
          <li>
            <Link href="/page/mentions-legales">
              <AnimationHover>
                Mentions légales
              </AnimationHover>
            </Link>
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
            <Link href="/services/La-taupe-a-un-odorat-et-l-ouie-tres-developpes">
              <AnimationHover>
                Taupe
              </AnimationHover>
            </Link>
          </li>
          <li>
            <Link href="/services/La-fouine-aime-les-conduits-electriques-gaines-dans-les-voitures">
              <AnimationHover>
                Fouine
              </AnimationHover>
            </Link>
          </li>
          <li>
            <Link href="/services/Le-ragondin-detruit-les-berges-et-l-ecosysteme">
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
            Site réalisé par Maxime Theneau
          </AnimationHover>
        </Link>
      </div>
    </div>
  );
}
