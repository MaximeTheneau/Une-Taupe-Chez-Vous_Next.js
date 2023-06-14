import React, { useState } from 'react';

export default function Step5({ formData, setFormData, onNext }) {
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
    const valueLength = e.target.value.length;
    if (valueLength >= 10 && valueLength <= 120) {
      onNext();
      setError(false);
    }

    setError(true);
  };

  return (
    <div>
      <h2>Étape 5 : Informations personnelles</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">
          {error && (
          <p>
            <i className="icon-error" />
            Veuillez selectionner un service
          </p>
          )}
          Service
          <input
            type="text"
            title="Service"
            name="service"
            placeholder="Exemple : Taupier professionnel, Dératisation, Désinsectisation, Désinfection, ..."
            // maxLength={120}
            // minLength={10}
            value={formData.service}
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
