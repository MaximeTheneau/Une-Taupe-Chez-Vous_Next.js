import React, { useState } from 'react';
import styles from '../DirectoryRegistration.module.scss';

function Step1({
  formData, setFormData, onNext, curentStep,
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
    const { name } = e.target;
    if (name.value.length >= 2 && name.value.length < 120) {
      onNext();
      setError(false);
    }

    setError(true);
  };

  return (
    <div className={styles.directoryRegistration}>
      <h2>Étape 1</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          {error && (
          <p>
            <i className="icon-error" />
            Veuillez entrez un nom d&apos;entreprise valide (entre 2 et 120 caractères)
          </p>
          )}
          Raison sociale
          <input
            placeholder="Exemple: Une Taupe Chez Vous"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            maxLength={120}
            minLength={2}
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

export default Step1;
