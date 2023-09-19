import React, { useState } from 'react';
import styles from '../DirectoryRegistration.module.scss';

function Step2({
  formData, setFormData, onNext,
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
    const { location, postalCode } = e.target;
    if (location.value.length > 3 && location.value.length < 120 && postalCode.value.length === 2) {
      onNext();
      setError(false);
    }

    setError(true);
  };

  return (
    <div className={styles.directoryRegistration}>
      <h2>Étape 2 : Informations personnelles</h2>

      <form onSubmit={handleSubmit}>
        {error && (
        <p>
          <i className="icon-error" />
          Veuillez entrez un code postal valide (2 chiffres)
          et une localisation valide (entre 2 et 120 caractères)
        </p>
        )}
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
            required
          />
        </label>
        <div className="contact-form_button">
          <button type="submit">
            Suivant
          </button>
        </div>
      </form>
    </div>
  );
}

export default Step2;
