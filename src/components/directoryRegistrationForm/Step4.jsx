import React, { useState } from 'react';

export default function Step4({ formData, setFormData, onNext }) {
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const regexPattern = /^(https:\/\/)/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.value.length > 2
       || e.target.value.length < 500
       || !regexPattern.test(e.target.value)) {
      onNext();
      setError(false);
    }

    setError(true);
  };

  return (
    <div>
      <h2>Étape 4 : Informations personnelles</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">
          {error && (
          <p>
            <i className="icon-error" />
            Veuillez entrez un lien valide (https://www.exemple.com)
          </p>
          )}
          Site web
          <input
            type="text"
            title="Location"
            name="siteWeb"
            placeholder="Exemple : https://www.exemple.com"
            value={formData.siteWeb}
            minLength={2}
            maxLength={120}
            onChange={handleInputChange}
            onBlur={(e) => {
              handleSubmit(e);
            }}
            required
          />
        </label>
      </form>

    </div>
  );
}
