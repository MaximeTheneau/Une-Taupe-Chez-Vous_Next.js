import React, { useState, useEffect } from 'react';
import style from '../Modal.module.scss';
import CookieChoice from './CookieChoice';

export default function CookiesModal() {
  const [cookiesModal, setCookiesModal] = useState(null);
  const [state, setState] = useState({
    cookiesGoogle: false,
    cookiesWebmaster: false,
    cookiesChoice: false,
    cookiesAll: false,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('CookiesModal loaded');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (!cookiesModal && !window.localStorage.getItem('cookiesModal')) {
        setCookiesModal(false);
        document.body.classList.add('overflow-hidden');
        const scriptInit = document.createElement('script');
        scriptInit.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`;
        scriptInit.async = true;
        scriptInit.id = 'google-analytics-init';

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
        const existingScript = document.getElementById('google-analytics');
        const existingScriptInit = document.getElementById('google-analytics-init');
        if (existingScriptInit) {
          document.head.removeChild(existingScriptInit);
        }
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
        document.head.appendChild(scriptInit);
        document.head.appendChild(script);
      }
    }, 5000);
  }, []);

  const toggleCookies = (field, value) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    window.localStorage.setItem(field, value);
  };

  const handleAcceptCookies = () => {
    document.body.classList.remove('overflow-hidden');
    window.localStorage.setItem('cookiesModal', true);
    window.localStorage.setItem('cookiesGoogle', true);
    setState({ ...state, cookiesGoogle: true });
    setCookiesModal(true);
  };

  const handleRefuseCookies = () => {
    setCookiesModal(null);
    document.body.classList.remove('overflow-hidden');
    window.localStorage.setItem('cookiesGoogle', false);
  };

  return (
    cookiesModal === false && (
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
              onClick={() => {
                document.body.classList.remove('overflow-hidden');
                if (state.cookiesGoogle) {
                  setCookiesModal(true);
                  window.localStorage.setItem('cookiesModal', true);
                } else {
                  setCookiesModal(true);
                }
              }}
              className="button"
            >
              Soumettre les préférences
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2>
            À vous de choisir !
          </h2>
          <p>
            En poursuivant votre navigation, vous acceptez l&apos;utilisation des cookies
            pour nous aider à améliorer notre site internet. À vous de choisir !
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
