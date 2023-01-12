import Link from 'next/link';
import styles from '../styles/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Site réaliser par
      <Link href="https://theneaumaxime.fr" target="_blank">Maxime Theneau</Link>
    </footer>
  );
}
