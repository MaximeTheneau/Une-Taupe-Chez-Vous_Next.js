import React from 'react';

export default function AdditionalInfo({
  formData, onChange, typeService, setTypeService,
}) {
  const formatSurface = () => {
    if (formData.surface >= 1000) {
      return 'Plus de 1000 m²';
    }
    return `Environ ${formData.surface} m²`;
  };

  const handleTypeServiceChange = (event) => {
    const { value } = event.target;

    setTypeService((prevTypeService) => {
      if (Array.isArray(prevTypeService)) {
        if (prevTypeService.includes(value)) {
          return prevTypeService.filter((type) => type !== value);
        }
        return [...prevTypeService, value];
      }
      // Si prevTypeService n'est pas déjà un tableau, initialisez-le avec [value]
      return [value];
    });
  };

  return (
    <>
      <h2>Informations complémentaires</h2>
      <div className="form-group">
        <p>Choix du service *:</p>
        <label htmlFor="typeService">
          <input
            type="checkbox"
            name="typeService"
            value="Taupe"
            checked={typeService && typeService.includes('Taupe')}
            onChange={handleTypeServiceChange}
          />
          {' '}
          Taupe
        </label>
        <label htmlFor="typeService">
          <input
            type="checkbox"
            name="typeService"
            value="Fouine"
            checked={typeService && typeService.includes('Fouine')}
            onChange={handleTypeServiceChange}
          />
          {' '}
          Fouine
        </label>
        <label htmlFor="typeService">
          <input
            type="checkbox"
            name="typeService"
            value="Ragondin"
            checked={typeService && typeService.includes('Ragondin')}
            onChange={handleTypeServiceChange}
          />
          {' '}
          Ragondin
        </label>
        <label htmlFor="typeService">
          <input
            type="checkbox"
            name="typeService"
            value="Autre"
            checked={typeService && typeService.includes('Autre')}
            onChange={handleTypeServiceChange}
          />
          {' '}
          Je ne sais pas / Autre
        </label>
      </div>
      <label htmlFor="typeService">
        Surface à traiter :
        <input
          type="range"
          id="surface"
          name="surface"
          min="0"
          max="1000" // Ajustez la valeur maximale selon vos besoins
          step="50" // Ajustez l'incrément selon vos besoins
          value={formData.surface}
          onChange={onChange}
        />
        {formatSurface()}
      </label>
      <div className="form-group">
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
          />
        </label>
      </div>
    </>
  );
}
