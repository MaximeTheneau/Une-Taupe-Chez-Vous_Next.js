import Link from 'next/link';
import AnimationHover from '../../hooks/useHoverAnimation/CloneTextWrapper';
import styles from './DevisButton.module.scss';

interface ButtonProps {
  text: string;
  icon: string | null;
}

export default function Button({ text, icon }: ButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      role="link"
    >
      <Link href="/Contact">
        <AnimationHover>
          { text }
          {icon && (
            <i className={icon} />
          )}
        </AnimationHover>
      </Link>
    </button>
  );
}
