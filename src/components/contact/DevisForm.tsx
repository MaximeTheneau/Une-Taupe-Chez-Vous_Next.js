import React, { ChangeEvent, useState } from 'react';
// import { useRouter } from 'next/router';
import FormMiddleware from '../../middleware/FormMiddleware';
import Confirmation from '../modal/Confirmation';
import styles from './Contact.module.scss';
import Select from './form/Select';
import Input from './form/Input';

interface FormState {
  name: string;
  email: string;
  message: string;
  subject: string;
  postalCode: string;
  phone?: string;
  status?: string;
  emailReturn?: boolean;
  image?: File | null;
  date?: string;
  surface?: number;
}

interface ModalState {
  title: string;
  message: string;
  toggleModal: boolean;
}

interface ContactFormState {
  form: FormState;
  textArea: number;
  confirmationName: boolean | null;
  confirmationEmail: boolean | null;
  confirmationMessage: boolean | null;
  confirmationSubject?: boolean | null;
  confirmationCodePostal?: boolean | null;
  confirmationImage?: boolean | null;
  modal: ModalState;
}

// == Composant
export default function DevisForm() {
  // const router = useRouter();
  const [state, setState] = useState<ContactFormState>({
    form: {
      name: '',
      email: '',
      message: '',
      subject: 'Demande de devis',
      postalCode: '',
      phone: '',
      date: '',
      surface: 0,
      emailReturn: true,
      status: '',
      image: null,
    },
    textArea: 3,
    confirmationName: null,
    confirmationEmail: null,
    confirmationMessage: null,
    confirmationSubject: null,
    confirmationCodePostal: null,
    confirmationImage: null,
    modal: {
      title: '',
      message: '',
      toggleModal: false,
    },
  });

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

  // function classErrorOrConfirmation(message) {
  //   if (message === true) {
  //     return (<i className="icon-confirmation" />);
  //   } if (message === false) {
  //     return (<i className="icon-error" />);
  //   }
  //   return '';
  // }

  const changeField = (value: string | boolean, field: string) => {
    setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [field]: value,
      },
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/avif', 'image/webp'];
      if (validMimeTypes.includes(file.type)) {
        setState((prevState) => ({
          ...prevState,
          form: {
            ...prevState.form,
            image: file,
          },
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          confirmationImage: false,
        }));
      }
    }
  };

  const handleResponse200 = () => {
    setState({
      ...state,
      form: {
        name: '',
        email: '',
        message: '',
        postalCode: '',
        subject: 'Demande de devis',
        phone: '',
        emailReturn: true,
        image: null,
        date: '',
      },
      modal: {
        title: 'Merci !',
        message: 'On vous répondra au plus vite',
        toggleModal: true,
      },
    });

    setTimeout(
      () => {
        // router.push('/');
        setState({
          ...state,
          form: {
            name: '',
            email: '',
            message: '',
            postalCode: '',
            subject: 'Demande de devis',
            phone: '',
            emailReturn: true,
          },
          modal: {
            title: '',
            message: '',
            toggleModal: false,
          },
        });
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
    const req = state.form;
    FormMiddleware(req, 'contact', handleResponse200, handleResponseError);
    setState({
      ...state,
      modal: {
        title: 'Envoi en cours',
        message: 'Merci de patienter',
        toggleModal: true,
      },
    });
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
          <div className={styles.contact__input__radio}>
            <label htmlFor="statusParticular">
              <input
                id="statusParticular"
                type="radio"
                value="Particulier"
                name="status"
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'status')}
              />
              <span>
                Particulier
              </span>
            </label>
            <label htmlFor="statusSociety">
              <input
                id="statusSociety"
                type="radio"
                value="Société"
                name="status"
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'status')}
              />
              <span>
                Société
              </span>
            </label>
          </div>
          { state.form.status === 'Société' && (
          <>
            <div className={styles.contact__input}>
              <input
                type="text"
                title="Société"
                placeholder="Nom de la société"
                value={state.form.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'nameSociety')}
              />
            </div>
            <div className={styles.contact__input}>
              <input
                type="text"
                title="Siret"
                placeholder="Siret"
                value={state.form.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'siret')}
              />
            </div>
          </>
          )}
          <div className={styles.contact__input}>
            <Input
              type="text"
              title="Nom"
              placeholder="Nom Prénom*"
              value={state.form.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'name')}
              onBlur={(e: ChangeEvent<HTMLInputElement>) => {
                setState((prevState) => {
                  const newState = { ...prevState, isFocused: true };
                  if (e.target.value.length > 2 && e.target.value.length < 35) {
                    newState.confirmationName = true;
                  } else {
                    newState.confirmationName = false;
                  }
                  return newState;
                });
              }}
            />
            {state.confirmationName === false
              && (
              <span className={styles.contact__input__error}>
                Veuillez renseigner votre nom / société (entre 3 et 35 caractères)
              </span>
              )}
          </div>
          <div className={styles.contact__input}>
            <input
              type="text"
              name="address"
              placeholder="Adresse"
              value={state.form.address}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'address')}
            />
          </div>
          <div className={styles.contact__input}>
            <input
              type="number"
              className="contact-form-input"
              name="postalCode"
              value={state.form.postalCode}
              onChange={(e) => setState(
                { ...state, form: { ...state.form, postalCode: e.target.value } },
              )}
              onBlur={(e) => (
                e.target.value.length === 5
                  ? setState({ ...state, confirmationCodePostal: true })
                  : setState({ ...state, confirmationCodePostal: false })
              )}
              placeholder="Code postal*"
              minLength={2}
              required
            />
            {state.confirmationCodePostal === false
                && (
                <span className={styles.contact__input__error}>
                  Veuillez renseigner votre code postal (5 chiffres)
                </span>
                )}
          </div>
          <div className={styles.contact__input}>
            <Input
              type="email"
              title="Email"
              value={state.form.email}
              placeholder="Email*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'email')}
              onBlur={(e: ChangeEvent<HTMLInputElement>) => (
                regex.test(e.target.value)
                  ? setState({ ...state, confirmationEmail: true })
                  : setState({ ...state, confirmationEmail: false })
              )}
            />
            {state.confirmationEmail === false
                && (
                <span className={styles.contact__input__error}>
                  Veuillez renseigner votre adresse email
                </span>
                )}
          </div>
          <div className={styles.contact__input}>
            <input
              type="text"
              name="phone"
              placeholder="Téléphone"
              value={state.form.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'phone')}
            />
          </div>
          {state.form.phone && (
          <div className={styles.contact__input}>
            <label htmlFor="date">
              Etre rappelé le
              <input
                type="datetime-local"
                name="date"
                value={state.form.date || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'date')}
                min={`${new Date().toISOString().split('T')[0]}T09:00`}
                max={`${new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}T20:00`}
              />
            </label>
          </div>
          )}
          <div className={styles.contact__input__radio}>
            <h2>
              Quels sont vos besoins ?
            </h2>
            <label htmlFor="Taupe">
              <input
                type="radio"
                name="intervention"
                id="Taupe"
                value="Taupe"
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'intervention')}
              />
              <span>
                Taupe
              </span>
            </label>
            <label htmlFor="Ragondin">
              <input
                type="radio"
                name="intervention"
                id="Ragondin"
                value="Ragondin"
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'intervention')}
              />
              <span>
                Ragondin
              </span>
            </label>
            <label htmlFor="Fouines">
              <input
                type="radio"
                name="intervention"
                id="Fouines"
                value="Fouines"
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'intervention')}
              />
              <span>
                Fouines
              </span>
            </label>
          </div>
          <div className={styles.contact__input__range}>
            <label htmlFor="surface">
              <span>
                Surface
                {' '}
                {state.form.surface}
                m²
              </span>
              <input
                type="range"
                id="surface"
                name="surface"
                min="0"
                max="1000"
                step="10"
                value={state.form.surface}
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'surface')}
              />
            </label>
          </div>

          <div className={styles.contact__input}>
            <textarea
              rows={state.textArea}
              title="Message"
              value={state.form.message}
              onChange={handleChangeMessage}
              onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => (
                e.target.value.length > 5 && e.target.value.length < 500
                  ? setState({ ...state, confirmationMessage: true })
                  : setState({ ...state, confirmationMessage: false }))}
              name="message"
              wrap="off"
              placeholder="Message*"
            />
          </div>
          <div className={styles.contact__input}>
            <label htmlFor="image">
              <span>
                Ajouter une image
              </span>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            {state.confirmationImage === false
                && (
                <span className={styles.contact__input__error}>
                  Image non valide (JPG, PNG, AVIF, WEBP)
                </span>
                )}
          </div>
          <div className={styles.contact__input__chekbox}>
            <label htmlFor="emailReturn">
              <input
                type="checkbox"
                name="emailReturn"
                id="emailReturn"
                checked={state.form.emailReturn}
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.checked, 'emailReturn')}
              />
              <span>
                Recevoir une copie de cet email
              </span>
            </label>
          </div>
          <div className="contact-form_button">
            <button type="submit" className="button">
              Envoyer
              <i className="icon-paper-plane" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
