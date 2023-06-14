import React, { useState } from 'react';

function Page1({
  formData, setFormData, onNext, onStepClick, curentStep,
}) {
  const [error, setError] = useState(null);

  console.log(curentStep);
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
    if (name.value.length > 3 || name.value.length < 120) {
      onNext();
    }
    setError(false);
    console.log(error);
  };

  return (
    <div>
      <h2>Étape 1 : Informations personnelles</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          {error && (
          <p>
            <i className="icon-error" />
            Veuillez entrez un nom d&apos;entreprise valide
          </p>
          )}
          Raison sociale
          <input
            placeholder="nom de l'entreprise"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            maxLength={120}
            onBlur={(e) => {
              if (e.target.value.length < 3 || e.target.value.length >= 120) {
                console.log('error');
                setError(true);
              } else {
                setError(false);
                onNext();
              }
            }}
          />
        </label>
      </form>
    </div>
  );
}

export default Page1;
