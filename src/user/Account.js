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
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GeneralContext } from "../App";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import { TOKEN } from "../config";

const defaultTheme = createTheme();

export default function Account() {
  const { setLoader } = useContext(GeneralContext);
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState();

  const structure = [
    {
      name: "title",
      type: "text",
      label: "title",
      required: true,
      block: false,
    },
    {
      name: "subtitle",
      type: "text",
      label: "subtitle",
      required: true,
      block: false,
    },
    {
      name: "description",
      type: "text",
      label: "description",
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
      name: "web",
      type: "string",
      label: "web",
      required: true,
      block: false,
    },
    {
      name: "imgUrl",
      type: "sring",
      label: "imgUrl",
      required: true,
      block: true,
    },
    {
      name: "imgAlt",
      type: "text",
      label: "imgAlt",
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
      label: "houseNumber",
      required: true,
      block: false,
    },
    {
      name: "zip",
      type: "number",
      label: "zip",
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

    fetch(`https://api.shipap.co.il/clients/login`, {
      credentials: "include",
      method: "get",
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
      // .then((res) => res.json())
      .then((data) => setuserInfo(data))
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => setLoader(false));
    //   .catch(err => {
    //     console.log(err.message);});
  };

  //   fetch(`https://api.shipap.co.il/business/cards?token=${TOKEN}`, {
  //     credentials: "include",
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify(obj),
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         return res.text().then((x) => {
  //           throw new Error(x);
  //         });
  //       }
  //     })
  //     .then(() => {
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     })
  //     .finally(() => setLoader(false));
  // };

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
            Create Card
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
                      // required={s.required}
                      defaultValue={"123"}
                      id={s.name}
                      label={s.label}
                      type={s.type}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: -2, mb: 3 }}
            >
              Add Card
            </Button>
            <Grid container justifyContent="center"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
