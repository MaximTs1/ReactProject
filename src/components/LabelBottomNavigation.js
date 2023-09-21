// import { useState, useContext } from "react";
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import RecentActorsIcon from '@mui/icons-material/RecentActors';
// import "./LabelBottomNavigation.css"
// import { Home } from '@mui/icons-material';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import { GeneralContext } from "../App";
// // import { GeneralContext2 } from "./Navbar";



// const navStyle = {
//   backgroundColor: 'transparent', // Set the background color to transparent
//   color: 'your-desired-color', // Set the desired text color
// };

// export const RoleTypes = {
//   none: 0,
//   user: 1,
//   business: 2,
//   admin: 3,
// };

// export const checkPermissions = (permissions, userRoleType) => {
//   return permissions.includes(userRoleType);
// };

// const pages = [
//   { route: "/about", title: "about" },
//   { route: "/login", title: "התחבר", permissions: [RoleTypes.none] },
//   { route: "/signup", title: "הרשמה", permissions: [RoleTypes.none] },
//   {
//     route: "/favorite",
//     title: "fav cards",
//     permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin],
//   },
//   {
//     route: "/my-cards",
//     title: "my cards",
//     permissions: [RoleTypes.business, RoleTypes.admin],
//   },
//   { route: "/admin", title: "sand box", permissions: [RoleTypes.admin] },
// ];






// export default function LabelBottomNavigation() {
//   const [value, setValue] = React.useState(0);
//   const { user, roleType, setUser, setRoleType, setLoader } = useContext(GeneralContext);

//   return (
//     <Box sx={{ width: 500 }}>
//       <BottomNavigation
//         showLabels
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//         className="custom-bottom-navigation"
//       >
//         <BottomNavigationAction label="Home" icon={<Home />} component={Link} to="/" style={navStyle} />
//         <BottomNavigationAction label="Favorite Cards" icon={<FavoriteIcon />} component={Link} to="/favorite" />
//         <BottomNavigationAction label="My Cards" icon={<RecentActorsIcon />} component={Link} to="/my-cards" />
//         <BottomNavigationAction label="Sand Box" icon={<AdminPanelSettingsIcon />} component={Link} to="/admin" />
//       </BottomNavigation>
//     </Box>
//   );
// }


import React, { useContext } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link, useLocation } from 'react-router-dom';
import './LabelBottomNavigation.css';
import { Home } from '@mui/icons-material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // Import the AdminPanelSettingsIcon
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import other
import RecentActorsIcon from '@mui/icons-material/RecentActors';

import { GeneralContext } from '../App';
import { RoleTypes, checkPermissions } from "./Roles";


const pages = [
  { route: "/", label: "Home", icon: <Home /> },
  { route: "/favorite", label: "Favorite Cards", icon: <FavoriteIcon />, permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin] },
  { route: "/my-cards", label: "My Cards", icon: <RecentActorsIcon />, permissions: [RoleTypes.business, RoleTypes.admin] },
  { route: "/admin", label: "Sand Box" , icon: <AdminPanelSettingsIcon />, permissions: [RoleTypes.admin] },
];

export default function LabelBottomNavigation() {
  const { roleType } = useContext(GeneralContext);
  const location = useLocation();

  return (
    <BottomNavigation
      showLabels
      value={location.pathname}
      className="custom-bottom-navigation"
    >
      {pages
        .filter((page) => !page.permissions || checkPermissions(page.permissions, roleType))
        .map((page) => (
          <BottomNavigationAction
            key={page.route}
            label={page.label}
            value={page.route}
            component={Link}
            icon={page.icon}
            to={page.route}
          />
        ))}
    </BottomNavigation>
  );
}
