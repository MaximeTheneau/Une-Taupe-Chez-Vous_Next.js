import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.scss';
import SlideTransition from '../../hooks/useSlideTransition/SlideTransition';

export default function card({ card, name }) {
  return (
    <SlideTransition
      className={styles.card}
    >
      <Link href={`${name}/${card.slug}`}>
        <Image
          src={`${card.slug}.webp`}
          alt={`Image de ${card.title}`}
          width="1080"
          height="720"
          sizes='(max-width: 768px) 100vw'
        />
        <div className={styles.card__content}>
          <h3 className={styles.card__title}>{card.title}</h3>
          <p className={styles.card__text}>{card.subtitle}</p>
        </div>
      </Link>
    </SlideTransition>
  );
}
