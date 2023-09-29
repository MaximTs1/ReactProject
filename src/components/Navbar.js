import { useState, useContext } from "react";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import Searchbar from "./Searchbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BadgeIcon from "@mui/icons-material/Badge";
import { GeneralContext } from "../App";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import { RoleTypes, checkPermissions } from "./Roles";

const pages = [
  { route: "/about", title: "about" }, 
  {
    route: "/favorite",
    title: "fav cards",
    permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin],
  },
  {
    route: "/my-cards",
    title: "my cards",
    permissions: [RoleTypes.business, RoleTypes.admin],
  },
  { route: "/admin", title: "sand box", permissions: [RoleTypes.admin] },

];

const loginPages = [
  { route: "/login", title: "Log In", permissions: [RoleTypes.none] },
  { route: "/signup", title: "Register", permissions: [RoleTypes.none] },
];

const settings = [
  {
    route: "/account",
    title: "my account",
    permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin],
  },
];

export default function Navbar({ toggleDarkMode }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, roleType, setUser, setRoleType, setLoader, darkMode } =
    useContext(GeneralContext);
  const navigate = useNavigate();
  const path = useResolvedPath().pathname;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    setLoader(true);

    fetch(`https://api.shipap.co.il/clients/logout`, {
      credentials: "include",
    }).then(() => {
      setUser();
      setRoleType(RoleTypes.none);
      setLoader(false);
      navigate("/");
    });

    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="static"
      className={`navbar ${darkMode ? "dark-mode" : ""}`}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BadgeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, cursor: "pointer" }} onClick={() => navigate("/")} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer"
            }}
          >
            Bcard
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* תפריט המבורגר */}
              {pages
                .filter(
                  (p) =>
                    !p.permissions || checkPermissions(p.permissions, roleType)
                )
                .map((page) => (
                  <Link
                    to={page.route}
                    key={page.route}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem key={page.route} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
            </Menu>
          </Box>
          <BadgeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Bcard
          </Typography>
          {/* תפריט עליון */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages
              .filter(
                (p) =>
                  !p.permissions || checkPermissions(p.permissions, roleType)
              )
              .map((page) => (
                <Link
                  to={page.route}
                  key={page.route}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      backgroundColor:
                        page.route === path ? "cornflowerblue" : "",
                    }}
                  >
                    {page.title}
                  </Button>
                </Link>
              ))}
          </Box>

          <Box sx={{justifyContent: "flex-end" }}>         
          <Searchbar />
          </Box>

          <Box sx={{justifyContent: "flex-end" }}>
          <Button onClick={toggleDarkMode} color="inherit">
            {darkMode ? <WbSunnyIcon /> : <Brightness2Icon />}
          </Button>

          </Box>
          {user && (
            <Box sx={{ flexGrow: 0, justifyContent: "flex-end" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="../../public/220453.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <Link
                    to={setting.route}
                    key={setting.route}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex", justifyContent: "flex-end" } }}>
            {loginPages
              .filter(
                (p) =>
                  !p.permissions || checkPermissions(p.permissions, roleType)
              )
              .map((page) => (
                <Link
                  to={page.route}
                  key={page.route}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      backgroundColor:
                        page.route === path ? "cornflowerblue" : "",
                    }}
                  >
                    {page.title}
                  </Button>
                </Link>
              ))}
          </Box>
 
        </Toolbar>
      </Container>
    </AppBar>
  );
}







// import { useState, useContext } from "react";
// import { Link, useNavigate, useResolvedPath } from "react-router-dom";
// import Searchbar from "./Searchbar";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import BadgeIcon from "@mui/icons-material/Adb";
// import { GeneralContext } from "../App";
// import WbSunnyIcon from "@mui/icons-material/WbSunny";
// import Brightness2Icon from "@mui/icons-material/Brightness2";
// import { RoleTypes, checkPermissions } from "./Roles";

// const pages = [
//   { route: "/about", title: "about" },
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
//   { route: "/login", title: "Log In", permissions: [RoleTypes.none] },
//   { route: "/signup", title: "Register", permissions: [RoleTypes.none] },
// ];

// const settings = [
//   {
//     route: "/account",
//     title: "my account",
//     permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin],
//   },
// ];

// export default function Navbar({ toggleDarkMode }) {
//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);
//   const { user, roleType, setUser, setRoleType, setLoader, darkMode } =
//     useContext(GeneralContext);
//   const navigate = useNavigate();
//   const path = useResolvedPath().pathname;

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const logout = () => {
//     setLoader(true);

//     fetch(`https://api.shipap.co.il/clients/logout`, {
//       credentials: "include",
//     }).then(() => {
//       setUser();
//       setRoleType(RoleTypes.none);
//       setLoader(false);
//       navigate("/");
//     });

//     handleCloseUserMenu();
//   };

//   return (
//     <AppBar
//       position="static"
//       className={`navbar ${darkMode ? "dark-mode" : ""}`}
//     >
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <BadgeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             onClick={() => navigate("/")}
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             Bcard
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               {/* תפריט המבורגר */}
//               {pages
//                 .filter(
//                   (p) =>
//                     !p.permissions || checkPermissions(p.permissions, roleType)
//                 )
//                 .map((page) => (
//                   <Link
//                     to={page.route}
//                     key={page.route}
//                     style={{ textDecoration: "none", color: "black" }}
//                   >
//                     <MenuItem key={page.route} onClick={handleCloseNavMenu}>
//                       <Typography textAlign="center">{page.title}</Typography>
//                     </MenuItem>
//                   </Link>
//                 ))}
//             </Menu>
//           </Box>
//           <BadgeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             onClick={() => navigate("/")}
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             Bcard
//           </Typography>

//           <Box
//             sx={{
//               flexGrow: 1,
//               display: "flex",
//               justifyContent: "flex-end", // Align buttons to the right
//               gap: 2, // Add gap between buttons
//               alignItems: "center", // Vertically center items
//             }}
//           >
//             <Searchbar />
//             <Button onClick={toggleDarkMode} color="inherit">
//               {darkMode ? <WbSunnyIcon /> : <Brightness2Icon />}
//             </Button>
//             {pages
//               .filter((p) => p.route === "/login" || p.route === "/signup")
//               .map((page) => (
//                 <Link
//                   to={page.route}
//                   key={page.route}
//                   style={{ textDecoration: "none", color: "white" }}
//                 >
//                   <Button
//                     onClick={handleCloseNavMenu}
//                     sx={{
//                       color: "white",
//                       backgroundColor:
//                         page.route === path ? "cornflowerblue" : "",
//                     }}
//                   >
//                     {page.title}
//                   </Button>
//                 </Link>
//               ))}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             {user && (
//               <Tooltip title="Open settings">
//                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                   <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//                 </IconButton>
//               </Tooltip>
//             )}
//           </Box>
//           {user && (
//             <Menu
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <Link
//                   to={setting.route}
//                   key={setting.route}
//                   style={{ textDecoration: "none", color: "black" }}
//                 >
//                   <MenuItem onClick={handleCloseUserMenu}>
//                     <Typography textAlign="center">{setting.title}</Typography>
//                   </MenuItem>
//                 </Link>
//               ))}
//               <MenuItem onClick={logout}>
//                 <Typography textAlign="center">log out</Typography>
//               </MenuItem>
//             </Menu>
//           )}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
