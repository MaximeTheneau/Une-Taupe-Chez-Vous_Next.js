import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(false);
  // const [isNavVisible, setIsNavVisible] = useState(true);

  // useEffect(() => {
  //   let prevScrollY = window.scrollY;

  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;

  //     if (currentScrollY === 0) setIsNavVisible(true);
  //     if (prevScrollY > currentScrollY) {
  //       setIsNavVisible(true);
  //     } else {
  //       setIsNavVisible(false);
  //     }
  //     prevScrollY = currentScrollY;
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // const handleMouseLeave = () => {
  //   if (toggleNav) {
  //     setTimeout(() => {
  //       setToggleNav(false);
  //     }, 5500);
  //   }
  // };
  return (
    <>
      <nav>
        <div className={styles.navbar} >
          <Link href="/"
              className={styles.navbar__logo}
          >
            Une Taupe Chez Vous
          </Link>
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
        </div>
        <div className={`${toggleNav ? styles.navbar : styles['navbar__menu--hidden']} ${styles.navbar__menu}`}>
          <ul className={styles.navbar__list}>
            <li className={styles['navbar__menu__list-item']}>
              <Link href="/Contact">
                Contact
              <div className={styles['navbar__menu__list-item-divider']} />
              </Link>
            </li>
            <li className={styles['navbar__menu__list-item']}>
              <Link href="/Taupier-agree-professionnel-depuis-1994">
                Qui-sommes-nous
              <div className={styles['navbar__menu__list-item-divider']} />
              </Link>
            </li>

            {/* <li className={styles['navbar__menu__list-item']}>
              <Link href="/search"> Rechercher</Link>
            </li> */}
          </ul>
        </div>
      </nav>
      {/* <nav
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
              <Link href="/" aria-label="Page d'acceuil 'Une Taupe Chez Vous'">
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
      </nav> */}
    </>

  );
}
