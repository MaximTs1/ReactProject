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
import { useLocation } from "react-router-dom";

// Constants for API endpoint and token
const API_ENDPOINT = "https://api.shipap.co.il/cards";
const API_TOKEN = "9e7d1125-5381-11ee-becb-14dda9d4a5f0";

export default function EditCard() {
  const [item, setItem] = useState({
    id: 0,
    title: "",
    description: "",
    subtitle: "",
    phone: "",
    email: "",
    web: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: 0,
    zip: 0,
  });

  const structure = [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
      block: false,
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      required: true,
      block: false,
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      required: true,
      block: false,
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone",
      required: true,
      block: false,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      block: false,
    },
    {
      name: "web",
      type: "text",
      label: "Web",
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
      label: "State",
      required: true,
      block: false,
    },
    {
      name: "country",
      type: "text",
      label: "Country",
      required: true,
      block: false,
    },
    { name: "city", type: "text", label: "City", required: true, block: false },
    {
      name: "street",
      type: "text",
      label: "Street",
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
      label: "Number",
      required: true,
      block: false,
    },
  ];

  const { setLoader } = useContext(GeneralContext);
  const defaultTheme = createTheme();
  const location = useLocation();
  const cardId = location.state && location.state.cardId;

  useEffect(() => {
    setLoader(true);

    fetch(`${API_ENDPOINT}/${cardId}?token=${API_TOKEN}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setItem(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoader(false));
  }, [cardId, setLoader]);

  const handelInput = (ev) => {
    const { name, value } = ev.target;

    setItem({
      ...item,
      [name]: value,
    });
  };

  const updateCard = (ev) => {
    console.log("item: ", item);

    ev.preventDefault();
    setLoader(true);

    fetch(
      `https://api.shipap.co.il/business/cards/${cardId}?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`,
      {
        credentials: "include",
        method: item.id ? "PUT" : "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(item),
      }
    ).finally(() => setLoader(false));
  };

  return (
    <>
      {item && (
        <ThemeProvider theme={defaultTheme}>
          <form onSubmit={updateCard}>
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
                <Typography component="h1" variant="h5">
                  Edit Card
                </Typography>
              </Box>
              <form onSubmit={updateCard}>
                <Box
                  component="div"
                  noValidate
                  onSubmit={handelInput}
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
                            value={item[s.name]}
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
                    onClick={updateCard}
                  >
                    SUBMIT
                  </Button>
                </Box>
              </form>
            </Container>
          </form>
        </ThemeProvider>
      )}
    </>
  );
}
