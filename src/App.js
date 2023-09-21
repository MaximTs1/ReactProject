import { useState, createContext, useEffect } from "react";
import "./App.css"; // Import the CSS file
import Router from "./Router";
import Navbar, { RoleTypes } from "./components/Navbar";
import Loader from "./components/Loader";

export const GeneralContext = createContext();

export default function App() {
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
  const [roleType, setRoleType] = useState(RoleTypes.none);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  useEffect(() => {
    fetch(`https://api.shipap.co.il/clients/login`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((x) => {
            throw new Error(x);
          });
        }
      })
      .then((data) => {
        setUser(data);
        setRoleType(RoleTypes.user);

        if (data.business) {
          setRoleType(RoleTypes.business);
        } else if (data.admin) {
          setRoleType(RoleTypes.admin);
        }
      })
      .catch((err) => {
        setUser();
        setRoleType(RoleTypes.none);
      })
      .finally(() => setLoader(false));
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle dark mode state
    // Add a class to the body element to enable/disable dark mode
    if (!darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  return (
    <GeneralContext.Provider
      value={{ user, setUser, setLoader, roleType, setRoleType, darkMode }} // Pass dark mode state to Navbar
    >
      <Navbar toggleDarkMode={toggleDarkMode} />{" "}
      {/* Pass toggleDarkMode function */}
      <Router />
      {loader && <Loader />}
    </GeneralContext.Provider>
  );
}
