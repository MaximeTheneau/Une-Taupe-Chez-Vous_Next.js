import React, { useState } from 'react';
import { useRouter } from 'next/router';

import formMiddleware from '../../../middleware/Middleware';
import Confirmation from '../../modal/Confirmation';
import styles from '../DirectoryRegistration.module.scss';

export default function Step7({
  formData, setFormData,
}) {
  const router = useRouter();

  const [modal, setModal] = useState({
    title: '',
    message: '',
    toggleModal: false,
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
      location: '',
      siteWeb: '',
      service: '',
      directory: null,
      name: '',
      email: '',
      subject: 'Demande de devis',
    }));

    setTimeout(
      () => {
        router.push('/');
      },
      3000,
    );
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
    formMiddleware(req, apiPath, handleResponse200, handleResponseError);
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
      <div className={styles.directoryRegistration}>
        <h2>Confirmation</h2>
        <form onSubmit={handleSubmit}>
          <h2>Confirmation de votre inscription</h2>
          <h3>
            Entreprise :
            <span className={styles.companyName}>
              {' '}
              {formData.name}
            </span>
          </h3>
          <p>
            <strong>Localisation :</strong>
            {' '}
            :
            {formData.location}
            (
            {formData.postalCode}
            )
            <br />
            <strong>Site web :</strong>
            {' '}
            <span dangerouslySetInnerHTML={{
              __html: formData.siteWeb.replace(
                /(https?:\/\/)([^\s]+)/g,
                '<a href="$1$2" target="_blank">$2</a>',
              ),
            }}
            />
            <br />
            <strong>Services :</strong>
            {' '}
            {formData.service}
            <br />
            <strong>Annuaire :</strong>
            {' '}
            {formData.directory}
            <br />
            <strong>Adresse email :</strong>
            {' '}
            {formData.email}
            <br />
          </p>
          <div className="contact-form_button">
            <button id="confirmation" type="submit" title="Envoyer l'inscription">
              Envoyer
            </button>
          </div>
        </form>
      </div>

    </>
  );
}
