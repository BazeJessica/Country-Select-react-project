import VisitedCountries from "./Component/VisitedCountries";

// schemas.js
 export const schema = {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 3,
        title: "Name",
      },
      visitedCountries: {
        type: "array",
        title: "Visited Countries",
        items: {
          type: "string"
        },
        customRenderer: VisitedCountries,
      },
    },
    required: ["name"]
  };
  
  
  export const uischema = {
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
  