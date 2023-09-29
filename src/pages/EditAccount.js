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
import {structure} from "./EditAccountStructure";
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

  const [errors, setErrors] = useState({});
  const defaultTheme = createTheme();
  const accountSchema = Joi.object({
    id: Joi.number().required(),
    firstName: Joi.string().min(3).required(),
    middleName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    phone: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    imgUrl: Joi.string().min(3).required(),
    imgAlt: Joi.string().min(3).required(),
    state: Joi.string().min(3).required(),
    country: Joi.string().min(3).required(),
    city: Joi.string().min(3).required(),
    street: Joi.string().min(3).required(),
    houseNumber: Joi.number().required(),
    zip: Joi.number().required(),
    business: Joi.boolean().required(),
    fullName: Joi.string().min(3).required(),
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  
  const handleBusinessChange = (event) => {
    // Toggle the business value when the Switch is clicked
    setFormData({ ...formData, business: event.target.checked });
  };
    
  const handleInputChange = (ev) => {
    const { id, value } = ev.target;

    const obj = {
      ...formData,
      [id]: value,
    };

    const schema = accountSchema.validate(obj, {
      abortEarly: false,
      messages: {},
      errors: { language: "english" },
    });
    const err = { ...errors, [id]: undefined };

    if (schema.error) {
      const error = schema.error.details.find((e) => e.context.key === id);

      if (error) {
        err[id] = error.message;
      }
    }

    setFormData(obj);
    setErrors(err);
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
        // snackbar(error);

      })
      .finally(() => {
        navigate("/");
        snackbar(`Your data was saved successfully`); 
        setLoader(false);


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
