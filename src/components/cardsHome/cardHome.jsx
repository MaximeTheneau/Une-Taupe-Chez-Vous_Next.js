/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from './CardHome.module.scss';

export default function Card({ card }) {
  return (
    <li className={styles.card}>
      <Link
        href={card.url}
        className={styles.card__img}
        rel="preload"
      >
        <img
          src={`${card.imgPost}?width=500&height=500`}
          alt={card.altImg || card.title}
          width={500}
          height={500}
          loading="lazy"
          decoding="async"
        />
        <div className={styles.card__content}>
          <h3>{card.title}</h3>
          <p>{card.metaDescription}</p>
        </div>
      </Link>
    </li>
  );
}
