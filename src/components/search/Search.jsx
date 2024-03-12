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
    <form className={styles.search__form} onSubmit={handleSubmit}>
      <div className={styles.search__form__input}>
        <input
          type="text"
          placeholder="Rechercher un article, un sujet ou un nuisibles"
          onChange={handleFilterChange}
          value={filter || ''}
        />
        <button
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
