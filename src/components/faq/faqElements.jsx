import Link from 'next/link';
import styles from './Faq.module.scss';

/**
Faq element component
@param {Object} faq - Faq data
@param {Function} toggleFAQ - Function to toggle faq open state
@see Faq.module.scss
*/
function FaqElements({ faq, toggleFAQ }) {
  console.log(faq);
  return (
    <li
      key={faq.id}
      role="menuitem"
      className={styles.faqs}
    >
      <h2
        className={styles.faq__question}
        onClick={() => toggleFAQ(faq.id)}
      >
        <Link 
          href={`/Foire-aux-questions#${faq.id}`} 
          role='button'
          aria-expanded={faq.open}
          >
            <span>
              {faq.title}
            </span>
        {faq.open
          ? <i className="icon-x" />
          : <i className="icon-open" />}
        </Link>
      </h2>
      <p
        className={`faq-answer ${faq.open ? 'block' : 'none'}`}
      >
        {faq.description}
      </p>
    </li>
  );
}

export default FaqElements;
