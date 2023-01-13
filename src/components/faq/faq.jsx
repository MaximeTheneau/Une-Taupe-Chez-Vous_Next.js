import { useState } from 'react';
import FaqElements from './faqElements';

export default function Faq({ faq }) {
  const [faqs, setFaqs] = useState(faq);
  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq) => {
        if (faq.id === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      }),
    );
  };
  return (
    <>
      {faqs.map((faq) => (
        <FaqElements faq={faq} index={faq.id} key={faq.id} toggleFAQ={toggleFAQ} />
      ))}
    </>
  );
}
