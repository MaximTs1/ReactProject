import { useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { GeneralContext } from "../App";
import { useLocation, useNavigate, Link  } from "react-router-dom";
import { structure } from "../pages/EditAccountStructure";
import "../user/Signup.css";

export default function AdminEditUser() {
  const navigate = useNavigate();

  const [account, setAccount] = useState({
      id: 0,
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      imgUrl: "",
      imgAlt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
      zip: 0,
      business: false,
      fullName: "",
    });

  const { setLoader, snackbar } = useContext(GeneralContext);
  const defaultTheme = createTheme();
  const location = useLocation();
  const accountId = location.state && location.state.accountId;
  
  console.log("accountId", accountId);

  
  useEffect(() => {
    setLoader(true);

    fetch(`https://api.shipap.co.il/admin/clients?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`);
        }
        console.log(res);

        return res.json();
      })
      .then((data) => {
      console.log(data);
      setAccount(data.find((user) => user.id === accountId));
  })
  
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoader(false));
  }, [accountId, setLoader]);

  const handelInput = (ev) => {
    const { name, value } = ev.target;

    setAccount({
      ...account,
      [name]: value,
    });
  };

  const updateAccount = (ev) => {

    ev.preventDefault();
    setLoader(true);

    fetch(
      `https://api.shipap.co.il/admin/clients/${accountId}?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(account),
      }
    )
    .finally(() => {
      setLoader(false)
      navigate("/admin");
      snackbar(`Account update was successfully changed`);
    });
  };

  return (
    <>
      {account && (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <form onSubmit={updateAccount}>
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignaccounts: "center",
                }}
              >
                
            
                <Typography component="h1" variant="h5">
                  Edit Account
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handelInput}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    {structure.map((s) => (
                      <Grid key={s.name} account xs={12} sm={s.block ? 12 : 6}>
                        {s.type === "boolean" ? (
                          <FormControlLabel
                            name={s.name}
                            control={<Switch color="primary" />}
                            label={s.label}
                            labelPlacement="start"
                          />
                        ) : (
                          <TextField
                            name={s.name}
                            fullWidth
                            id={s.name}
                            label={s.label}
                            type={s.type}
                            value={account[s.name]}
                            onChange={handelInput}
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={updateAccount}
                  >
                    updateAccount
                  </Button>
                </Box>
              </Box>
            </form>
          </Container>
          <button className="BackButton">
          <Link to={"/admin"}>🔙</Link>
        </button>
        </ThemeProvider>
      )}
    </>
  );
}


// original bottom

// return (
//   <>
//     {account && (
//       <ThemeProvider theme={defaultTheme}>
//         <form onSubmit={updateAccount}>
//           <Container component="main" maxWidth="xs">
//             <CssBaseline />
//             <Box
//               sx={{
//                 marginTop: 8,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <Typography component="h1" variant="h5">
//                 Edit Account
//               </Typography>
//             </Box>
//             <form onSubmit={updateAccount}>
//               <Box
//                 component="div"
//                 noValidate
//                 onSubmit={handelInput}
//                 sx={{ mt: 3 }}
//               >
//                 <Grid container spacing={2}>
//                   {structure.map((s) => (
//                     <Grid key={s.name} account xs={12} sm={s.block ? 12 : 6}>
//                       {s.type === "boolean" ? (
//                         <FormControlLabel
//                           name={s.name}
//                           control={<Switch color="primary" />}
//                           label={s.label}
//                           labelPlacement="start"
//                         />
//                       ) : (
//                         <TextField
//                           name={s.name}
//                           fullWidth
//                           id={s.name}
//                           label={s.label}
//                           type={s.type}
//                           value={account[s.name]}
//                           onChange={handelInput}
//                         />
//                       )}
//                     </Grid>
//                   ))}
//                 </Grid>
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{ mt: 3, mb: 2 }}
//                   onClick={updateAccount}
//                 >
//                   Update 
//                 </Button>
//               </Box>
//             </form>
//           </Container>
//         </form>
//       </ThemeProvider>
//     )}
//   </>
// );
// }
