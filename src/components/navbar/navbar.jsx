import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.scss';
import SvgLogo from '../../asset/svg/logo-une-taupe-chez-vous.svg';

export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(false);
  return (
    <>
      <nav
        className={`${styles.navbar__720} ${styles.navbar}`}
      >
        <Link href="/">
          <SvgLogo className={styles.navbar__720__logo} />
        </Link>
        <ul className={styles.navbar__720__list}>
          <Link href="/page/qui-sommes-nous">
            <li className={styles['navbar__720__list-item']}>
              <span>Qui-sommes-nous</span>
            </li>
          </Link>
          <Link href="/page/contact">
            <li className={styles['navbar__720__list-item']}>
              <span className={styles['navbar__720__list-item-link']}>Contact</span>
            </li>
          </Link>
        </ul>
      </nav>
      <nav
        className={`${styles.navbar__responsive} ${styles.navbar}`}
        onMouseLeave={() => (
          toggleNav === true ? (setTimeout(() => (
            setToggleNav(false)
          ), 5500)) : null
        )}
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
        {toggleNav ? (
          <ul
            className={styles.navbar__responsive__list}
            role="presentation"
            onClick={(() => setTimeout(() => (
              setToggleNav(false)
            ), 500)
          )}
          >
            <Link href="/">
              <li className={styles['navbar__responsive__list-item']}>
                <span className={styles['navbar__responsive__list-item-link']}>Accueil</span>
              </li>
            </Link>
            <Link href="/page/qui-sommes-nous">
              <li className={styles['navbar__responsive__list-item']}>
                <span className={styles['navbar__responsive__list-item-link']}>Qui-sommes-nous</span>
              </li>
            </Link>
            <Link href="/page/contact">
              <li className={styles['navbar__responsive__list-item']}>
                <span className={styles['navbar__responsive__list-item-link']}>Contact</span>
              </li>
            </Link>
          </ul>
        ) : ''}
      </nav>
      <div className={styles.navbar__responsive__block} />

    </>

  );
}
