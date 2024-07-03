// VisitedCountries.js
import React from 'react';
import Continent from './continent';

const VisitedCountries = ({ id, label, value, onChange }) => {
  const handleContinentChange = (continentId) => {
    const continent = countries.find((c) => c.id === continentId);
    if (continent) {
      const selectedCountries = continent.countries;
      onChange(selectedCountries);
    }
  };

  return (
    <div>
      <label>{label}</label>
      <ul>
        {countries.map((continent) => (
          <Continent
            key={continent.id}
            continent={continent}
            handleContinentChange={handleContinentChange}
            value={value}
          />
        ))}
      </ul>
    </div>
  );
};

export default VisitedCountries;