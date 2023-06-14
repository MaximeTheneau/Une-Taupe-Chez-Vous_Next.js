import React, { useState } from 'react';
import styles from './DirectoryRegistration.module.scss';

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
    const { service } = e.target;
    if (service.value.length >= 10 && service.value.length < 120) {
      onNext();
      setError(false);
    }

    setError(true);
  };

  return (
    <div className={styles.directoryRegistration}>
      <h2>Étape 5</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">
          {error && (
          <p>
            <i className="icon-error" />
            Veuillez saisir un service valide (entre 10 et 120 caractères)
          </p>
          )}
          Service
          <input
            type="text"
            title="Service"
            name="service"
            placeholder="Exemple : Taupier professionnel, Dératisation, Désinsectisation, Désinfection, ..."
            maxLength={120}
            minLength={9}
            value={formData.service}
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
