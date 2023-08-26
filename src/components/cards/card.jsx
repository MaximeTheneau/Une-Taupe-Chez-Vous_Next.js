import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.scss';
import SlideTransition from '../../hooks/useSlideTransition/SlideTransition';
import imageThumbnail from '../../utils/imageThumbnail';

export default function Card({ card }) {
  function getPathCard(articlesLink) {
    let pathCard = '';
    if (articlesLink.category.slug === 'Annuaire') {
      pathCard = `${articlesLink.category.slug}/${articlesLink.slug}`;
    } else if (articlesLink.category.slug === 'Pages' && articlesLink.slug !== 'Inscription-annuaire-gratuite') {
      pathCard = `${articlesLink.slug}`;
    } if (articlesLink.slug === 'Inscription-annuaire-gratuite') {
      pathCard = `Annuaire/${articlesLink.slug}`;
    } if (articlesLink.category.slug === 'Articles') {
      pathCard = `${articlesLink.category.slug}/${articlesLink.subcategory.slug}/${articlesLink.slug}`;
    } if (articlesLink.category.slug === 'Interventions') {
      pathCard = `${articlesLink.category.slug}/${articlesLink.slug}`;
    }
    return pathCard;
  }
  return (
    <SlideTransition
      className={styles.card}
    >
      <Link href={`/${getPathCard(card)}`}>
        <div className={styles.card__img}>
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
        </div>
        <h3 className={styles.card__content}>{card.title}</h3>
      </Link>
    </SlideTransition>
  );
}
