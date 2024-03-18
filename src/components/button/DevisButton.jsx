import Link from 'next/link';
import styles from './DevisButton.module.scss';
import AnimationHover from '../../hooks/useHoverAnimation/CloneTextWrapper';

export default function DevisButton({ tabIndex }) {
  return (
    <button
      type="button"
      className={styles.button}
      role="link"
      tabIndex={tabIndex}
    >
      <Link href="/Devis-en-ligne" rel="preload">
        <AnimationHover>
          Demandez un devis
        </AnimationHover>
      </Link>
    </button>
  );
}
