import React, { useState } from 'react';
import Page1 from './Page1';
import Page2 from './Page2';

export default function Step7({
  formData, setFormData, onNext, articles, onStepClick,
}) {
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Soumettre les données du formulaire
    // ...
  };

  return (
    <div>
      <h2>Confirmation de votre inscription</h2>
      <form onSubmit={handleSubmit}>
        <h2>
          Entreprise :
          {formData.name}
        </h2>
        <p>
          <strong>Localisation :</strong>
          {' '}
          :
          {formData.location}
          (
          {formData.postalCode}
          )
          <br />
          <strong>Site web :</strong>
          {formData.website}
          <br />
          <strong>Services :</strong>
          {formData.services}
          <br />
          <strong>Annuaire :</strong>
          {formData.directory}
          <br />
          <strong>Adresse email :</strong>
          {formData.email}
          <br />
        </p>
        <div className="contact-form_button">
          <button type="submit">
            Envoyer
            <i className="icon-paper-plane" />
          </button>
        </div>
      </form>

    </div>
  );
}
