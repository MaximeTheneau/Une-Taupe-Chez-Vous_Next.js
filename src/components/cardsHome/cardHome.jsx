/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from './CardHome.module.scss';

export default function Card({ card }) {
  return (
    <li className={styles.card}>
      <div className={styles.card__img}>
        <img
          src={`${card.imgPost}?width=500&height=500`}
          alt={card.altImg || card.title}
          width={500}
          height={500}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.card__content}>
        <Link
          href={card.url}
        >
          <h3>{card.title}</h3>
        </Link>
      </div>
    </li>
  );
}
