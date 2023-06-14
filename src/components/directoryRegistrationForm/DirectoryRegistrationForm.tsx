import { useState } from 'react';
import styles from './DirectoryRegistration.module.scss';

import Page1 from './Page1';
import Page2 from './Page2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';

function FormContainer({ article }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formHistory, setFormHistory] = useState([1]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    postalCode: '',
    siteWeb: '',
    service: '',
    subject: 'Webmaster',

  });

  const formPages = [
    {
      id: 1,
      component: Page1,
      articles: null,
    },
    {
      id: 2,
      component: Page2,
      articles: null,
    },
    {
      id: 3,
      component: Step3,
      articles: null,
    },
    {
      id: 4,
      component: Step4,
      articles: null,
    },
    {
      id: 5,
      component: Step5,
      articles: null,
    },
    {
      id: 6,
      component: Step6,
      articles: article,
    },
    {
      id: 7,
      component: Step7,
      articles: null,
    },
  ];

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const handleNext = () => {
    const nextStep = currentStep + 1;
    setFormHistory((prevHistory) => {
      const updatedHistory = [...prevHistory];
      const existingIndex = updatedHistory.findIndex((step) => step === nextStep);
      if (existingIndex !== -1) {
        updatedHistory[existingIndex] = nextStep;
      } else {
        updatedHistory.push(nextStep);
      }
      return updatedHistory;
    });
    setCurrentStep(nextStep);
  };

  console.log(formHistory);
  const handlePrevious = () => {
  };

  const currentPage = formPages.find((page) => page.id === currentStep);

  return (
    <>
      {currentPage && (
        <currentPage.component
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
          curentStep={currentPage.id}
          articles={currentPage.articles}

        />
      )}
      <nav className={styles.directoryRegistration__nav}>
        <ul role="menu" className={styles.directoryRegistration__nav__list}>
          {formPages.map((step) => (
            <li
              role="menuitem"
              key={step.id}
              tabIndex={step.id > currentStep ? -1 : 0}
              className={`${step.id === currentStep ? styles['directoryRegistration__nav__list--active'] : ''} ${styles['directoryRegistration__nav__list--item']} ${formHistory.includes(step.id) ? styles['directoryRegistration__nav__list--validated'] : ''}`}
              onKeyDown={() => handleStepClick(step.id)}
              onClick={() => (
                formHistory.includes(step.id)
                  ? handleStepClick(step.id) : null
              )}
            >
              {step.id}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default FormContainer;
