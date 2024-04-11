/* eslint-disable @next/next/no-img-element */
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
        <img
          src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/c_thumb,g_face,w_330,h_330,q_auto:eco/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${card.imgPost}.webp`}
          alt={card.altImg || card.title}
          width={330}
          height={330}
          loading="lazy"
          decoding="async"
        />
        <h3 className={styles.card__content}>{card.title}</h3>
      </Link>
    </li>
  );
}
