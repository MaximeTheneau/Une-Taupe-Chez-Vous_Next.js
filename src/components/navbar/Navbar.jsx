import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) setIsNavVisible(true);
      if (prevScrollY > currentScrollY) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(false);
      }
      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseLeave = () => {
    if (toggleNav) {
      setTimeout(() => {
        setToggleNav(false);
      }, 5500);
    }
  };
  return (
    <>
      {
      /**
       * Navbar for tablet and desktop
       * @media screen and (min-width: 720px)
       * @see Navbar.module.scss
       */
      }
      <nav className={` ${isNavVisible ? ` ${styles.navbar}` : styles['navbar--hidden']} ${styles.navbar__720}`}>
        <ul className={styles.navbar__720__list}>
          <li className={styles['navbar__720__list-item']}>
            <Link href="/">
              <Image
                src="logo-une-taupe-chez-vous.png"
                alt="Logo de l'entreprise Une Taupe Chez Vous"
                quality={80}
                className={styles.home__imageLogo}
                width={90}
                height={50}
              />
            </Link>
          </li>
          <li className={styles['navbar__720__list-item']}>
            <Link href="/Contact">
              Contact
            </Link>
          </li>
          <li className={styles['navbar__720__list-item']}>
            <Link href="/Taupier-agree-professionnel-depuis-1994">
              Qui-sommes-nous
            </Link>
          </li>
          <li className={styles['navbar__720__list-item']}>
            <Link href="/search"> Rechercher</Link>
          </li>
        </ul>
        <Link href="/" tabIndex={"la page d'accueil"} />

      </nav>

      <nav
        aria-hidden="true"
        className={`${isNavVisible ? `${styles.navbar}` : styles['navbar--hidden']} ${styles.navbar__responsive}`}
        onMouseLeave={handleMouseLeave}
      >
        <div
          aria-hidden="true"
          className={styles.navbar__responsive__toggle}
          onClick={() => {
            setToggleNav(!toggleNav);
          }}
        >
          {toggleNav ? (
            <i className="icon-x" />
          ) : (
            <i className="icon-navbar" />
          )}
        </div>
        {toggleNav && (
          <ul
            className={styles.navbar__responsive__list}
            role="presentation"
            onClick={(() => setTimeout(() => (
              setToggleNav(false)
            ), 500)
            )}
          >
            <li className={styles['navbar__responsive__list-item']}>
              <Link href="/">
                <span className={styles['navbar__responsive__list-item-link']}>Accueil</span>
              </Link>
            </li>
            <li className={styles['navbar__responsive__list-item']}>
              <Link href="/Taupier-agree-professionnel-depuis-1994">
                <span className={styles['navbar__responsive__list-item-link']}>Qui-sommes-nous</span>
              </Link>
            </li>
            <li className={styles['navbar__responsive__list-item']}>
              <Link href="/Contact">
                <span className={styles['navbar__responsive__list-item-link']}>Contact</span>
              </Link>
            </li>
            <li className={styles['navbar__responsive__list-item']}>
              <Link href="/search"> Rechercher</Link>
            </li>
          </ul>
        )}
      </nav>
    </>

  );
}
