import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import styles from './Search.module.scss';

export default function Search({
  closeNav, articles, setFilteredArticles,
}) {
  const router = useRouter();
  const [filter, setFilter] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    Router.push(`/search/?q=${encodeURIComponent(filter.trim())}`);
    if (closeNav) closeNav();
  };
  const handleFilterChange = (event) => {
    const value = event.target.value.toLowerCase();
    setFilter(value);
    if (!articles) return;
    const filtered = articles.filter(
      (article) => article.title.toLowerCase().includes(value),
    );
    setFilteredArticles(filtered);
  };

  useEffect(() => {
    handleFilterChange(
      {
        target: {
          value: router.query.q || '',
        },
      },
    );
  }, [router.query.q]);

  return (
    <form className={styles.search__form} onSubmit={handleSubmit} aria-label="Formulaire de recherche">
      <div className={styles.search__form__input}>
        <label htmlFor="searchInput">
          Rechercher un article, un sujet ou un nuisible
          <input
            id="searchInput"
            type="text"
            onChange={handleFilterChange}
            value={filter || ''}
            placeholder="Tapez votre recherche"
            aria-label="Rechercher un article, un sujet ou un nuisible"
          />
        </label>
        <button
          type="submit"
          tabIndex={0}
          aria-label="Lancer la recherche"
        >
          <i className="icon-paper-plane" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
