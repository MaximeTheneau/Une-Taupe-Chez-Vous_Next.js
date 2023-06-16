import React, { useState } from 'react';
import styles from '../DirectoryRegistration.module.scss';

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
    const { email } = e.target;
    if (regex.test(email.value)
     && email.value.length < 500) {
      setError(false);
      onNext();
    }
    setError(true);
  };

  return (
    <div className={styles.directoryRegistration}>
      <h2>Étape 3</h2>
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
            placeholder="Exemple: xemple@email.com"
            value={formData.email}
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
