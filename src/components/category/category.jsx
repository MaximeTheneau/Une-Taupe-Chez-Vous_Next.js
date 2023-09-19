import Link from 'next/link';
import styles from './Category.module.scss';

export default function Category({ category }) {
  return (
    <nav>
      <ul className={styles.category}>
        <li>
          <Link href="/Articles" className="button">
            Articles
          </Link>
        </li>
        {category
            && (
            <li>
              <Link href={`/Articles/${category.slug}`} className="button">
                {category.name}
              </Link>
            </li>
            )}
      </ul>
    </nav>

  );
}
