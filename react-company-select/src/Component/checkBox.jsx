import { withJsonFormsControlProps } from '@jsonforms/react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Checkbox } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const countryCheckBoxControl = ({data, handleChange, path}) => {
    let continents = data ?? [];

    const handleContinentToggle = (continent) => () => {
        const countries = continent.countries.map(country => {
            return { ...country, is_selected: !continent.select_all ? true : false }
        })
        
        const new_data =  data.map(conti => {
            if (conti.continent === continent.continent) {
                return {
                    ...continent,
                    countries,
                    select_all: !continent.select_all ? true : false
                };
            } else {
                return conti
            }
        })

        handleChange(path, new_data)
      };

      const handleCountryToggle = (continent, selected_country) => () => {
        // change state of selected country
        const countries = continent.countries.map(country => {
            if (country.name === selected_country.name) {
                country.is_selected = !selected_country.is_selected;
            }

            return country;
        })
        
        // select or unselect continent
        const new_data = data.map(conti => {
            if (conti.continent === continent.continent) {
                return {
                    ...continent,
                    countries,
                    select_all: isAllSelected(countries)
                };
            } else {
                return conti
            }
        })

        handleChange(path, new_data)
      };

      const isAllSelected = (countries) => {
        const find = countries.find(c => c.is_selected === false)
        return find === undefined ? true : false;
      }


    return (
      <Box sx={{ width: '100%',  margin: 'auto', marginTop: '20px' }}>
        <div style={{color: '#6d6d6d' }}>Select Visited Countries</div>
        <List sx={{}}>
            {continents.length && continents?.map((continent, index) => (
                <>
                <Accordion sx={{ height: '100%', border: '1px solid #c4c4c4', boxShadow: 'none'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{height: '30px'}}
                    >
                        <ListItem 
                            sx={{":hover": { backgroundColor: "transparent" }}}
                            key={"conti" + continent.continent + index} 
                            button onClick={handleContinentToggle(continent)}
                        >
                            <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={continent.select_all}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': continent.continent }}
                                key={"conti-check" + continent.continent + index}
                            />
                            </ListItemIcon>
                            <ListItemText id={continent} primary={continent.continent} />
                        </ListItem>        
                    </AccordionSummary>
                    <AccordionDetails>
                        { 
                            continent.countries.map(country => (
                            <ListItem key={"country" + country.name + index} button sx={{ marginLeft: 2}} onClick={handleCountryToggle(continent, country)}>
                                <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={country.is_selected}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': country.name }}
                                />
                                </ListItemIcon>
                                <ListItemText id={country.name} primary={country.name} />
                            </ListItem>
                            ))
                        }
                    </AccordionDetails>
                </Accordion>
                </>   
            ))}
            
        </List>
      </Box>
    );
  };
  

  export default withJsonFormsControlProps(countryCheckBoxControl);
