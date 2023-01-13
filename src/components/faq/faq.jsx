import { useState } from 'react';
import FaqElements from './faqElements';

export default function Faq() {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'How many programmers does it take to screw a lightbulb?',
      answer:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lorem eu dolor rhoncus, at scelerisque ligula gravida. Sed porta id mi sit amet convallis. Etiam iaculis massa sit amet lacus blandit sodales. Nulla ultrices velit a diam placerat congue. Pellentesque iaculis, ipsum quis eleifend dapibus, est dui eleifend ante, quis fermentum mi ligula quis nisl. Ut et ex dui. Integer id venenatis quam.',
      open: false,
    },
    {
      id: 2,
      question: 'Who is the most awesome person?',
      answer: 'You! The viewer!',
      open: false,
    },
    {
      id: 3,
      question:
            'How many questions does it take to makes a succesful FAQ Page?',
      answer: 'This many!',
      open: false,
    },
  ]);

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
