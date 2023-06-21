import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cards from '../cards/cards';
import styles from './Search.module.scss';

function SearchPage() {
  const [onPage, setOnPage] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [articles, setArticles] = useState([]);
  const Router = useRouter();

  //   const filteredResults = results.filter((result) =>
  //   result.title.toLowerCase().includes(query.toLowerCase())
  // );

  const handleFocus = async (event) => {
    event.preventDefault();
    const { parentNode } = event.target;
    parentNode.parentNode.style.setProperty('--focus-scale', '1.1');
    document.body.style.setProperty('overflow-y', 'hidden', 'important');
    parentNode.parentNode.style.setProperty('box-shadow', 'var(--background)');
    document.documentElement.style.setProperty('overflow-y', 'hidden', 'important');

    if (!searchValue) {
      const responseAll = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/all`);
      const articleResponse = await responseAll.json();
      setArticles(articleResponse);
    }
    return null;
  };

  const handleBlur = (event) => {
    event.preventDefault();
    const { parentNode } = event.target;
    parentNode.parentNode.style.setProperty('--focus-scale', '1');
    document.body.style.removeProperty('overflow-y');
    document.documentElement.style.removeProperty('overflow-y');
    parentNode.parentNode.style.removeProperty('box-shadow');
    setTimeout(() => {
      setSearchValue('');
    }, 1000);
  };

  const handleSearch = (target) => {
    if (target.name === 'search'){
      setSearchValue(target.value);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const searchLowerCase = searchValue.toLowerCase();
    return (
      searchLowerCase.length > 0
      && article.title.toLowerCase().includes(searchLowerCase)
    );
  })
    .sort((a) => {
      if (a.category.slug === 'Interventions') {
        return -1;
      }
      return 0;
    })
    .slice(0, 5);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit', searchValue);
    Router.push(`/search/?q=${encodeURIComponent(searchValue)}`);
    document.body.style.removeProperty('overflow-y');
    document.documentElement.style.removeProperty('overflow-y');
    setOnPage(false);
    setSearchValue('');
  };

  useEffect(() => {
    if (Router.pathname === '/search') {
      setOnPage(false);
    } else {
      setOnPage(true);
    }
  }, [Router.pathname]);

  const handleLiClick = (event) => {
    event.preventDefault(); 
    const { parentNode } = event.target;
    const link = event.target.getAttribute('href');
    console.log(link);
    setSearchValue('');
    parentNode?.parentNode.style.setProperty('--focus-scale', '1');
    document.body.style.removeProperty('overflow-y');
    document.body.style.removeProperty('overflow-y');
    document.documentElement.style.removeProperty('overflow-y');
    Router.push(`${link}`);
  };


  function getPathCard(articlesLink) {
    let pathCard = '';
    console.log(articlesLink);
    if (articlesLink.category.slug === 'Annuaire') {
      pathCard = `${articlesLink.category.slug}/${articlesLink.slug}`;
    } else if (articlesLink.category.slug === 'Pages' && articlesLink.slug !== 'Inscription-annuaire-gratuite') {
      pathCard = `${articlesLink.slug}`;
    } if (articlesLink.slug === 'Inscription-annuaire-gratuite') {
      pathCard = `Annuaire/${articlesLink.slug}`;
    } if (articlesLink.category.slug === 'Articles') {
      pathCard = `${articlesLink.category.slug}/${articlesLink.subcategory.slug}/${articlesLink.slug}`;
    } if (articlesLink.category.slug === 'Interventions') {
      pathCard = `${articlesLink.category.slug}/${articlesLink.slug}`;
    }     
    return pathCard;
  }
  
  const filteredArticlesByCategory = filteredArticles.filter((article) => article.category.slug === 'Articles');
  return onPage && (
    <div
      className={styles.search}
      onFocus={handleFocus}
      onBlur={handleBlur}
      // onMouseOut={hanleMouseClick}
      tabIndex={0}
    >
      <form
        onSubmit={handleSubmit}
        className={styles.search__form}
      >
        <input
          type="text"
          name='search'
          placeholder="Rechercher..."
          onChange={(event) => handleSearch(event.target)}
          value={searchValue}
          autoComplete='off'
        />
        {/* <SearchBar value={searchValue} handleChange={handleSearch} /> */}
        <button
          id="button"
          type="submit"
          aria-label="Rechercher une page ou un article"
        >
          <i className="icon-paper-plane" />
        </button>
      </form>
      { searchValue.length > 2 && (
      <ul
        className={styles.search__form__list}
        role="menu"

      >
        {(filteredArticles.length === 0 && searchValue.length >= 1) && (
        <li>Aucun résultat</li>
        )}
        {filteredArticles.length > 0
  && (filteredArticles[0].category.slug === 'Pages'
    || filteredArticles[0].category.slug === 'Annuaire'
    || filteredArticles[0].category.slug === 'Interventions') && (
    <strong>Pages :</strong>
        )}
        {filteredArticles.map((result) => result.category.slug === 'Interventions' && (
        <li
          role="menuitem"
          key={result.title}
          onClick={handleLiClick}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleLiClick(event);
            }
          }}
          tabIndex={1}
        >
          <Link href={`/${getPathCard(result)}`}>{result.title}</Link>
        </li>
        ))}
        {filteredArticles.map((result) => {
          if (
            (result.category.slug === 'Pages' || result.category.slug === 'Annuaire')
    && (result.category.slug !== 'Inscription-annuaire-gratuite')
          ) {
            return (
              <li
                role="menuitem"
                key={result.title}
                onClick={handleLiClick}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleLiClick(event);
                  }
                }}
                tabIndex={0}

              >
                <Link href={`/${getPathCard(result)}`}>{result.title}</Link>
              </li>
            );
          }
          return null;
        })}
        {filteredArticlesByCategory.length > 0 && (
        <>
          <strong>Articles:</strong>
          {filteredArticlesByCategory.map((article) => (
            <li
              key={article.id}
              role="menuitem"
              // onClick={() => searchValue('')}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleLiClick(event);
                  
                }
              }}
              tabIndex={0}
            >
              <Link href={`/${getPathCard(article)}`}>{article.title}</Link>
            </li>
          ))}
        </>
        )}
      </ul>
      )}
    </div>

  );
}

export default SearchPage;
