import { useState } from 'react';
import { formMiddleware } from '../middleware/middleware';

import styles from '../styles/Contact.module.scss';

// == Composant
export default function Contact() {
  const [state, setState] = useState({
    form: {
      name: '',
      email: '',
      message: '',
    },
    textArea: 1,
    confirmationName: null,
    confirmationEmail: null,
    confirmationMessage: null,
  });

  const handleChangeMessage = (e) => {
    const trows = e.target.value.split('\n').length - 1 === 0 ? 1 : e.target.value.split('\n').length - 1;
    setState({
      ...state,
      textArea: trows,
      form: {
        ...state.form, message: e.target.value, confirmationMessage: true,
      },
    });
  };

  const regex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function classErrorOrConfirmation(message) {
    if (message === true) {
      return (<i className="icon-confirmation" />);
    } if (message === false) {
      return (<i className="icon-error" />);
    }
    return '';
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    formMiddleware(state.form);
  };

  return (
    <div className="contact">
      <h1>Contact</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className={styles.contact__form__input}>
          {classErrorOrConfirmation(state.confirmationName)}
          <input
            type="text"
            className="contact-form-input"
            name="user_name"
            value={state.form.name}
            onChange={(e) => setState(
              { ...state, form: { ...state.form, name: e.target.value } },
            )}
            onBlur={(e) => (
              e.target.value.length > 2 && e.target.value.length < 35
                ? setState({ ...state, confirmationName: true })
                : setState({ ...state, confirmationName: false })
            )}
            placeholder="Nom Prénom / Société"
            required
          />
        </div>
        <div className={styles.contact__form__input}>
          <input
            type="email"
            name="email"
            value={state.form.email}
            placeholder="exemple@email.fr"
            required
            onChange={(e) => setState(
              { ...state, form: { ...state.form, email: e.target.value } },
              (e.target.value.length > 2 && e.target.value.length < 35
                ? setState({ ...state, confirmationEmail: true })
                : setState({ ...state, confirmationEmail: false })),
            )}
            onBlur={(e) => (
              regex.test(e.target.value)
                ? setState({ ...state, confirmationEmail: true })
                : setState({ ...state, confirmationEmail: false })
            )}
          />
        </div>
        <div className={styles.contact__form__textarea}>
          <textarea
            rows={state.textArea}
            value={state.form.message}
            onChange={handleChangeMessage}
            onBlur={(e) => (e.target.value.length > 2 && e.target.value.length < 250
              ? setState({ ...state, confirmationMessage: true })
              : null)}
            name="message"
            wrap="off"
            placeholder="Votre message"
            required
          />
        </div>
        <div className="contact-form_button">
          <button type="submit">
            <i className="icon-submit" value="send" />
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}
