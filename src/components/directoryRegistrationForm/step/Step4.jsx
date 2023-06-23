import React, { useState } from 'react';
import styles from '../DirectoryRegistration.module.scss';

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
    const { siteWeb } = e.target;
    if (siteWeb.value.length > 2
       && siteWeb.value.length < 500
       && regexPattern.test(siteWeb.value)) {
      onNext();
      setError(false);
    }

    setError(true);
  };

  return (
    <div className={styles.directoryRegistration}>
      <h2>Étape 4</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">
          {error && (
          <p>
            <i className="icon-error" />
            Veuillez entrez un lien valide (Exemple : https://www.exemple.com)
          </p>
          )}
          Site web
          <input
            type="text"
            title="Location"
            name="siteWeb"
            placeholder="Exemple : https://www.exemple.com"
            value={formData.siteWeb}
            minLength={7}
            maxLength={120}
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
