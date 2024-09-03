// components/Review.js
import Image from 'next/image';
import Link from 'next/link';
import styles from './Review.module.scss';

const Review = ({ review }) => {
  return (
    <article className="review" itemScope itemType="http://schema.org/Review" className={styles.review}>
      <header>
        <Link href={review.author_url} className={styles.review__author}>
        <h2 itemProp="author" >
          {review.author_name}
        </h2>
        <Image 
            src={review.profile_photo_url} 
            alt={`${review.author_name}'s profile photo`} 
            width={30} 
            height={30} 
            itemProp="image" 
        />
        </Link>
        <div className={styles.review__rating}itemProp="reviewRating" itemScope itemType="http://schema.org/Rating" >
          <meta itemProp="worstRating" content="1" />
          <meta itemProp="bestRating" content="5" />
          <span itemProp="ratingValue" >{review.rating} étoiles</span> 
          <time dateTime={new Date(review.time * 1000).toISOString()} itemProp="datePublished">
            {review.relative_time_description}
          </time>
        </div>
      </header>
      <p itemProp="reviewBody">{review.text}</p>
    </article>
  );
};

export default Review;
