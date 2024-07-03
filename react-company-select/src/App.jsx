// App.js
import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells ,materialRenderers} from '@jsonforms/material-renderers';
import VisitedCountries from './component/visitedCountries';

const countries = [
  { id: 'Europe', name: 'Europe', countries: ['Belgium', 'France', 'Germany'] },
  { id: 'Africa', name: 'Africa', countries: ['Egypt', 'South Africa', 'Morocco'] },
  // ...
];

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Name',
    },
    visitedCountries: {
      type: 'array',
      title: 'Visited Countries',
      items: {
        type: 'string',
      },
      customRenderer: VisitedCountries,
    },
  },
};


const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/name",
      label: "Name"
    },
    {
      type: "Control",
      scope: "#/properties/visitedCountries",
      options: {
        multi: true
      }
    }
  ]
};


const data = {
  name: '',
  visitedCountries: [],
};

const App = () => {
  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={data}
      renderers={materialRenderers}
      cells={materialCells}
      onChange={(data) => console.log(data)}
    />
  );
};

export default App;