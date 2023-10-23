import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from '../Modal.module.scss';
import Script from 'next/script';
import CookieChoice from './CookieChoice';
import Head from 'next/head';

export default function CookiesModal({  }) {
  const [cookiesModal, setCookiesModal] = useState(false);
  const [state, setState] = useState({
    cookiesGoogle: false,
    cookiesWebmaster: false,
    cookiesChoice: '',
    cookiesAll: '',
  });

  

  useEffect(() => {
    const cookiesModalParam = window.localStorage.getItem('cookiesModal');
      if (cookiesModalParam === null) {
        setTimeout(() => {
          setCookiesModal(true);
        }, 1000);
      } else if (cookiesModalParam === true) {
        setCookiesModal(false);
      }

      const cookiesGoogleParam = window.localStorage.getItem('cookiesGoogle');

      if (cookiesGoogleParam) {
        setState((prevState) => ({
          ...prevState,
          cookiesGoogle: cookiesGoogleParam === 'true',
        }));
      }
    } , []);

    const toggleCookies = (field, value ) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    window.localStorage.setItem(field, value);
  };
  const handleAcceptCookies = () => {
    setCookiesModal(false);
    window.localStorage.setItem('cookiesModal', false);
  };
  console.log(state);
  return (
    <>
      {state.cookiesGoogle && (
      <>
        <Script strategy="worker" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`} />
        <Script id="google-analytics" strategy="worker">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
        `}
        </Script>
      </>
      )}

      <div className={`modal ${style.cookies__modal} ${cookiesModal ? style.cookies__modal__active : 'none'}`} >
        <div className={style.cookies}>
        {state.cookiesChoice ? (
          <div className={`card ${style.cookies__choice}`}>
            <h2>Les cookies</h2>
            <p>
              Les cookies sont utilisés pour mesurer notre audience et améliorer nos contenus.
              <br />
              En désactivant les cookies, vous ne pourrez pas utiliser certaines fonctionnalités de notre site.
            </p>
            <table className={`card ${style.cookies__choice__table}`}>
              <thead>
                <tr>
                  <th>Services</th>
                  <th>Activer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tout cocher</td>
                  <td>
                    <i
                      className={`icon-${state.cookiesAll ? 'confirmation' : 'error'}`}
                      // onClick={toggleCookies('all')}
                      role="presentation"
                    />
                  </td>
                </tr>

              <CookieChoice
                label="Google Analytics GU4"
                checked={state.cookiesGoogle}
                onClick={() => toggleCookies('cookiesGoogle', !state.cookiesGoogle)}
                />
              </tbody>
            </table>
            {/* <div className={`card ${style.cookies__choice__table}`}>
              <div className={style.cookies__choice__table__row}>Google Maps et Google Analytics</div>
              <div className={style.cookies__choice__table__row}>
                <i
                  className={`icon-${cookiesGoogle ? 'confirmation' : 'error'}`}
                  onClick={toggleCookiesGoogle}
                  role="presentation"
                />
              </div>
            </div> */}
            <div className={style.cookies__close}>
              <button type="button" onClick={handleAcceptCookies}>
                Je valide
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2>
              Hey c'est nous...
              <span>Les Cookies !</span>
            </h2>
            <p>On aimerait bien vous accompagner pendant votre visite...</p>
            <p>...mais on a besoin de votre accord pour ça !</p>
            <div className={style.cookies__button}>
              <button type="button" className="button-glass" onClick={() => setState({...state, cookiesChoice: true})}>
                Je choisis
              </button>
              <button
                type="button"
                className="button-glass"
                onClick={() => {
                  window.localStorage.setItem('cookiesModal', true);
                  window.localStorage.setItem('cookiesGoogle', true);

                }}
              >
                Ok pour moi
              </button>
            </div>
          </>
        )}
        </div>
      </div>
    </>

  );
}

CookiesModal.propTypes = {
  setCookiesModal: PropTypes.func.isRequired,
};
