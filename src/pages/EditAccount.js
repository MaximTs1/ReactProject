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

export default function EditAccount({ item, itemChange }) {
  const { setLoader } = useContext(GeneralContext);
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
  const structure = [
    {
      name: "firstName",
      type: "text",
      label: "First name",
      required: true,
      block: false,
    },
    {
      name: "middleName",
      type: "text",
      label: "Middle name",
      required: true,
      block: false,
    },
    {
      name: "lastName",
      type: "text",
      label: "Last name",
      required: true,
      block: false,
    },
    {
      name: "phone",
      type: "tel",
      label: "phone",
      required: true,
      block: false,
    },
    {
      name: "email",
      type: "email",
      label: "email",
      required: true,
      block: false,
    },
    {
      name: "password",
      type: "password",
      label: "password",
      required: true,
      block: false,
    },
    {
      name: "imgUrl",
      type: "text",
      label: "Img url",
      required: true,
      block: true,
    },
    {
      name: "imgAlt",
      type: "text",
      label: "Img alt",
      required: true,
      block: false,
    },
    {
      name: "state",
      type: "text",
      label: "state",
      required: true,
      block: false,
    },
    {
      name: "country",
      type: "text",
      label: "country",
      required: true,
      block: false,
    },
    { name: "city", type: "text", label: "city", required: true, block: false },
    {
      name: "street",
      type: "text",
      label: "street",
      required: true,
      block: false,
    },
    {
      name: "houseNumber",
      type: "number",
      label: "House number",
      required: true,
      block: false,
    },
    {
      name: "zip",
      type: "number",
      label: "number",
      required: true,
      block: false,
    },
    {
      name: "business",
      type: "boolean",
      label: "business",
      required: true,
      block: false,
    },
  ];

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

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

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
        console.log("Data saved successfully:", data);
        itemChange(formData);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  }

  return (
    <>
      {item && (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
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
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}
