import { useState } from 'react';
import styles from './DirectoryRegistration.module.scss';
import Middleware from '../../middleware/Middleware';
import Confirmation from '../modal/Confirmation';

export default function DirectoryRegistrationForm({ article }) {
  const [modal, setModal] = useState({
    title: '',
    message: '',
    toggleModal: false,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    postalCode: '',
    siteWeb: '',
    service: '',
    directory: '',
    directoryOther: '',
    subject: 'Webmaster',

  });

  const handleResponseError = (error) => {
    setModal({
      title: 'Oups !',
      message: error,
      toggleModal: true,
    });
  };

  const handleResponse200 = () => {
    setModal({
      title: 'Merci !',
      message: 'On vous confirmeras votre inscriptiondans les plus brefs délais',
      toggleModal: true,
    });

    setFormData((prevData) => ({
      ...prevData,
      postalCode: '',
      name: '',
    }));
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setModal({
      title: 'Envoi en cours',
      message: 'Merci de patienter',
      toggleModal: true,
    });
    const req = formData;
    const apiPath = 'contact&directory';
    Middleware(req, apiPath, handleResponse200, handleResponseError);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <Confirmation
        title={modal.title}
        message={modal.message}
        toggleModal={modal.toggleModal}
        onClick={() => setModal({
          title: '',
          message: '',
          toggleModal: false,
        })}
      />
      <form className={styles.directoryRegistration} onSubmit={handleSubmit}>
        <label htmlFor="name">
          Raison sociale
          <input
            placeholder="Ex: Une Taupe Chez Vous"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            maxLength={120}
            minLength={2}
          />
        </label>
        <label htmlFor="location">
          Localisation
          <input
            type="text"
            title="Location"
            name="location"
            placeholder="Ex : Paris"
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
            placeholder="Ex : 78"
            value={formData.postalCode}
            minLength={2}
            maxLength={2}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="email">
          email
          <input
            type="email"
            title="Email"
            minLength={2}
            maxLength={500}
            name="email"
            placeholder="Ex: exemple@email.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="siteWeb">
          Site web
          <input
            type="text"
            title="siteWeb"
            name="siteWeb"
            placeholder="Exemple : https://www.exemple.com"
            value={formData.siteWeb}
            minLength={7}
            maxLength={120}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="service">
          Service
          <input
            type="text"
            title="Service"
            name="service"
            placeholder="Ex : Taupier professionnel, Dératisation, Désinsectisation, Désinfection, ..."
            maxLength={120}
            minLength={9}
            value={formData.service}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="directory">
          Choisissez un annuaire
          <select
            className="contact-form-input"
            name="directory"
            value={formData.directory}
            onChange={handleInputChange}
            required
          >
            <option value=""> Sélectionner un annuaire</option>
            <option value="autre">Proposer un annuaire</option>
            {article.map((articleList) => (
              <option key={articleList.id} value={articleList.id}>{articleList.title}</option>
            ))}
          </select>
          {formData.directory === 'autre' && (
          <input
            type="text"
            title="directoryOther"
            name="directoryOther"
            placeholder="Ex : Annuaire des dératiseurs, Annuaire des piégeurs, ..."
            value={formData.directoryOther}
            maxLength={120}
            minLength={2}
            onChange={handleInputChange}
            required
          />
          )}
        </label>
        <button className="button" id="confirmation" type="submit" title="Envoyer l'inscription">
          Envoyer
          <i className="icon-paper-plane" />
        </button>
      </form>
    </>

  );
}
