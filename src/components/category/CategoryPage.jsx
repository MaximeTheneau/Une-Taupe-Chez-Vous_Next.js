import Link from 'next/link';
import styles from './Category.module.scss';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';

export async function getStaticProps() {
  const responseSubcategory = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=subcategory`);

  return {
    props: {
      responseSubcategory,
    },
  };
}


export default function CategoryPage({ category, responseSubcategory, subcategoryPost }) {
  const { data: subcategoryData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=subcategory`, fetcher);
  const subcategory = subcategoryData || responseSubcategory;
  console.log(subcategoryPost);
  return (
    <nav>
      <ul className={styles.category}>
        <li>
          <Link href="/Articles" className={`button ${!category === false && 'button--disabled'}`}>
            Articles
          </Link>
        </li>

        {subcategory
            && ( subcategory.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/Articles/${category.slug}`}
                    className={`button ${category.name === subcategoryPost  && 'button--disabled'}`}>
                    {category.name}
                  </Link>
                </li>
              ))
            )}
      </ul>
    </nav>

  );
}