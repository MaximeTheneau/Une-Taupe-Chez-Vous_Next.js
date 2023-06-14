import React, { useState } from 'react';

export default function Step6({
  formData, setFormData, onNext, articles,
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
    const valueLength = e.target.value;
    if (articles.filter((article) => article.id === valueLength)) {
      onNext();
      setError(false);
    }
    setError(true);
  };

  return (
    <div>
      <h2>Étape 5 : Informations personnelles</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="directory">
          Choisissez un annuaire
          {error && (
          <p>
            <i className="icon-error" />
            Veuillez choisir un annuaire
          </p>
          )}
          <select
            className="contact-form-input"
            name="directory"
            value={formData.directory}
            onChange={handleInputChange}
            onBlur={(e) => {
              handleSubmit(e);
            }}
            required

          >
            <option disabled selected> Sélectionner un annuaire</option>
            {articles.map((article) => (
              <option key={article.id} value={article.id}>{article.title}</option>
            ))}
          </select>
        </label>
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
