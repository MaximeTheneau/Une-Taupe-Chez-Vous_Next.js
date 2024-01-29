import { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import Router, { useRouter } from 'next/router';

export default function Search({ closeNav, onSearch  }) {
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
    setSearchValue((prevSearchValue) => {
      const newValue = event.target.value;
      if (typeof onSearch === 'function') {
        onSearch(newValue);
      }
      return newValue;
    });
  };
  
  

  return (
      <form className={styles.search} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Rechercher..."
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
      </form>
  )
}