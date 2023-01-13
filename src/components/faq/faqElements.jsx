import styles from './Faq.module.scss';

function FaqElements({ faq, toggleFAQ }) {
  return (
    <div
      className={styles.faqs}
      onClick={() => toggleFAQ(faq.id)}
      role="presentation"
    >
      <h2 className="faq-question">
        {faq.question}
        {faq.open
          ? <i className="icon-x" />
          : <i className="icon-open" />}
      </h2>
      <p
        className={`faq-answer ${faq.open ? 'block' : 'none'}`}
      >
        {faq.answer}
      </p>
    </div>
  );
}

export default FaqElements;
