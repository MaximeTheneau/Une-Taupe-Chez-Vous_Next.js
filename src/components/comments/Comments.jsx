/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import Middleware from '../../middleware/Middleware';

export default function Comments() {
  const [state, setState] = useState({
    form: {
      user: '',
      email: '',
      comment: 'test',
      posts: 'Taupe',
    },
  });
  return (
    <form
      onSubmit={
          (event) => {
            event.preventDefault();
            console.log(state.form);
            Middleware(state.form, 'comments', () => {
              console.log('Commentaire envoyé');
            }, (error) => {
              console.log(error);
            });
          }
            }
    >
      <label htmlFor="name">Nom</label>
      <input
        type="text"
        id="user"
        name="user"
        onChange={(e) => setState({
          form: {
            ...state.form,
            user: e.target.value,
          },
        })}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={(e) => setState({
          form: {
            ...state.form,
            email: e.target.value,
          },
        })}
      />
      <button type="submit">Envoyer</button>
    </form>

  );
}
