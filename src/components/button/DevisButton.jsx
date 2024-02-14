import Link from 'next/link';
import styles from './DevisButton.module.scss';
import AnimationHover from '../../hooks/useHoverAnimation/CloneTextWrapper';

export default function DevisButton() {
  return (
    <button
      type="button"
      className={styles.button}
      role="link"
    >
      <Link href="/Devis-en-ligne">
        <AnimationHover>
          Demandez un devis
        </AnimationHover>
      </Link>
    </button>
  );
}
