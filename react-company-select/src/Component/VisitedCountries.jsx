import React, { useState, useEffect } from 'react';
import Continent from "./continents";

const VisitedCountries = ({ id, label, value, onChange }) => {
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    fetch('https://example.com/api/continents')
      .then(response => response.json())
      .then(data => setContinents(data));
  }, []);

  const handleContinentChange = (continentId) => {
    const continent = continents.find((c) => c.id === continentId);
    if (continent) {
      const selectedCountries = continent.countries;
      onChange(selectedCountries);
    }
  };

  return (
    <div>
      <label>{label}</label>
      <ul>
        {continents.map((continent) => (
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