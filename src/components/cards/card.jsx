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
          src={`${card.imgPost}?width=330&height=330`}
          alt={card.altImg || card.title}
          width={330}
          height={330}
          loading="lazy"
          decoding="async"
        />
        <p className={styles.card__content}>{card.title}</p>
      </Link>
    </li>
  );
}
