import React, { useState } from 'react';

function Page2({
  formData, setFormData, onNext, onStepClick, curentStep,
}) {
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.value.length !== 2) {
      onNext();
    }
    setError(false);
  };

  return (
    <div>
      <h2>Étape 2 : Informations personnelles</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">
          Localisation
          <input
            type="text"
            title="Location"
            name="location"
            placeholder="Exemple : Paris"
            value={formData.location}
            minLength={2}
            maxLength={120}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="postalCode">
          {error && (
          <p>
            <i className="icon-error" />
            Veuillez entrez un code postal valide (2 chiffres)
          </p>
          )}
          Code postal
          <input
            type="text"
            title="Location"
            name="postalCode"
            placeholder="Exemple : 78"
            value={formData.postalCode}
            minLength={2}
            maxLength={2}
            onChange={handleInputChange}
            onBlur={(e) => {
              if (e.target.value.length !== 2) {
                setError(true);
              } else {
                setError(false);
                onNext();
              }
            }}
            required
          />
        </label>
      </form>
    </div>
  );
}

export default Page2;
