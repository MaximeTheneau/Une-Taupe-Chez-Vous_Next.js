import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.scss';
// import SlideTransition from '../../hooks/useSlideTransition/SlideTransition';
import imageThumbnail from '../../utils/imageThumbnail';

export default function Card({ card }) {
  function getPathCard(articlesLink) {
    let pathCard = '';
    if (articlesLink === null) {
      pathCard = '';
    } else if (articlesLink.category && articlesLink.category.name === 'Annuaire') {
      pathCard = `${articlesLink.category.name}/${articlesLink.slug}`;
    } else if (articlesLink.category && articlesLink.category.slug === 'Pages' && articlesLink.slug !== 'Inscription-annuaire-gratuite') {
      pathCard = `${articlesLink.slug}`;
    } if (articlesLink.category && articlesLink.slug === 'Inscription-annuaire-gratuite') {
      pathCard = `Annuaire/${articlesLink.slug}`;
    } if (articlesLink.category && articlesLink.category.name === 'Articles') {
      if (articlesLink.subcategory === null) {
        pathCard = `${articlesLink.category.name}/${articlesLink.slug}`;
      } else {
        pathCard = `${articlesLink.category.name}/${articlesLink.subcategory.slug}/${articlesLink.slug}`;
      }
    } if (articlesLink.category && articlesLink.category.name === 'Interventions') {
      pathCard = `${articlesLink.category.name}/${articlesLink.slug}`;
    }
    return pathCard;
  }
  return (
    <li className={styles.card}>
      <Link href={`/${getPathCard(card)}`} className={styles.card__img}>
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
