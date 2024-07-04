// Continent.js
import React from 'react';

const Continent = ({ continent, handleContinentChange, value }) => {
  const handleCheckboxChange = () => {
    handleContinentChange(continent.id);
  };

  return (
    <li>
      <input
        type="checkbox"
        id={continent.id}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={continent.id}>{continent.name}</label>
      <ul>
        {continent.countries.map((country) => (
          <li key={country}>
            <input
              type="checkbox"
              id={country}
              value={country}
              checked={value.includes(country)}
            />
            <label htmlFor={country}>{country}</label>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Continent;