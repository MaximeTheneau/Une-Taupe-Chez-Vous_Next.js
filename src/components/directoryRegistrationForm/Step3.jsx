import React, { useState } from 'react';

export default function Step3({ formData, setFormData, onNext }) {
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const regex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (regex.test(e.target.value)
     && e.target.value.length < 500) {
      setError(false);
      onNext();
    }
    setError(true);
  };

  return (
    <div>
      <h2>Étape 3 : Informations personnelles</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">
          email
          {error && (
          <p>
            <i className="icon-error" />
            Veuillez entrez un email valide
          </p>
          )}
          <input
            type="email"
            title="Email"
            minLength={2}
            maxLength={500}
            name="email"
            placeholder="exemple@email.com"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={(e) => {
              handleSubmit(e);
            }}
            required
          />
        </label>
        {/* Ajoutez d'autres champs de formulaire selon vos besoins */}
      </form>

    </div>
  );
}
