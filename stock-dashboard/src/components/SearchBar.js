import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ value, onChange, placeholder }) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative w-full">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-10 pr-10"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <FaTimes className="text-sm" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
