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
          src={`${card.imgPost}?width=700&height=700`}
          alt={card.altImg || card.title}
          width={700}
          height={700}
          loading="lazy"
          decoding="async"
        />
        <div className={styles.card__content}>
          <h3>{card.title}</h3>
          <p>{card.metaDescription}</p>
          <button type="button" className="button--grey button">En savoir plus</button>
        </div>
      </Link>
    </li>
  );
}
