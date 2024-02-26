import Link from 'next/link';
import styles from './Faq.module.scss';

/**
Faq element component
@param {Object} faq - Faq data
@param {Function} toggleFAQ - Function to toggle faq open state
@see Faq.module.scss
*/
function FaqElements({ faq, toggleFAQ }) {
  return (
    <li
      key={faq.id}
      role="menuitem"
      className={styles.faqs}
    >
      <Link
        role="button"
        href={`/Foire-aux-questions#${faq.id}`}
        aria-expanded={faq.open}
        onClick={() => toggleFAQ(faq.id)}
      >

        <h2 className={styles.faq__question}>
          <span>
            {faq.title}
          </span>
          {faq.open
            ? <i className="icon-x" />
            : <i className="icon-open" />}
        </h2>
      </Link>

      <div className={`faq-answer ${faq.open ? 'block' : 'none'}`}>
        <p>{faq.description}</p>
        {faq.link && (
        <div className={styles.page__contents__paragraph__links}>
          <span className={styles.page__contents__paragraph__links__link}>
            → A lire aussi :
            <Link href={faq.link}>
              {' '}
              {faq.linkSubtitle}
            </Link>
          </span>
        </div>
        )}
      </div>
    </li>
  );
}

export default FaqElements;
