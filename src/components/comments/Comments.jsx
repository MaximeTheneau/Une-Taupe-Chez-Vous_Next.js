/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import styles from './Comments.module.scss';

export default function Comments({ posts }) {
  const [state, setState] = useState({
    responses: {
      error: false,
      confirmEmail: false,
      confirm: false,
      message: '',
      messageComment: '',
      isLoading: false,
    },
    form: {
      user: '',
      email: '',
      comment: '',
      posts: posts.id,
    },
  });
  const handleBlur = (e) => {
    if (!e.target.value) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}comments/verify_email`, {
      method: 'POST',
      body: JSON.stringify({
        email: e.target.value,
      }),

    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          setState({
            ...state,
            responses: {
              ...state.responses,
              confirmEmail: data.message,
              messageComment: '',
            },
          });
        } else {
          const errorData = await response.json();
          setState({
            ...state,
            responses: {
              ...state.responses,
              messageComment: errorData.message,
              confirmEmail: false,
            },
          });
        }
      });
  };

  const isFormValid = state.form.email
    && state.form.user
    && state.form.comment;

  function formattedDate(isoDate) {
    const date = new Date(isoDate);
    const options = {
      year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
    };
    return date.toLocaleDateString('fr-FR', options);
  }

  // const emojis = ['😀', '😯', '🙁', '🕳️', '🦡', '🌱', '🍂', '🪱', '🏡', '🚫', '💪'];

  // const handleEmojiClick = (emoji) => {
  //   setState({
  //     ...state,
  //     form: {
  //       ...state.form,
  //       comment: state.form.comment + emoji,
  //     },
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      ...state,
      responses: {
        ...state.responses,
        isLoading: true,
      },
    });
    fetch(`${process.env.NEXT_PUBLIC_API_URL}comments`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(state.form),
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setState({
          ...state,
          form: {
            user: '',
            email: '',
            comment: '',
            posts: posts.id,
          },
          responses: {
            ...state.responses,
            message: data.message,
          },
        });
      } else {
        const errorData = await response.json();
        setState({
          ...state,
          responses: {
            ...state.responses,
            error: true,
            message: errorData.message,
          },
        });
      }
    });
  };

  return (
    <section className={styles.comments}>
      {posts.comments?.length > 0 && (
      <>
        <h3>
          {posts.comments?.length}
          {' '}
          Commentaires
        </h3>
        <ul className={styles.comments__list}>
          {posts.comments?.map((comment) => (
            <li className={styles.comments__list__item} key={comment.id}>
              <p className={`${styles['comments__list__item--user']}`}>
                {comment.User}
                {' '}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </p>
              <p className={`${styles['comments__list__item--user']}`}>
                le
                {' '}
                <time dateTime={comment.createdAt}>{formattedDate(comment.createdAt)}</time>
              </p>
              <p className={`${styles['comments__list__item--text']}`}>{comment.comment}</p>
              {comment.replies?.length > 0 && (
              <ul className={styles.comments__list__responses}>
                <li className={styles.comments__list__responses__item}>
                  <h4>Réponses :</h4>
                </li>
                  {comment.replies?.map((response) => (
                    <li className={styles.comments__list__responses__item} key={response.id}>
                      <p className={`${styles['comments__list__item--user']}`}>
                        {response.User}
                        {' '}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </p>
                      <p className={`${styles['comments__list__item--user']}`}>
                        le
                        {' '}
                        <time dateTime={response.createdAt}>
                          {formattedDate(response.createdAt)}
                        </time>
                      </p>
                      <p className={`${styles['comments__list__item--text']}`}>{response.comment}</p>
                    </li>
                  ))}
              </ul>
              )}
            </li>
          ))}
        </ul>
      </>
      )}

      <h3>Postez un commentaire !</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="user">Prénom ou pseudo (obligatoire)</label>
        <input
          type="text"
          id="user"
          name="user"
          value={state.form.user}
          onChange={(e) => setState({
            ...state,
            form: {
              ...state.form,
              user: e.target.value,
            },
          })}
        />
        <label htmlFor="email">
          E-mail (obligatoire)
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.form.email}
          onChange={(e) => setState({
            ...state,
            form: {
              ...state.form,
              email: e.target.value,
            },
          })}
          onBlur={(e) => handleBlur(e)}
        />
        {state.responses.messageComment && (
        <p className="error">
          {state.responses.messageComment}
        </p>
        )}
        <label htmlFor="comment">Commentaire (obligatoire)</label>
        <textarea
          id="comment"
          name="comment"
          value={state.form.comment}
          onChange={(e) => setState({
            ...state,
            form: {
              ...state.form,
              comment: e.target.value,
            },
          })}
        />
        {state.responses.isLoading ? (
          <p>
            Envoie en     cours...
            {' '}
          </p>
        ) : (
          <p className="error">
            {state.responses.message && (
              state.responses.message
            )}
          </p>
        )}
        {isFormValid && state.responses.confirmEmail ? (
          <button
            className="button"
            type="submit"
          >
            Envoyer
          </button>
        ) : (
          <button
            className="button button--disabled"
            type="button"
            disabled
          >
            Envoyer
            {' '}
          </button>
        )}

      </form>
    </section>

  );
}
