import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event);
    onSearch(value);

  };
return (
    <form >
      <input
        type="text"
        placeholder="Rechercher..."
        onChange={(e) => handleChange(e.target.value)}
        value={value}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
};

export default SearchBar;