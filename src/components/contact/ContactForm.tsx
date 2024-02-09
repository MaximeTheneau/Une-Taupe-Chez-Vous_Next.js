import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
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
  modal: ModalState;
}

// == Composant
export default function ContactForm() {
  const router = useRouter();
  const [state, setState] = useState<ContactFormState>({
    form: {
      name: '',
      email: '',
      message: '',
      subject: 'Demande de devis',
      postalCode: '',
      phone: '',
      emailReturn: true,
      status: '',
    },
    textArea: 3,
    confirmationName: null,
    confirmationEmail: null,
    confirmationMessage: null,
    confirmationSubject: null,
    confirmationCodePostal: null,
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
        postalCode: '',
        subject: 'Demande de devis',
        phone: '',
        emailReturn: true,
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
            <Select
              value={state.form.subject}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setState(
                { ...state, form: { ...state.form, subject: e.target.value } },
              )}
            />
          </div>
          {/* { state.form.subject === 'Demande de devis' && (
          <>
            <div className={styles.contact__input}>
              <label htmlFor="Société">
                <input
                  type="radio"
                  name="status"
                  value="society"
                  onChange={
                    (e: ChangeEvent<HTMLInputElement>) =>
                    changeField(e.target.value, 'status')}
                />
                Société
              </label>
              <label htmlFor="Particulier">
                <input
                  type="radio"
                  name="status"
                  value="particular"
                  onChange={
                    (e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'status')
                  }
                />
                Particulier
              </label>
            </div>
            {state.form.status === 'society' && (
            <div className={styles.contact__input}>
              <input
                type="text"
                title="Société"
                placeholder="Nom de la société*"
                value={state.form.status}
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(
                  e.target.value,
                  'status',
                )}
              />
            </div>
            )}
          </>
          )} */}
          <div className={styles.contact__input}>
            <Input
              type="text"
              title="Nom"
              placeholder="Nom Prénom"
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
              required
            />
            {state.confirmationMessage === false
                && (
                <span className={styles.contact__input__error}>
                  Veuillez renseigner votre message (entre 5 et 500 caractères)
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
              Recevoir une copie de cet email
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
