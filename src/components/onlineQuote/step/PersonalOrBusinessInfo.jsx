export default function PersonalOrBusinessInfo({
  userType,
  onChange,
  formData,
}) {
  return (
    <>
      <h2>
        Informations
        {' '}
        {userType === 'individual' ? 'Personnelles' : 'd\'Entreprise'}
      </h2>
      <div className="form-group">
        <label htmlFor="name">
          Nom
          {' '}
          {userType === 'individual' ? 'Complet' : 'de l\'Entreprise'}
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
        />
      </div>
      {userType !== 'individual' && (
        <div className="form-group">
          <label htmlFor="siret">
            Numéro de SIRET
            <input
              type="text"
              name="siret"
              value={formData.siret}
              onChange={onChange}
            />
          </label>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="adress">
          Adresse
          {' '}
          {userType === 'individual' ? 'Personnelle' : 'de l\'Entreprise'}
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="zipCode">
          Code Postal
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={onChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="city">
          Ville
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="phone">
          Téléphone
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
          />
        </label>
      </div>
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
