import Link from 'next/link';
import styles from './DevisButton.module.scss';

export default function DevisButton() {
  return (
    <button
      type="button"
      className={styles.button}
      role="link"
    >
      <Link href="/Devis-en-ligne">
        Demandez un devis
      </Link>
    </button>
  );
}
