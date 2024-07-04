import { useState, useEffect } from 'react';

const Fetch = () => {
  const [countries, setCountries] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  const continents = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Polar',
    'Antarctic Ocean'
  ];

  const handleContinentChange = (e) => {
    setSelectedContinent(e.target.value);
  };

  const filteredCountries = selectedContinent
    ? countries.filter(country => country.region === selectedContinent)
    : countries;

  return (
    <div>
      <label htmlFor="continent">Select a continent: </label>
      <select id="continent" value={selectedContinent} onChange={handleContinentChange}>
        <option value="">All</option>
        {continents.map(continent => (
          <option key={continent} value={continent}>{continent}</option>
        ))}
      </select>

      <div>
        {filteredCountries.map((country, index) => (
          <div key={index}>
            <h1>{country.name}</h1>
            <img src={country.flags.png} alt={`Flag of ${country.name}`} width={40} />
            <h3>{country.region}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fetch;
