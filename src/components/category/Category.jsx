import Link from 'next/link';
import styles from './Category.module.scss';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';


export default function Category({ categories, subcategoryName, subcategorySlug }) {


  return (
    <nav>
      <ul className={styles.category}>
          <Link href="/Articles" >
            Articles
          </Link>
        <li>
        </li>

        {subcategoryName
            &&  (
                <li>
                  {' '}
                  &gt;
                  {' '}
                  <Link href={`/Articles/${subcategorySlug}`} >
                    {subcategoryName}
                  </Link>
                </li>
              
            )}
      </ul>
    </nav>

  );
}
