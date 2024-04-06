import React, { useState, useEffect } from 'react';
import style from '../Modal.module.scss';
import CookieChoice from './CookieChoice';

export default function CookiesModal() {
  const [cookiesModal, setCookiesModal] = useState(false);
  const [state, setState] = useState({
    cookiesGoogle: false,
    cookiesWebmaster: '',
    cookiesChoice: false,
    cookiesAll: '',
  });

  useEffect(() => {
    const scriptInit = document.createElement('script');
    scriptInit.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`;
    scriptInit.async = true;

    const script = document.createElement('script');
    script.id = 'google-analytics';

    const cookiesGoogleValue = window.localStorage.getItem('cookiesGoogle');
    const consentSettings = cookiesGoogleValue ? {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    } : {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    };
    const scriptCode = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'update', ${JSON.stringify(consentSettings)});
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
          page_path: window.location.pathname
        });
        gtag('js', new Date());
    `;
    script.textContent = scriptCode;

    document.body.appendChild(script);
    document.body.appendChild(scriptInit);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(scriptInit);
    };
  }, [state.cookiesGoogle]);

  useEffect(() => {
    setState({
      ...state,
      cookiesGoogle: window.localStorage.getItem('cookiesGoogle'),
    });
    const cookiesModalParam = window.localStorage.getItem('cookiesModal');
    if (cookiesModalParam === null) {
      setTimeout(() => {
        setCookiesModal(true);
        window.localStorage.setItem('cookiesModal', true);
      }, 1000);
    }
  }, []);

  const toggleCookies = (field, value) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    window.localStorage.setItem(field, value);
  };
  const handleAcceptCookies = () => {
    window.localStorage.setItem('cookiesModal', true);
    window.localStorage.setItem('cookiesModal', cookiesModal);
    setState({ ...state, cookiesGoogle: true });

    setCookiesModal(false);
  };

  useEffect(() => {
    if (state.cookiesGoogle === 'true') {
      handleAcceptCookies();
    }
  }, [state.cookiesGoogle]);

  const handleRefuseCookies = () => {
    setCookiesModal(false);
    window.localStorage.setItem('cookiesModal', true);
    window.localStorage.setItem('cookiesGoogle', false);
  };

  return (

    cookiesModal && (
    <div className={style.cookies}>
      {state.cookiesChoice ? (
        <div className={`card ${style.cookies__choice}`}>
          <h2>Les cookies</h2>
          <p>
            Les cookies sont utilisés pour mesurer notre audience et améliorer nos contenus.
            <br />
            En désactivant les cookies, vous ne pourrez pas utiliser certaines
            fonctionnalités de notre site.
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
                    aria-labelledby="button-label"
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
          <div className={style.cookies__close}>
            <button
              type="button"
              onClick={() => setCookiesModal(false)}
              className="button"
            >
              Soumettre les préférences
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2>
            Vos choix en matière de cookies sur ce site
          </h2>
          <p>
            Un cookie est un petit fichier informatique, un traceur, déposé et lu
            par exemple lors de la consultation d&apos;un site internet. Les cookies
            sont importants pour le bon fonctionnement d&apos;un site. Ainsi afin
            d&apos;améliorer votre expérience, nous utilisons des cookies pour
            collecter les statistiques en vue d&apos;optimiser les fonctionnalités
            du site et adapter le contenu à vos centres d&apos;intérêt. Cliquez sur
            « Accepter » pour accepter les cookies et poursuivre directement sur
            le site, cliquez sur « Refuser » pour refuser ou cliquez sur
            « Personnaliser » pour consulter en détail les descriptions des
            types de cookies et choisir ceux que vous voulez accepter lorsque
            vous visitez le site.
          </p>
          <div className={style.cookies__button}>
            <button
              type="button"
              className="button"
              onClick={handleAcceptCookies}
            >
              Accepter
            </button>
            <button
              type="button"
              className="button"
              onClick={handleRefuseCookies}
            >
              Refuser les cookies
            </button>
            <button
              type="button"
              className="button--grey button"
              onClick={() => setState({ ...state, cookiesChoice: true })}
            >
              Personnaliser
            </button>
          </div>
        </>
      )}
    </div>
    )
  );
}
