import Link from 'next/link';
import styles from './Category.module.scss';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';


export default function CategoryPage({ category, subcategoryList, subcategoryName }) {
  return (
    <nav>
      <ul className={styles.category}>
        <li>
          <Link href="/Articles" className={`button ${!category === false && 'button--disabled'}`}>
            Articles
          </Link>
        </li>

        {subcategoryList.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/Articles/${category.slug}`}
                    className={`button ${subcategoryName && category.name === subcategoryName.name  && 'button--disabled'}`}>
                    {category.name}
                  </Link>
                </li>
              ))
            }
      </ul>
    </nav>

  );
}