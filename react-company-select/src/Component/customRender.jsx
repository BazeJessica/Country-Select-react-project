import { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { Box } from '@mui/material';
import CountryCheckBoxControl from './checkBox';
import CountryCheckBoxControlTester from './checkBoxTester';

const schema = {
  type: "object",
  properties: {
    userName: {
      type: "string",
      title: "Enter your name"
    },
    conti: {
      type: "string",
      title: "Visited countries",
    },
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
      scope: "#/properties/conti",
    },
  ]
};

const CustomRender = () => {
  const [formData, setFormData] = useState({userName: '',conti: []});
  const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Polar", "Antarctic Ocean"]

  useEffect(() => {
    const filtered_continents = []
    continents.map(c => {
        fetch(`https://restcountries.com/v3.1/region/${c}`)
        .then((res) => res.json())
        .then((data) => {
            filtered_continents.push({ 
                continent: c, 
                select_all: false, 
                countries: data.map(country => { 
                    return {
                      name: country.name.common,
                      is_selected: false
                    } 
                })
            })
            setFormData({...formData, conti: filtered_continents})
        });
    })
  }, []);


  const renderers = [
    ...materialRenderers,
    { tester: CountryCheckBoxControlTester, renderer : CountryCheckBoxControl }
]

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto', padding: '20px' }}>
     { formData.conti.length > 0 &&  <JsonForms
        schema={schema}
        uischema={uischema}
        data={formData}
        renderers={renderers}
        cells={materialCells}
        onChange={({ data }) => setFormData(data)}
      />}
    </Box>
  );
};

export default CustomRender;
