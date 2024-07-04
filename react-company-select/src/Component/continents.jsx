import React, { useState, useEffect } from 'react';

const Continent = () => {
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    fetch('https://example.com/api/continents')
      .then(response => response.json())
      .then(data => console.log(data));
  }, []);

  return (
    <ul>
      {continents.map((continent) => (
        <li key={continent.id}>
          <h2>{continent.name}</h2>
          <ul>
            {continent.countries.map((country) => (
              <li key={country}>{country}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Continent;