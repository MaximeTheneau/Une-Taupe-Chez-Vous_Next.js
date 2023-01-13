import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.scss';

export default function card({ card, name }) {
  return (
    <div className={styles.card}>
      <Link href={`${name}/${card.slug}`}>
        <Image
          src={card.imgPost.path}
          alt={`Image de ${card.title}`}
          width={card.imgPost.width}
          height={card.imgPost.height}
        />
        <div className={styles.card__content}>
          <h3 className={styles.card__title}>{card.title}</h3>
          <p className={styles.card__text}>{card.subtitle}</p>
        </div>
      </Link>
    </div>
  );
}
