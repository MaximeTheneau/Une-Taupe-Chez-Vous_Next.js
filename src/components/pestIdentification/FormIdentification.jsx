import { useState, useEffect } from 'react';
import styles from './FormIdentification.module.scss';
import FormMiddleware from '../../middleware/FormMiddleware';

export default function FormIdentification() {
  const [state, setState] = useState({
    form: {
      type: '',
      image: '',
    },
    timer: 0,
    message: '',
    imageName: '',
    error: '',
    loading: false,
  });
  useEffect(() => {
    let timerId;
    if (state.timer > 0) {
      timerId = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          timer: prevState.timer - 1,
        }));
      }, 1000);
    }
    return () => clearInterval(timerId); // Nettoyage du timer à chaque rendu
  }, [state.timer]);

  const handleResponse200 = (response) => {
    setState({
      ...state,
      form: {
        type: '',
        image: '',
      },
      message: response,
      imageName: '',
      timer: 30,
      error: '',
      loading: false,
    });
  };

  const handleResponseError = (error) => {
    setState({
      ...state,
      message: error,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState({ ...state, message: '' });

    if (state.timer > 0) {
      setState({ ...state, error: `Veuillez attendre ${state.timer} secondes avant de soumettre à nouveau.` });
      return;
    }
    const req = state.form;
    if (state.form.type === '') {
      setState({ ...state, error: 'Vous devez sélectionner une option' });
      return;
    }
    if (!state.form.image) {
      setState({
        ...state,
        message: '',
        error: 'Vous devez choisir une image',
      });
      return;
    }

    setState({
      form: {
        type: '',
        image: '',
      },
      ...state,
      loading: true,
      message: '',
      imageName: '',
    });
    FormMiddleware(req, 'pest-identification', handleResponse200, handleResponseError);
  };

  function handleInputChange(e) {
    const { value } = e.target;

    if (state.form.type === value) {
      setState({
        ...state,
        form: { ...state.form, type: '' },
      });
    } else {
      setState({
        ...state,
        form: { ...state.form, type: value },
      });
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/avif', 'image/webp'];
      if (validMimeTypes.includes(file.type)) {
        setState({
          ...state,
          form: {
            ...state.form,
            image: file,
          },
          imageName: file.name,
        });
      } else {
        setState({
          ...state,
        });
      }
    }
  };

  return (
    <div className={styles.pestIdentification}>
      <form onSubmit={handleSubmit}>
        <h3>Sélectionnez le type:</h3>
        <fieldset>
          <label htmlFor="Insecte">
            <input
              type="checkbox"
              id="Insecte"
              value="Insecte, Animal, Nid"
              checked={state.form.type === 'Insecte, Animal, Nid'}
              onChange={handleInputChange}
            />
            Insecte, Animal, Nid
          </label>
          <label htmlFor="Larve">
            <input
              type="checkbox"
              id="Larve"
              value="Larve ou Œuf"
              checked={state.form.type === 'Larve ou Œuf'}
              onChange={handleInputChange}
            />
            Larve ou Œuf
          </label>
          <label htmlFor="Excrément">
            <input
              type="checkbox"
              id="Excrément"
              value="Excrément"
              checked={state.form.type === 'Excrément'}
              onChange={handleInputChange}
            />
            Excrément
          </label>
          <label htmlFor="Piqûre">
            <input
              type="checkbox"
              id="Piqûre"
              value="Piqûre"
              checked={state.form.type === 'Piqûre'}
              onChange={handleInputChange}
            />
            Piqûre
          </label>
        </fieldset>

        <div>
          <h3>Choisissez une image:</h3>
          <label htmlFor="file" className="button button--grey">
            Télécharger une image
            <input
              id="file"
              type="file"
              name="file"
              accept="image/jpg, image/jpeg, image/webp"
              onChange={handleFileChange}
            />
          </label>
          <p className={styles.pestIdentification__span}>
            <span>
              {state.imageName || 'Aucun fichier sélectionné'}
            </span>
          </p>
        </div>
        <button type="submit" className="button">Envoyer</button>
      </form>
      <h3>Response :</h3>
      {state.message && <p>{state.message}</p>}
      {state.loading && (
      <p className={styles.pestIdentification__loading}>
        Envoi en cours...
        {' '}
        <i className="icon-paper-plane" />
        <i className="icon-paper-plane" />
        <i className="icon-paper-plane" />
      </p>
      )}
      {state.error && <p className={styles.pestIdentification__error}>{state.error}</p>}
    </div>
  );
}
