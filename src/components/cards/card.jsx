import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.scss';
// import SlideTransition from '../../hooks/useSlideTransition/SlideTransition';
import imageThumbnail from '../../utils/imageThumbnail';

export default function Card({ card }) {
  return (
    <li className={styles.card}>
      <Link href={card.url} className={styles.card__img}>
        <Image
          src={`${card.imgPost}.webp`}
          alt={card.altImg || card.title}
          width={330}
          height={310}
          loader={imageThumbnail}
          quality={70}
          sizes="(max-width: 640px) 100vw,
          (max-width: 750px) 100vw,
          (max-width: 828px) 100vw,
          (max-width: 1080px) 100vw,
          100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        <h3 className={styles.card__content}>{card.title}</h3>
      </Link>
    </li>
  );
}
