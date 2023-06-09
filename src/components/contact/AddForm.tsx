import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import formMiddleware from '../../middleware/middleware';
import Confirmation from '../modal/Confirmation';
import styles from './Contact.module.scss';
import ContactAbout from './ContactAbout';
import Select from './form/Select';
import Input from './form/Input';
import Button from '../button/button';

type Form = {
  name: string;
  email: string;
  postalCode: string;
  location: string;
  siteWeb: string;
  service: string;
  subject: string;
  directory: number | null;
};

type Modal = {
  title: string;
  message: string;
  toggleModal: boolean;
};

interface ContactFormState {
  form: Form;
  textArea: number;
  confirmationName: string | null;
  confirmationEmail: string | null;
  confirmationService: string | null;
  confirmationSubject: string | null;
  confirmationCodePostal: string | null;
  confirmationLocation: string | null;
  confirmationDirectory: string | null;
  
  modal: Modal;
}

const initialContactFormState: ContactFormState = {
  form: {
    name: '',
    email: '',
    location: '',
    postalCode: '',
    siteWeb: '',
    service: '',
    subject: 'Webmaster',
    directory: null,
  },
  textArea: 1,
  confirmationName: null,
  confirmationEmail: null,
  confirmationService: null,
  confirmationSubject: null,
  confirmationCodePostal: null,
  confirmationLocation: null,
  confirmationDirectory: null,
  modal: {
    title: '',
    message: '',
    toggleModal: false,
  },
};


// == Composant
export default function AddForm({ article }) {


  const router = useRouter();
  const [state, setState] = useState(initialContactFormState);

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const trows = e.target.value.split('\n').length - 1 === 0 ? 1 : e.target.value.split('\n').length - 1;
    setState((prevState) => ({
      ...prevState,
      textArea: trows,
      form: {
        ...prevState.form,
        message: e.target.value,
        confirmationMessage: true,
      },
    }));
  };

  const regex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexPattern = /^(https:\/\/)/;
  function classErrorOrConfirmation(message) {
    if (message === true) {
      return (<i className="icon-confirmation" />);
    }
    if (message === false) {
      return (<i className="icon-error" />);
    }
    if (message === 'https') {
      return (<p>
        <i className="icon-error" />
        Veuillez entrer une url valide (https://)
      </p>);
    }
    if (message === 'postalCode') {
      return (<p>
        <i className="icon-error" />
        Veuillez entrer un code postal valide (2 chiffres)
      </p>);
    }
    if (message === 'minLength2') {
      return (<p>
        <i className="icon-error" />
        Veuillez entrer au moins 2 caractères
      </p>);
    }
    if (message === 'minLength15') {
      return (<p>
        <i className="icon-error" />
        Veuillez entrer au moins 15 caractères
      </p>);
    }
    if (message === 'maxLength120') {
      return (<p>
        <i className="icon-error" />
        Veuillez entrer moins de 120 caractères
      </p>);
    }
    return '';
  }

  const changeField = (value, field) => {
    setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [field]: value,
      },
    }));
  };

  const handleResponse200 = () => {
    setState({
      ...state,
      form: {
        name: '',
        email: '',
        message: '',
        subject: 'Demande de devis',
      },
      modal: {
        title: 'Merci !',
        message: 'On vous répondra au plus vite',
        toggleModal: true,
      },
    });

    setTimeout(
      () => {
        router.push('/');
      },
      3000,
    );
  };

  const handleResponseError = (error) => {
    setState({
      ...state,
      modal: {
        title: 'Oups !',
        message: error,
        toggleModal: true,
      },
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setState({
      ...state,
      modal: {
        title: 'Envoi en cours',
        message: 'Merci de patienter',
        toggleModal: true,
      },
    });
    const req = state.form;
    const apiPath = 'contact&directory';
    formMiddleware(req, apiPath, handleResponse200, handleResponseError);
  };

  return (
    <>
      <Confirmation
        title={state.modal.title}
        message={state.modal.message}
        toggleModal={state.modal.toggleModal}
        onClick={() => setState({
          ...state,
          modal: {
            title: '',
            message: '',
            toggleModal: false,
          },
        })}
      />
      <div className={styles.contact}>
        <form className={styles.contact__block} onSubmit={handleSubmit}>
          {/* --Email-- */}
          <div className={styles.contact__input}>
            <label htmlFor="email" className={styles.contact__label}>Votre email*</label>
            {classErrorOrConfirmation(state.confirmationEmail)}
            <Input
              type="email"
              title="Email"
              value={state.form.email}
              placeholder="exemple@email.com"
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'email')}
              onBlur={(e: ChangeEvent<HTMLInputElement>) => (
                regex.test(e.target.value)
                  ? setState({ ...state, confirmationEmail: true })
                  : setState({ ...state, confirmationEmail: false })
              )}
            />
          </div>
          {/* --Nom-- */}
          <div className={styles.contact__input}>
            <label htmlFor="name" className={styles.contact__label}>Votre Société/Entreprise*</label>
            {classErrorOrConfirmation(state.confirmationName)}
            <Input
              type="text"
              title="Nom"
              placeholder="Exemple : Une Taupe Chez Vous"
              value={state.form.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'name')}
              onBlur={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length < 2) {
                  setState({ ...state, confirmationName: 'minLength2' });
                }
                if (e.target.value.length >= 120) {
                  setState({ ...state, confirmationName: 'maxLength120' });
                }
                else {
                  setState({ ...state, confirmationName: true });
                }
              }}
            />
          </div>
          {/* --Location-- */}
          <div className={styles.contact__input}>
            <label htmlFor="location" className={styles.contact__label}>Votre localité*</label>
            {classErrorOrConfirmation(state.confirmationLocation)}
            <Input
              type="text"
              title="Location"
              placeholder="Exemple : Paris"
              value={state.form.location}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'location')}
              onBlur={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length < 2) {
                  setState({ ...state, confirmationLocation: 'minLength2' });
                }
                else {
                  setState({ ...state, confirmationLocation: true });
                }
              }}
            />
          </div>
              
          {/* --postalCode-- */}
          <div className={styles.contact__input}>
            <label htmlFor="subject" className={styles.contact__label}>Code Postal*</label>
          {classErrorOrConfirmation(state.confirmationCodePostal)}
          <input
            type="number"
            className="contact-form-input"
            name="postalCode"
            value={state.form.postalCode}
            onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'postalCode')}
            onBlur={(e: ChangeEvent<HTMLInputElement>) => (
              e.target.value.length === 2
                ? setState({ ...state, confirmationCodePostal: true })
                : setState({ ...state, confirmationCodePostal: 'postalCode' })
            )}
            placeholder="Exemple : 75"
          />
        </div>
          {/* --Site Web-- */}
          <div className={styles.contact__input}>
            <label htmlFor="siteWeb" className={styles.contact__label}>Votre site web*</label>
            {classErrorOrConfirmation(state.confirmationSiteWeb)}
            <input
              type="text"
              title="Site Web"
              placeholder="Exemple : https//:une-taupe-chez-vous.fr"
              value={state.form.siteWeb}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'siteWeb')}
              onBlur={(e: ChangeEvent<HTMLInputElement>) => (
                regexPattern.test(e.target.value)
                  ? setState({ ...state, confirmationSiteWeb: true })
                  : setState({ ...state, confirmationSiteWeb: 'https' })
              )}
            />
          </div>
          {/* --Service-- */}
          <div className={styles.contact__input}>
            <label htmlFor="service" className={styles.contact__label}>Votre service*</label>
            {classErrorOrConfirmation(state.confirmationService)}
            <input
              type="text"
              title="Service"
              placeholder="Exemple : Taupier professionnel, Dératisation, Désinsectisation, Désinfection, ..."
              value={state.form.service}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>{
                if (e.target.value.length >= 120) {
                  setState({ ...state, confirmationService: 'maxLength120' });
                }
                else {
                  setState({ ...state, confirmationService: true });
                  changeField(e.target.value, 'service');

                }

              }}
              onBlur={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length < 2) {
                  setState({ ...state, confirmationService: 'minLength2' });
                }
                if (e.target.value.length >= 120) {
                  setState({ ...state, confirmationService: 'maxLength120' });
                }
                else {
                  setState({ ...state, confirmationService: true });
                }
              }}
            />
          </div>
          {/* --Directory-- */}
          <div className={styles.contact__input}>
            <label htmlFor="directory" className={styles.contact__label}>Votre annuaire*</label>
            {classErrorOrConfirmation(state.confirmationDirectory)}
            <select
              className="contact-form-input"
              name="directory"
              value={state.form.directory}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => changeField(e.target.value, 'directory')}
              onBlur={(e: ChangeEvent<HTMLSelectElement>) => {
                if (e.target.value === "null") {
                  setState({ ...state, confirmationDirectory: false });
                }
                else {
                  setState({ ...state, confirmationDirectory: true });
                }
              }}
            >
              <option value="null"> Sélectionner un annuaire</option>
            {article.map((article) => (
                <option key={article.id}  value={article.id}>{article.title}</option>
                ))}
            </select>
          </div>
          <div className="contact-form_button">
            <button type="submit">
              Envoyer
              <i className="icon-paper-plane" />
            </button>
          </div>


        </form>
      </div>
    </>
  );
}
