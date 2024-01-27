import { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import Router, { useRouter } from 'next/router';
import { on } from "events";

export default function Search({ articlesInit, searchValue, setSearchValue, setArticles, onSubmit, closeNav }) {
  const router = useRouter();

  useEffect(() => {
    setSearchValue(router.query.q);
  }, [router.query.q]);

  const handleSubmit = (event) => {
    event.preventDefault();
    Router.push(`/search/?q=${encodeURIComponent(searchValue)}`);
    if (closeNav) closeNav();
  };

  const removeAccents = (str) => str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

    const handleChange = (event) => {
      const inputValue = event.target.value;
      setSearchValue(inputValue);
  
      const filteredArticles = inputValue.trim() === ''
        ? articlesInit // Si le champ est vide, affiche tous les articles non filtrés
        : articlesInit.filter((article) => {
          const searchLowerCase = removeAccents(inputValue.toLowerCase());
          const lowerCaseTitle = removeAccents(article.title.toLowerCase());
          return (
            searchLowerCase.length > 0
            && lowerCaseTitle.includes(searchLowerCase)
          );
        });
  
      setArticles(filteredArticles);
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