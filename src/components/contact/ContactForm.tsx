import React, { ChangeEvent, useState } from 'react';
// import { useRouter } from 'next/router';
import FormMiddleware from '../../middleware/FormMiddleware';
import Confirmation from '../modal/Confirmation';
import styles from './Contact.module.scss';
import Button from '../button/Button';

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
export default function ContactForm() {
  // const router = useRouter();
  const [state, setState] = useState<ContactFormState>({
    form: {
      name: '',
      email: '',
      message: '',
      subject: 'Demande de renseignements',
      postalCode: '',
      phone: '',
      date: '',
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
          <div className={styles.contact__input}>
            <label htmlFor="subjectType">
              <p className={styles.contact__input__label}>
                Type de demande
                <span className={styles.contact__input__label__alert}>*</span>
              </p>
              <select
                id="subjectType"
                name="subject"
                value={state.form.subject}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setState(
                  { ...state, form: { ...state.form, subject: e.target.value } },
                )}
              >
                <option value="Demande de renseignements">Demande de renseignements</option>
                <option value="Autre">Autre</option>
                <option value="Webmaster">Webmaster</option>
              </select>
            </label>

          </div>
          <div className={styles.contact__input}>
            <label htmlFor="name">
              <p className={styles.contact__input__label}>
                Nom
                <span className={styles.contact__input__label__alert}>*</span>
              </p>
              <input
                id="name"
                type="text"
                title="Nom"
                placeholder="Nom / Société*"
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
                required
              />
            </label>
            {state.confirmationName === false
              && (
              <span className={styles.contact__input__error}>
                Veuillez renseigner votre nom / société (entre 3 et 35 caractères)
              </span>
              )}
          </div>
          <div className={styles.contact__input}>
            <label htmlFor="postalCode">
              <p className={styles.contact__input__label}>
                Code postal
                <span className={styles.contact__input__label__alert}>*</span>
              </p>
              <input
                id="postalCode"
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
            </label>
            {state.confirmationCodePostal === false
                && (
                <span className={styles.contact__input__error}>
                  Veuillez renseigner votre code postal (5 chiffres)
                </span>
                )}
          </div>
          <div className={styles.contact__input}>
            <label htmlFor="email">
              <p className={styles.contact__input__label}>
                Email
                <span className={styles.contact__input__label__alert}>*</span>
              </p>
              <input
                id="email"
                type="email"
                title="Email"
                value={state.form.email}
                placeholder="exemple@mail.com"
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'email')}
                onBlur={(e: ChangeEvent<HTMLInputElement>) => (
                  regex.test(e.target.value)
                    ? setState({ ...state, confirmationEmail: true })
                    : setState({ ...state, confirmationEmail: false })
                )}
                required
              />
            </label>
            {state.confirmationEmail === false
                && (
                <span className={styles.contact__input__error}>
                  Veuillez renseigner votre adresse email
                </span>
                )}
          </div>
          <div className={styles.contact__input}>
            <label htmlFor="phone">
              <p className={styles.contact__input__label}>
                Téléphone
              </p>
              <input
                type="text"
                name="phone"
                placeholder="Téléphone"
                value={state.form.phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'phone')}
              />
            </label>
          </div>
          {state.form.phone && (
          <div className={styles.contact__input}>
            <label htmlFor="date">
              <p className={styles.contact__input__label}>
                Date et heure de rappel
              </p>
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
          <div className={styles.contact__input}>
            <label htmlFor="message">
              <p className={styles.contact__input__label}>
                Message
                <span className={styles.contact__input__label__alert}>*</span>
              </p>
              <textarea
                id="message"
                rows={state.textArea}
                title="Message*"
                value={state.form.message}
                onChange={handleChangeMessage}
                onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => (
                  e.target.value.length > 5 && e.target.value.length < 500
                    ? setState({ ...state, confirmationMessage: true })
                    : setState({ ...state, confirmationMessage: false }))}
                name="message"
                wrap="off"
                placeholder="Message*"
                required
              />
            </label>
            {state.confirmationMessage === false
                && (
                <span className={styles.contact__input__error}>
                  Veuillez renseigner votre message (entre 5 et 500 caractères)
                </span>
                )}
          </div>
          <div className={styles.contact__input}>
            <label htmlFor="image">
              <p className={styles.contact__input__label}>
                Pièces jointes (facultatif)
              </p>
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
          <Button text="Envoyer" icon="icon-paper-plane" />
        </form>
      </div>
    </>
  );
}
