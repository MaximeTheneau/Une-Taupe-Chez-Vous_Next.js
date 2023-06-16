import { useState } from 'react';
import SearchBar from './SearchBar';
import middlewareSearch from '../../middleware/middlewareSearch';



const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [articles, setArticles] = useState([]);

  const filteredArticles = articles.filter((article) => {
    return article.title.toLowerCase().includes(searchValue.toLowerCase());
  });
//   const filteredResults = results.filter((result) =>
//   result.title.toLowerCase().includes(query.toLowerCase())
// );

// console.log(filteredResults);

  const handleClick =  async (event) => {
    event.preventDefault();
    const responseAll = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/all`);
    const articles = await responseAll.json();
    setArticles(articles);
  };
    


  return (
    <div onClick={handleClick}>
      <h1>Page de recherche</h1>
      <SearchBar onSearch={setSearchValue} />
      <ul>
        {filteredArticles.map((result) => (
          <li key={result.title}>
            <a href={`/${result.subcategory 
                ? 'Articles/' + result.subcategory.slug + '/' + result.slug
                : result.slug}`}> 
            {result.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
