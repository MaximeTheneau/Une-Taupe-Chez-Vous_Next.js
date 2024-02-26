import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.scss';

export default function Card({ card }) {
  return (
    <li className={styles.card}>
      <Link
        href={card.url}
        className={styles.card__img}
        rel="preload"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/c_thumb,w_330,q_70/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${card.imgPost}.webp`}
          alt={card.altImg || card.title}
          quality={70}
          width={330}
          height={330}
          unoptimized
        />
        <h3 className={styles.card__content}>{card.title}</h3>
      </Link>
    </li>
  );
}
