import Link from 'next/link';
import styles from './TableOfContents.module.scss';

export default function TableOfContents({ post }) {
  return (
    post.paragraphPosts[0] && (
    <nav className={styles.tableOfContents} aria-label="Sommaire">
      <p className={styles.tableOfContents__title}>Sommaire</p>
      <ul className={styles.tableOfContents__list}>
        {post.paragraphPosts.map((paragraphArticle) => (
          <li key={paragraphArticle.slug} className={styles.tableOfContents__item}>
            <Link href={`#${paragraphArticle.slug}`} className={styles.tableOfContents__link}>{paragraphArticle.subtitle}</Link>
          </li>
        ))}
      </ul>
    </nav>
    )
  );
}
