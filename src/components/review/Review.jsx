// components/Review.js
import Image from 'next/image';
import Link from 'next/link';
import styles from './Review.module.scss';

function Review({ index, review }) {
  return (
    <article key={index} className={styles.review}>
      <Image
        src={review.profile_photo_url}
        alt={`Photo de profil de ${review.author_name}, auteur de l'avis`}
        width={30}
        height={30}
      />
      <h2>{review.author_name}</h2>
      <p>
        <strong>
          {review.rating}
          /5
        </strong>
      </p>
      <p><em>{review.relative_time_description}</em></p>
      <p>{review.text}</p>
      <p><Link href={review.author_url} target="_blank" rel="noopener noreferrer">Voir l'avis original</Link></p>
    </article>
  );
}

export default Review;
