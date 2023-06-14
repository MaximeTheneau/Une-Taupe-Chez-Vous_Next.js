import { useState } from 'react';
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
    location: '',
    postalCode: '',
    siteWeb: '',
    services: '',
    annuaire: '',
    email: '',
    // Initialiser les données du formulaire
    // ...
  });

  // const handleStepClick = (step) => {
  //   setCurrentStep(step);
  // };
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

  const handlePrevious = () => {
  };

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);

  //   // Soumettre les données du formulaire
  //   // ...
  // };

  const currentPage = formPages.find((page) => page.id === currentStep);

  return (
    <div>
      {currentPage && (
      <currentPage.component
        formData={formData}
        setFormData={setFormData}
        onNext={handleNext}
        onStepClick={handleStepClick}
        onPrevious={handlePrevious}
        curentStep={currentPage.id}
        articles={currentPage.articles}

      />
      )}
      <ul role="menu">
        {formHistory.map((step, index) => (
          <li
            role="menuitem"
            key={step}
            className={step === currentStep ? 'active' : ''}
            onKeyDown={() => handleStepClick(step)}
            onClick={() => handleStepClick(step)}
          >
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormContainer;
