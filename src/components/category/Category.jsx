import Link from 'next/link';
import styles from './Category.module.scss';

export default function Category({ subcategoryName, subcategorySlug }) {
  return (
    <nav>
      <ul className={styles.category}>
        <li>
          <Link href="/Articles">
            Articles
          </Link>
        </li>
        {subcategoryName && (
            <li>
              {' '}
              &gt;
              {' '}
              <Link href={`/Articles/${subcategorySlug}`}>
                {subcategoryName}
              </Link>
            </li>
            )}
      </ul>
    </nav>

  );
}
