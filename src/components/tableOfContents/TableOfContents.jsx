import styles from './TableOfContents.module.scss';

export default function TableOfContents({ post }) {
  return (
    post.paragraphPosts[0] && (
    <nav className={styles.tableOfContents} aria-label="Sommaire">
      <h2 className={styles.tableOfContents__title}>Sommaire</h2>
      <ul className={styles.tableOfContents__list}>
        {post.paragraphPosts.map((paragraphArticle) => (
          <li key={paragraphArticle.slug} className={styles.tableOfContents__item}>
            <a href={`#${paragraphArticle.slug}`} className={styles.tableOfContents__link}>{paragraphArticle.subtitle}</a>
          </li>
        ))}
      </ul>
    </nav>
    )
  );
}
