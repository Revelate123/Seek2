import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import '../output.css';

const options = [
    "Acounting", 
    "Administration & Office",
    "Advertising, Arts & Media", 
    "Banking & Financial Services", 
    "Call Centre & Customer Service",
    "CEO & General Management", 
    "Community Services & Development", 
    "Construction", 
    "Consulting & Strategy", 
    "Design & Architecture",
    "Education & Training", 
    "Engineering", 
    "Farming, Animals & Construction", 
    "Government & Defence", 
    "Healthcare & Medical",
    "Hospitality & Tourism", 
    "Human Resources & Recruitment", 
    "Information & Communication Technology", 
    "Insurance & Superannuation",
    "Legal", 
    "Manufacturing, Transport & Logistics", 
    "Marketing & Communications", 
    "Mining, Resources & Energy",
    "Real Estate & Property", 
    "Retail & Consumer Products", 
    "Sales", 
    "Science & Technology", 
    "Self Employment",
    "Sport & Recreation", 
    "Trades & Services"
];

export default function SimpleListMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div class="rounded-lg">
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'background.paper',
                borderRadius: 2 
         }}
      >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
          
            secondary={options[selectedIndex]}
          />
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            /*disabled={index === 0}*/
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
