import Link from 'next/link';
import AnimationHover from '../../hooks/useHoverAnimation/CloneTextWrapper';

export default function Button() {
  return (
    <div className="button">
      <Link href="/Contact">
        <AnimationHover>
          Contactez-nous
        </AnimationHover>
      </Link>
    </div>
  );
}
