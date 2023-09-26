import { useState } from "react";
import UserTypeSelection from "./step/UserTypeSelection";
import PersonalOrBusinessInfo from "./step/PersonalOrBusinessInfo";
import AdditionalInfo from "./step/AdditionalInfo";
// import UserTypeSelection from "./UserTypeSelection";
// import PersonalOrBusinessInfo from "./PersonalOrBusinessInfo";
// import AdditionalInfo from "./AdditionalInfo";

export default function OnlineQuoteRequest() {
  const [currentStep, setCurrentStep] = useState(1);

  // États pour les données du formulaire
  const [userType, setUserType] = useState('');
  const [individualInfo, setIndividualInfo] = useState({
    lastName: "",
    firstName: "",
  });
  const [businessInfo, setBusinessInfo] = useState({
    contactName: "",
    company: "",
    siretNumber: "",
  });
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phoneNumber: "",
    serviceType: [],
    surface: 0,
    callback: false,
    callbackDate: "",
  });

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    if (currentStep === 1) {
      // Utilisez la logique spécifique à l'étape 1 ici
      setUserType(type === 'checkbox' ? checked : value);
    } else if (currentStep === 2) {
      // Utilisez la logique spécifique à l'étape 2 ici
      // Assurez-vous d'utiliser le bon état ou les bonnes fonctions
    } else if (currentStep === 3) {
      // Utilisez la logique spécifique à l'étape 3 ici
      // Assurez-vous d'utiliser le bon état ou les bonnes fonctions
      setContactInfo((prevState) => ({
        ...prevState,
        form: {
          ...prevState.form,
          [name]: type === 'checkbox' ? checked : value,
        },
      }));
    }
    
  };
  
  return (
    <div>
      <h2>Online Quote Request - Step {currentStep}</h2>
      <form>
        {currentStep === 1 && (
          <UserTypeSelection
            userType={userType}
            onChange={handleChange}
        />
        )}

        {currentStep === 2 && (
          <PersonalOrBusinessInfo
            userType={userType}
            individualInfo={individualInfo}
            businessInfo={businessInfo}
            onChange={handleChange}
            formData={userType === 'individual' ? individualInfo : businessInfo}
          />
        )}

        {currentStep === 3 && (
          <AdditionalInfo
            formData={contactInfo}
            onChange={handleChange}
            typeService={contactInfo.serviceType}
            setTypeService={setContactInfo}
            />
        )}

        {/* Boutons de navigation entre les étapes */}
        {currentStep > 1 && (
          <button type="button" onClick={handlePreviousStep}>
            Previous
          </button>
        )}
        {currentStep < 3 && (
          <button type="button" onClick={handleNextStep}>
            Next
          </button>
        )}
        {currentStep === 3 && (
          <button type="submit">Submit Request</button>
        )}
      </form>
    </div>
  );
}
