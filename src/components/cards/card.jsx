import Image from 'next/image';
import styles from './Card.module.scss';

export default function card({ card }) {
  console.log(card);
  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <Image
          src={card.imgPost.path}
          alt={`Image de ${card.title}`}
          width={card.imgPost.width}
          height={card.imgPost.height}
        />
      </div>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{card.title}</h3>
        <p className={styles.card__text}>{card.subtitle}</p>
      </div>
    </div>
  )
}