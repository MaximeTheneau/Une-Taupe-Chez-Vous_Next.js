import { useState } from 'react';
import styles from './DirectoryRegistration.module.scss';

import Step1 from './step/Step1';
import Step2 from './step/Step2';
import Step3 from './step/Step3';
import Step4 from './step/Step4';
import Step5 from './step/Step5';
import Step6 from './step/Step6';
import Step7 from './step/Step7';

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
      component: Step1,
      articles: null,
    },
    {
      id: 2,
      component: Step2,
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
