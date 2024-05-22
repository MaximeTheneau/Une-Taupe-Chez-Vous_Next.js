import Link from 'next/link';
import styles from './Faq.module.scss';
import stylesPage from '../../styles/Pages.module.scss';

/**
Faq element component
@param {Object} faq - Faq data
@param {Function} toggleFAQ - Function to toggle faq open state
@see Faq.module.scss
*/
function FaqElements({ faq }) {
  return (
    <li
      key={faq.id}
      role="menuitem"
      className={styles.faqs}
    >
      <h2 className={styles.faq__question}>{faq.title}</h2>
      <p>{faq.description}</p>
      {faq.link && (
        <div className={stylesPage.page__contents__paragraph__links}>
          <span className={stylesPage.page__contents__paragraph__links__link}>
            → A lire aussi :
            <Link href={faq.link}>
              {' '}
              {faq.linkSubtitle}
            </Link>
          </span>
        </div>
      )}
    </li>
  );
}

export default FaqElements;
