import Link from 'next/link';
import styles from './Category.module.scss';

export default function Category({ category }) {
  return (
    <nav>
      <ul className={styles.category}>
        <li className="button">
          <Link href="/Articles">
            Articles
          </Link>
        </li>
        {category
            && (
            <li className="button">
              <Link href={`/Articles/${category.slug}`}>
                {category.name}
              </Link>
            </li>
            )}
      </ul>
    </nav>

  );
}
