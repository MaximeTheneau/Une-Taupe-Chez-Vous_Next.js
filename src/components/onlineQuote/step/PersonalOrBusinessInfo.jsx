export default function PersonalOrBusinessInfo({
  userType,
  onChange,
  formData,
}) {
  return (
    <>
      <h2>Informations {userType === 'individual' ? 'Personnelles' : 'd\'Entreprise'}</h2>
      <div className="form-group">
        <label>Nom {userType === 'individual' ? 'Complet' : 'de l\'Entreprise'}</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
        />
      </div>
      {userType !== 'individual' && (
        <div className="form-group">
          <label>Numéro de SIRET</label>
          <input
            type="text"
            name="siret"
            value={formData.siret}
            onChange={onChange}
          />
        </div>
        )}
      <div className="form-group">
        <label>Adresse {userType === 'individual' ? 'Personnelle' : 'de l\'Entreprise'}</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={onChange}
        />
      </div>
        <div className="form-group">
            <label>Code Postal</label>
            <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={onChange}
            />
        </div>
        <div className="form-group">
            <label>Ville</label>
            <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            />
        </div>
        <div className="form-group">
            <label>Téléphone</label>
            <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            />
        </div>
        <div className="form-group">
            <label>Email</label>
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            />
        </div>
    </>
  );
}
