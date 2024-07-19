import React, { useEffect } from 'react';
import style from '../Modal.module.scss';
import CookieChoice from './CookieChoice';
import { useCookies } from '../../../context/CookiesContext';

const createGoogleAnalyticsScript = (cookiesGoogle) => {
  const scriptInit = document.createElement('script');
  scriptInit.async = true;
  scriptInit.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`;
  scriptInit.id = 'google-analytics-init';

  const script = document.createElement('script');

  script.id = 'google-analytics';

  const consentSettings = cookiesGoogle ? {
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
  const consent = cookiesGoogle ? 'update' : 'default';
  const scriptCode = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', "${consent}", ${JSON.stringify(consentSettings)});
    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
      page_path: window.location.pathname
    });
    gtag('js', new Date());
  `;
  script.textContent = scriptCode;
  return { scriptInit, script };
};

export default function CookiesModal() {
  const { cookies, updateCookies } = useCookies();

  const handleCookieChange = (cookieName) => {
    updateCookies(cookieName, !cookies[cookieName]);
  };

  useEffect(() => {
    if (!window.localStorage.getItem('cookiesAdsense')) {
      setTimeout(() => {
        updateCookies('cookiesModal', false);
      }, 5000);
    }
    if (window.localStorage.getItem('cookiesModal')) {
      updateCookies('cookiesGoogle', window.localStorage.getItem('cookiesGoogle'));
      const cookiesGoogleValue = window.localStorage.getItem('cookiesGoogle') !== 'false';
      const { scriptInit, script } = createGoogleAnalyticsScript(cookiesGoogleValue);
      const existingScript = document.getElementById('google-analytics');
      const existingScriptInit = document.getElementById('google-analytics-init');

      if (existingScriptInit) {
        document.head.removeChild(existingScriptInit);
      }
      document.head.appendChild(scriptInit);

      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      document.head.appendChild(script);

      updateCookies('cookiesAdsense', window.localStorage.getItem('cookiesAdsense'));
      return;
    }

    setTimeout(() => {
      updateCookies('cookiesModal', false);
    }, 5000);
  }, []);

  const handleAcceptCookies = () => {
    document.body.classList.remove('overflow-hidden');
    window.localStorage.setItem('cookiesModal', true);
    window.localStorage.setItem('cookiesGoogle', true);
    window.localStorage.setItem('cookiesAdsense', true);
    updateCookies('cookiesModal', true);
    updateCookies('cookiesGoogle', true);
    updateCookies('cookiesAdsense', true);
  };

  const handleRefuseCookies = () => {
    document.body.classList.remove('overflow-hidden');
    updateCookies('cookiesModal', null);
  };

  return (
    cookies.cookiesModal === false && (
    <div className={style.cookies}>
      {cookies.cookiesChoice ? (
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
                checked={cookies.cookiesGoogle}
                onClick={() => {
                  handleCookieChange('cookiesGoogle');
                  window.localStorage.setItem('cookiesGoogle', !cookies.cookiesGoogle);
                }}
              />
              <CookieChoice
                label="Google AdSense"
                checked={cookies.cookiesAdsense}
                onClick={() => {
                  handleCookieChange('cookiesAdsense');
                  window.localStorage.setItem('cookiesAdsense', !cookies.cookiesAdsense);
                }}
              />
            </tbody>
          </table>
          <div className={style.cookies__close}>
            <button
              type="button"
              className="button"
              onClick={() => {
                handleCookieChange('cookiesModal');
              }}
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
              onClick={() => handleCookieChange('cookiesChoice')}
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
