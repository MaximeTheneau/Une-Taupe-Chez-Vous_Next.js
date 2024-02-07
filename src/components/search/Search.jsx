import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import styles from './Search.module.scss';

export default function Search({ closeNav, onSearch }) {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  useEffect(() => {
    setSearchValue(router.query.q);
  }, [router.query.q]);

  const handleSubmit = (event) => {
    event.preventDefault();
    Router.push(`/search/?q=${encodeURIComponent(searchValue)}`);
    if (closeNav) closeNav();
    if (onSearch) onSearch(searchValue);
  };
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    if (typeof onSearch === 'function') {
      onSearch(newValue);
    }
  };
  return (
    <form className={styles.search__form} onSubmit={handleSubmit}>
      <div className={styles.search__form__input}>
        <input
          type="text"
          placeholder="Rechercher un article, un sujet ou un nuisibles"
          onChange={handleChange}
          value={searchValue}
        />
        <button
          id="button"
          type="submit"
          tabIndex={0}
          aria-label="Rechercher une page ou un article"
        >
          <i className="icon-paper-plane" />
        </button>
      </div>
    </form>
  );
}
