function FaqElements({ faq, toggleFAQ }) {
  return (
    <>
      <div
        onClick={() => toggleFAQ(faq.id)}
        role="presentation"
        className="faq-question"
      >
        {faq.question}
        {faq.open
          ? <i className="icon-x" />
          : <i className="icon-facebook" />}
      </div>
      <div
        className={`faq-answer ${faq.open ? 'block' : 'none'}`}
      >
        {faq.answer}
      </div>
    </>
  );
}

export default FaqElements;
