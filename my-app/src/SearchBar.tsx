
//import { fetchWeatherByCity } from "./services/weatherServices.ts";
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch}) => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {       // onClick submit button
    onSearch(query);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {           // add use of enter key
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" onClick={handleSearch}>Search</button>
    </div>
  );
};


export default SearchBar;


