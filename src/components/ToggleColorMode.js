// import React, { useState } from "react";
// import Toggle from "react-toggle";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";

// export const DarkModeToggle = () => {
//   const [isDark, setIsDark] = useState(true);

//   return (
//     <Toggle
//       checked={isDark}
//       onChange={({ target }) => setIsDark(target.checked)}
//       icons={{ checked: "🌙", unchecked: "🔆" }}
//       aria-label="Dark mode toggle"
//     />
//   );
// };

//2

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: "flex",
        width: "5%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

//3

// import "./DarkMode.css";
// import { createContext, useState } from "react";
// import ReactSwitch from "react-switch";

// export const ThemeContext = createContext(null);

// function DarkMode() {
//   const [theme, setTheme] = useState("dark");

//   const toggleTheme = () => {
//     setTheme((curr) => (curr === "light" ? "dark" : "light"));
//   };
//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       <div className="DarkMode" id={theme}>
//         <div className="switch">
//           <label> {theme === "light" ? "" : ""}</label>
//           <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
//         </div>
//       </div>
//     </ThemeContext.Provider>
//   );
// }

// export default DarkMode;
