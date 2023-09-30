import { useEffect, useState } from "react";
import Joi from "joi";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControlLabel } from "@mui/material";
import { useContext } from "react";
import { GeneralContext } from "../App";
import Switch from "@mui/material/Switch";
import {structure, AccountSchema} from "./EditAccountStructure";
import { useNavigate, Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../user/Signup.css";

export default function EditAccount({ item, itemChange }) {
  const { setLoader, snackbar } = useContext(GeneralContext);
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
  

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const obj = {};
    const elements = ev.target.elements;

    structure.forEach((s) => {
      if (s.type === "boolean") {
        obj[s.name] = elements[s.name].value === "on";
      } else {
        obj[s.name] = elements[s.name].value;
      }
    });

    setLoader(true);
  };

  const defaultTheme = createTheme();


  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  
  const handleBusinessChange = (event) => {
    setFormData({ ...formData, business: event.target.checked });
  };
    
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

  function save(ev) {
    ev.preventDefault();
    setLoader(true);

    fetch(
      `https://api.shipap.co.il/clients/update?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        itemChange(formData);
  
  })
      .catch((error) => {
        console.error("Error saving data:", error);

      })
      .finally(() => {
        navigate("/");
        snackbar(`Your data was saved successfully`); 
        setLoader(false);
        window.location.reload();
      });
      
  }

  return (
    <>
      {item && (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <form onSubmit={save}>
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Edit Account
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    {structure.map((s) => (
                      <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
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
                    onClick={save}
                    disabled={!isValid}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </form>
          </Container>
          <button className="BackButton">
          <Link to={"/"}>🔙</Link>
        </button>
        </ThemeProvider>
      )}
    </>
  );
}
