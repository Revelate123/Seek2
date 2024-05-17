import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import App from '../App';
import JobSearch from '../job_search';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%'}}>
      <Box display="flex"
    justifyContent="center"
    alignItems="center"
     sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            
          <Tab label="Job Search "/>
          <Tab label="Profile"  />
          <Tab label="Career advice" />
          <Tab label="Explore companies"/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <JobSearch/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Set up Profile
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Career advice
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Explore companies
      </CustomTabPanel>
    </Box>
  );
}
