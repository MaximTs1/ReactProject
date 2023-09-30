
import React, { useContext } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Link, useLocation } from "react-router-dom";
import { Home } from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import "./LabelBottomNavigation.css";
import { GeneralContext } from "../App";
import { RoleTypes, checkPermissions } from "./Roles";

const pages = [
  { route: "/", label: "Home", icon: <Home /> },
  {
    route: "/favorite",
    label: "Favorite Cards",
    icon: <FavoriteIcon />,
    permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin],
  },
  {
    route: "/my-cards",
    label: "My Cards",
    icon: <RecentActorsIcon />,
    permissions: [RoleTypes.business, RoleTypes.admin],
  },
  {
    route: "/admin",
    label: "Sand Box",
    icon: <AdminPanelSettingsIcon />,
    permissions: [RoleTypes.admin],
  },
];

export default function LabelBottomNavigation() {
  const { roleType, darkMode } = useContext(GeneralContext);
  const location = useLocation();

  return (
    <BottomNavigation
      showLabels
      value={location.pathname}
      className={`custom-bottom-navigation ${darkMode ? "dark-mode" : ""}`}
    >
      {pages
        .filter(
          (page) =>
            !page.permissions || checkPermissions(page.permissions, roleType)
        )
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
