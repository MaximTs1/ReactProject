import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import { GeneralContext } from "../App";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import { TOKEN } from "../config";
import {structure, signupSchema} from "./SignupStructure";
import "./Signup.css";

const defaultTheme = createTheme();

export default function Signup() {
  const { setLoader } = useContext(GeneralContext);
  const navigate = useNavigate();

    

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName:  "",
    phone: "",
    email: "",
    password: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: 0,
    zip: 0,
    buisness: false,
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleBusinessChange = (event) => {
    setFormData({ ...formData, business: event.target.checked });
  };


  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    const signupData = {
      ...formData,
      [name]: value,
    };
  
    setFormData(signupData);
  
    const validationResults = signupSchema.validate(signupData, {
      abortEarly: true,
      allowUnknown: true,
    });
  
    const newErrors = {};

    validationResults.error?.details.find((error) => {
      if (error.path && error.path.length > 0 && value.trim() !== "") {
        newErrors[error.path[0]] = error.message;
      }
    });
    setErrors(newErrors);
    setIsValid(!Object.keys(newErrors).length);
  };
  

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const elements = ev.target.elements;

  structure.forEach((s) => {
    if (s.type === "boolean") {
      formData[s.name] = elements[s.name].value === "on";
    } else {
      formData[s.name] = elements[s.name].value;
    }
  });

    setLoader(true);

    fetch(`https://api.shipap.co.il/clients/signup?token=${TOKEN}`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
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
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => setLoader(false));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            direction: "ltr",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create User
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                        ) : (
                    <TextField
                      name={s.name}
                      required={s.required}
                      fullWidth
                      id={s.name}
                      label={s.label}
                      type={s.type}
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
              sx={{ mt: 2, mb: 3 }}
              disabled={!isValid}
            >
               Sign up
            </Button>
            <Grid container justifyContent="center"></Grid>
          </Box>
        </Box>
        <button className="BackButton">
          <Link to={"/"}>🔙</Link>
        </button>
      </Container>
    </ThemeProvider>
  );
}

