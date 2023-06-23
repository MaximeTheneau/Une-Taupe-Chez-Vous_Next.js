import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.scss';
import SlideTransition from '../../hooks/useSlideTransition/SlideTransition';
import imageThumbnail from '../../utils/imageThumbnail';

export default function Card({ card }) {
  let pathCard = '';

  if (card.category.slug === 'Annuaire') {
    pathCard = `${card.category.slug}/${card.slug}`;
  } if (card.category.slug === 'Pages' && card.slug !== 'Inscription-annuaire-gratuite') {
    pathCard = `${card.slug}`;
  } if (card.slug === 'Inscription-annuaire-gratuite') {
    pathCard = `Annuaire/${card.slug}`;
  } if (card.category.slug === 'Articles') {
    pathCard = `${card.category.slug}/${card.subcategory.slug}/${card.slug}`;
  } else {
    pathCard = `${card.category.slug}/${card.slug}`;
  }

  return (
    <SlideTransition
      className={styles.card}
    >
      <Link href={`/${pathCard}`}>
        <Image
          src={`${card.imgPost}.webp`}
          alt={card.altImg || card.title}
          width={330}
          height={310}
          loader={imageThumbnail}
          quality={70}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        <h3 className={styles.card__content}>{card.title}</h3>
      </Link>
    </SlideTransition>
  );
}
