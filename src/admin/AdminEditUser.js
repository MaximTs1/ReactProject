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
import { structure, AccountSchema } from "../pages/EditAccountStructure";
import "../user/Signup.css";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";


export default function AdminEditUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
  const [showPassword, setShowPassword] = useState(false);

  const handleBusinessChange = (event) => {
    setFormData({ ...formData, business: event.target.checked });
  };
  
  useEffect(() => {
    setLoader(true);

    fetch(`https://api.shipap.co.il/admin/clients?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
      setFormData(data.find((user) => user.id === accountId));
  })
  
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoader(false));
  }, [accountId, setLoader]);
 
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (ev) => {
    const { id, value } = ev.target;

    const AccountData = {
      ...formData,
      [id]: value,
    };

    setFormData(AccountData);

    const validationResults = AccountSchema.validate(AccountData, {
      abortEarly: true,
      allowUnknown: true,
    });
  
    const newErrors = {};
    validationResults.error?.details.forEach((error) => {
      newErrors[error.path[0]] = error.message;
    });
  
    setErrors(newErrors);
    setIsValid(!Object.keys(newErrors).length);

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
        body: JSON.stringify(formData),
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
      {formData && (
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
                  onSubmit={handleInputChange}
                  sx={{ mt: 3, mb: 3 }}
                >
                  <Grid container spacing={2}>
                    {structure.map((s) => (
                      <Grid key={s.name} formData xs={12} sm={s.block ? 12 : 6}>
                        {s.type === "boolean" ? (
                          <FormControlLabel
                          name={s.name}
                          control={
                            <Switch
                              color="primary"
                              checked={formData.business}
                              onChange={handleBusinessChange}
                            />
                          }
                            label={s.label}
                            labelPlacement="start"
                          />

                          ) : s.name === "password" ? (
                            <TextField
                              fullWidth
                              id="password"
                              label="Password"
                              type={showPassword ? "text" : "password"}
                              value={formData.password}
                              error={!!errors[s.name]}
                              helperText={errors[s.name] || ''}
                              onChange={handleInputChange}
                              InputProps={{
                                endAdornment: (
                                  <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOffIcon />
                                    ) : (
                                      <VisibilityIcon />
                                    )}
                                  </IconButton>
                                ),
                              }}
                            />
                        ) : (
                          <TextField
                            name={s.name}
                            fullWidth
                            id={s.name}
                            label={s.label}
                            type={s.type}
                            value={formData[s.name]}
                            error={!!errors[s.name]}
                            helperText={errors[s.name] || ''}
                            onChange={handleInputChange}
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
                    // disabled={!isValid}
                  >
                    Update Account
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
