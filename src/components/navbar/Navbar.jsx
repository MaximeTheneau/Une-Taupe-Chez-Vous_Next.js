import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(false);

  const closeNav = () => {
    setToggleNav(false);
  };
  return (
    <nav
      role="navigation"
    >
      <div
        className={styles.navbar}
      >
        <Link
          href="/"
          className={styles.navbar__logo}
        >
          Une Taupe Chez Vous
        </Link>
        <div
          className={styles.navbar__responsive__toggle}
          onClick={() => {
            setToggleNav(!toggleNav);
          }}
          role="button"
          id="navbar-toggle"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setToggleNav(!toggleNav);
            }
          }}
          aria-expanded={toggleNav ? 'true' : 'false'}
          aria-label="Menu de navigation"
          aria-controls="navbar-menu"
        >
          {toggleNav ? (
            <i className="icon-x" />
          ) : (
            <i className="icon-navbar" />
          )}
        </div>
      </div>
      <div
        id="navbar-menu"
        className={`${toggleNav ? styles.navbar : styles['navbar__menu--hidden']} ${styles.navbar__menu}`}
        aria-hidden={toggleNav ? 'false' : 'true'}
        role="menu"
      >
        <ul className={styles.navbar__list}>

          <li className={styles['navbar__menu__list-item']}>
            <Link href="/Devis-en-ligne" onClick={() => closeNav()}>
              Devis en ligne
            </Link>
          </li>
          <li className={styles['navbar__menu__list-item']}>
            <Link href="/Temoignages" onClick={() => closeNav()}>
              Témoignages de Clients Satisfaits
            </Link>
          </li>
          <li className={styles['navbar__menu__list-item']}>
            <Link href="/Taupier-agree-professionnel-depuis-1994" onClick={() => closeNav()}>
              Le premier taupier de France
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
