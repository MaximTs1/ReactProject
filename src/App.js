import { useState, createContext, useEffect } from "react";
import "./App.css"; 
import Router from "./Router";
import Navbar from "./components/Navbar";
import { RoleTypes } from "../src/components/Roles";
import Loader from "./components/Loader";
import LabelBottomNavigation from "./components/LabelBottomNavigation";
import Snackbar from "./components/Snackbar";

export const GeneralContext = createContext();

export default function App() {
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
  const [roleType, setRoleType] = useState(RoleTypes.none);
  const [darkMode, setDarkMode] = useState(false); 
  const [searchWord, setSearchWord] = useState("");
  const [snackbarText, setSnackbarText] = useState('');

  const snackbar = text => {
    setSnackbarText(text);
    setTimeout(() => setSnackbarText(''), 3 * 1000);
}

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
        snackbar(`${data.fullName} מחובר!`);

      })
      .catch((err) => {
        setUser();
        setRoleType(RoleTypes.none);
        snackbar(err.message);

      })
      .finally(() => setLoader(false));
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); 
    if (!darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        user,
        setUser,
        setLoader,
        roleType,
        setRoleType,
        darkMode,
        searchWord,
        setSearchWord,
        snackbar
      }}
    >
      <Navbar toggleDarkMode={toggleDarkMode} />{" "}
      <Router />
      {loader && <Loader />}
      <LabelBottomNavigation />
      {snackbarText && <Snackbar text={snackbarText} />}
    </GeneralContext.Provider>
  );
}
