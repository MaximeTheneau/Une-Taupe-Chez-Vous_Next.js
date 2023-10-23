import { useState } from 'react';
import OnlineQuoteRequest from '../components/onlineQuote/OnlineQuote';

export default function DevisEnLigne() {
  const [choixUtilisateur, setChoixUtilisateur] = useState('particulier');
  const [typeService, setTypeService] = useState([]);
  const [surface, setSurface] = useState(0);

  const [state, setState] = useState({
    form: {
      rappel: false,
      choiceUser: '',
      name: '',
      firstname: '',
    },
  });

  const handleChange = (event) => {
    const {
      name, value, type, checked,
    } = event.target;
    setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };
  const handleChoixChange = (event) => {
    setChoixUtilisateur(event.target.value);
  };

  const handleSurfaceChange = (event) => {
    setSurface(event.target.value);
  };

  return (
    <div>
      <h2>Demande de devis</h2>

      <form>
        <OnlineQuoteRequest />

        {/* Type de service */}

        <label>
          Être rappelé(e) :
          <input
            type="checkbox"
            id="rappel"
            name="rappel"
            checked={state.form.rappel}
            onChange={handleChange}
          />
        </label>
        <label>
          Date et heure préférées pour le rappel :
          <input type="datetime-local" id="dateRappel" name="dateRappel" />
        </label>
        <button type="submit" className="button">Demander un devis</button>
      </form>
    </div>
  );
}
