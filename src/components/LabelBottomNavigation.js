import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import "./LabelBottomNavigation.css"
import { Home } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const navStyle = {
  backgroundColor: 'transparent', // Set the background color to transparent
  color: 'your-desired-color', // Set the desired text color
};

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className="custom-bottom-navigation"
      >
        <BottomNavigationAction label="Home" icon={<Home />} component={Link} to="/" style={navStyle} />
        <BottomNavigationAction label="Favorite Cards" icon={<FavoriteIcon />} component={Link} to="/favorite" />
        <BottomNavigationAction label="My Cards" icon={<RecentActorsIcon />} component={Link} to="/my-cards" />
        <BottomNavigationAction label="Sand Box" icon={<AdminPanelSettingsIcon />} component={Link} to="/admin" />
      </BottomNavigation>
    </Box>
  );
}