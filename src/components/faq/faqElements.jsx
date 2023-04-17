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
      className={styles.faqs}
      onClick={() => toggleFAQ(faq.id)}
    >
      <h2 className="faq-question">
        {faq.title}
        {faq.open
          ? <i className="icon-x" />
          : <i className="icon-open" />}
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
