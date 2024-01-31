import Link from 'next/link';
import styles from './Category.module.scss';

export default function CategoryPage({ category, subcategoryPost, subcategoryList }) {
  return (
    <nav>
      <ul className={styles.category}>
        <li>
          <Link href="/Articles" className={`button ${!category === false && 'button--disabled'}`}>
            Articles
          </Link>
        </li>
        { subcategoryList?.map((categories) => (
          <li key={categories.id}>
            <Link
              href={`/Articles/${categories.slug}`}
              className={`button ${categories.name === subcategoryPost && 'button--disabled'}`}
            >
              {categories.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>

  );
}
