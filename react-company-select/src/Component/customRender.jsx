import React, { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { Box, List, ListItem, ListItemIcon, ListItemText, Checkbox } from '@mui/material';

const schema = {
  type: "object",
  properties: {
    userName: {
      type: "string",
      title: "Enter your name"
    },
    selectedContinent: {
      type: "string",
      title: "Select a continent",
      enum: ["", "Africa", "Americas", "Asia", "Europe", "Oceania", "Polar", "Antarctic Ocean"]
    },
    nameFilter: {
      type: "string",
      title: "Filter by country name"
    }
  }
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/userName"
    },
    {
      type: "Control",
      scope: "#/properties/selectedContinent"
    },
    {
      type: "Control",
      scope: "#/properties/nameFilter"
    }
  ]
};

const customRender= () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    userName: '',
    selectedContinent: '',
    nameFilter: ''
  });
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

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

  useEffect(() => {
    if (formData.selectedContinent) {
      const countriesInContinent = countries
        .filter(country => country.region === formData.selectedContinent)
        .map(country => country.name);
      setSelectedCountries(countriesInContinent);
    } else {
      setSelectedCountries([]);
    }
  }, [formData.selectedContinent, countries]);

  const filteredCountries = countries.filter(country => {
    const matchesContinent = formData.selectedContinent ? country.region === formData.selectedContinent : false;
    const matchesName = country.name.toLowerCase().includes(formData.nameFilter.toLowerCase());
    return matchesContinent && matchesName;
  });

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto', padding: '20px' }}>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={formData}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setFormData(data)}
      />
      
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

export default customRender;
