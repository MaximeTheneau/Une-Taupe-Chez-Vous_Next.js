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
      <button
        type="button"
        onClick={() => toggleFAQ(faq.id)}
        className={styles.faq__question}
      >
        {faq.title}
        {faq.open
          ? <i className="icon-x" />
          : <i className="icon-open" />}
      </button>
      <p
        className={`faq-answer ${faq.open ? 'block' : 'none'}`}
      >
        {faq.description}
      </p>
    </li>
  );
}

export default FaqElements;
