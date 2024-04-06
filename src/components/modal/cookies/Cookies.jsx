import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import style from '../Modal.module.scss';
import CookieChoice from './CookieChoice';

export default function CookiesModal() {
  const [cookiesModal, setCookiesModal] = useState(null);
  const [state, setState] = useState({
    cookiesGoogle: '',
    cookiesWebmaster: '',
    cookiesChoice: '',
    cookiesAll: '',
  });

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
    window.localStorage.setItem('cookiesGoogle', true);
    window.localStorage.setItem('cookiesModal', cookiesModal);
    setState({
      ...state, cookiesAll: true, cookiesGoogle: true,
    });

    setCookiesModal(false);
  };

  // const handleRefuseCookies = () => {
  //   setCookiesModal(false);
  //   window.localStorage.setItem('cookiesModal', cookiesModal);
  //   window.localStorage.setItem('cookiesGoogle', false);
  // };

  return (
    <>
      <Script
        async
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        id={state.cookiesGoogle ? 'granted' : 'denied'}
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': '${state.cookiesGoogle ? 'granted' : 'denied'}'
              });
              
            `,
        }}
      />

      {cookiesModal && (
      <div className={`modal ${style.cookies__modal}`}>
        <div className={style.cookies}>
          {!state.cookiesChoice ? (
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
                <button type="button" onClick={handleAcceptCookies}>
                  Je valide
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2>
                Hey c&apos;est nous...
                <span>Les Cookies !</span>
              </h2>
              <p>On aimerait bien vous accompagner pendant votre visite...</p>
              <p>...mais on a besoin de votre accord pour ça !</p>
              <div className={style.cookies__button}>
                <button
                  type="button"
                  className="button-glass"
                  onClick={() => setState({ ...state, cookiesChoice: false })}
                >
                  Je choisis
                </button>
                <button
                  type="button"
                  className="button-glass"
                  onClick={handleAcceptCookies}
                >
                  Ok pour moi
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      )}
    </>
  );
}
