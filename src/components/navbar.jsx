import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Navbar.module.scss';

export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(false);
  return (
    <>
      <nav className={`${styles.navbar__720} ${styles.navbar}`}>
        <ul className={styles.navbar__720__list}>
          <Link href="/">
            <li className={styles['navbar__720__list-item']}>
              <span className={styles['navbar__720__list-item-link']}>Accueil</span>
            </li>
          </Link>
          <Link href="/qui-sommes-nous">
            <li className={styles['navbar__720__list-item']}>
              <span>Qui-sommes-nous</span>
            </li>
          </Link>
          <Link href="/contact">
            <li className={styles['navbar__720__list-item']}>
              <span className={styles['navbar__720__list-item-link']}>Contact</span>
            </li>
          </Link>
          <Link href="https://www.facebook.com/association.lespetitsfreresdespauvres" target="_blank" rel="noreferrer">
            <li className={styles['navbar__720__list-item']}>
              <i className="icon-facebook" />
            </li>
          </Link>
          <Link href="https://www.instagram.com/lespetitsfreresdespauvres/" target="_blank" rel="noreferrer">
            <li className={styles['navbar__720__list-item']}>
              <i className="icon-instagram" />
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
            <Link href="/qui-sommes-nous">
              <li className={styles['navbar__responsive__list-item']}>
                <span className={styles['navbar__responsive__list-item-link']}>Qui-sommes-nous</span>
              </li>
            </Link>
            <Link href="/contact">
              <li className={styles['navbar__responsive__list-item']}>
                <span className={styles['navbar__responsive__list-item-link']}>Contact</span>
              </li>
            </Link>
            <li className={styles['navbar__responsive__list-item-social']}>
              <Link href="httt" target="_blank" rel="noreferrer">
                <i className="icon-facebook" />
              </Link>
              <Link href="{contact.Github}" target="_blank" rel="noreferrer">
                <i className="icon-instagram" />
              </Link>
            </li>
          </ul>
        ) : ''}
      </nav>
      <div className={styles.navbar__responsive__block} />

    </>

  );
}
