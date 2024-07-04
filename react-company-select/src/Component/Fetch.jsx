import React, { useState, useEffect } from 'react';
import { Checkbox, FormControl, InputLabel, MenuItem, Select, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';

const Fetch = () => {
  const [countries, setCountries] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [userName, setUserName] = useState('');

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

  const handleContinentChange = (event) => {
    setSelectedContinent(event.target.value);
  };

  const handleCountryToggle = (countryName) => () => {
    const currentIndex = selectedCountries.indexOf(countryName);
    const newSelectedCountries = [...selectedCountries];

    if (currentIndex === -1) {
      newSelectedCountries.push(countryName);
    } else {
      newSelectedCountries.splice(currentIndex, 1);
    }

    setSelectedCountries(newSelectedCountries);
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const filteredCountries = countries.filter(country => {
    const matchesContinent = selectedContinent ? country.region === selectedContinent : false;
    const matchesName = country.name.toLowerCase().includes(nameFilter.toLowerCase());
    return matchesContinent && matchesName;
  });

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto', padding: '20px' }}>
      <div>
        <label htmlFor="user-name">Enter your name: </label>
        <input
          type="text"
          id="user-name"
          value={userName}
          onChange={handleUserNameChange}
          style={{ width: '100%', marginBottom: '20px', padding: '10px', boxSizing: 'border-box' }}
        />
      </div>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="continent-label">Select a continent</InputLabel>
        <Select
          labelId="continent-label"
          id="continent"
          value={selectedContinent}
          onChange={handleContinentChange}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {continents.map(continent => (
            <MenuItem key={continent} value={continent}>{continent}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <div>
        <label htmlFor="name-filter">Filter by country name: </label>
        <input
          type="text"
          id="name-filter"
          value={nameFilter}
          onChange={handleNameFilterChange}
          style={{ width: '100%', marginBottom: '20px', padding: '10px', boxSizing: 'border-box' }}
        />
      </div>

      <List>
        {filteredCountries.map((country, index) => (
          <ListItem key={index} button onClick={handleCountryToggle(country.name)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedCountries.indexOf(country.name) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': country.name }}
              />
            </ListItemIcon>
            <ListItemText id={country.name} primary={country.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Fetch;
