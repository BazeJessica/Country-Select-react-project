import React, { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { Box, List, ListItem, ListItemIcon, ListItemText, Checkbox, TextField } from '@mui/material';

const schema = {
  type: "object",
  properties: {
    userName: {
      type: "string",
      title: "Enter your name"
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
      scope: "#/properties/nameFilter"
    }
  ]
};

const customRender = () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    userName: '',
    nameFilter: ''
  });
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [showCountryList, setShowCountryList] = useState(false); // State to toggle displaying country list

  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  const handleToggleCountryList = () => {
    setShowCountryList(!showCountryList);
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

  const filteredCountries = countries.filter(country => {
    const matchesName = country.name.toLowerCase().includes(formData.nameFilter.toLowerCase());
    return matchesName;
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
      
      <TextField
        onClick={handleToggleCountryList}
        variant="outlined"
        label="Choose a country"
        fullWidth
        InputProps={{
          readOnly: true,
        }}
      />

      {showCountryList && (
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
      )}
    </Box>
  );
};

export default customRender;
