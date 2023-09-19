import { useState } from 'react';
import FaqElements from './faqElements';

/**
 * Component to render a list of FAQs
 * @param {Object} faq - An object containing an array of FAQ objects
 * @returns {JSX.Element} - Returns a JSX element representing the list of FAQs
 */
export default function Faq({ faq }) {
  // Set initial state for the list of FAQs
  const [faqs, setFaqs] = useState(faq.listPosts);

  /**
   * Function to toggle the "open" state of a FAQ
   * @param {number} index - The index of the FAQ to toggle
   * @returns {void}
   */
  const toggleFAQ = (index) => {
    setFaqs((prevFaqs) => prevFaqs.map((item, i) => ({
      ...item,
      open: i === index - 1 ? !item.open : false,
    })));
  };
  // Render each FAQ as a FaqElements component
  return (
    <ul role="menu">
      {faqs.map((item) => (
        <FaqElements faq={item} index={item.id} key={item.id} toggleFAQ={toggleFAQ} />
      ))}
    </ul>
  );
}
