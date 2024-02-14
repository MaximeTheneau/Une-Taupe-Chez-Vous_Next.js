import Link from 'next/link';
import AnimationHover from '../../hooks/useHoverAnimation/CloneTextWrapper';
import styles from './DevisButton.module.scss';

export default function ContactButton() {
  return (
    <button
      type="button"
      className={styles.button}
      role="link"
    >
      <Link href="/Contact">
        <AnimationHover>
          Contactez-nous
        </AnimationHover>
      </Link>
    </button>
  );
}
