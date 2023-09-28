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
import { useLocation, useNavigate, Link } from "react-router-dom";
import { structure } from "./AddCardStructure";
import "../user/Signup.css";

// Constants for API endpoint and token
const API_ENDPOINT = "https://api.shipap.co.il/cards";
const API_TOKEN = "9e7d1125-5381-11ee-becb-14dda9d4a5f0";

export default function EditCard() {
  const navigate = useNavigate();

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

  const { setLoader,snackbar } = useContext(GeneralContext);
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
        method:"PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(item),
      }
    )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    })
    .finally(() => {
      setLoader(false);
      navigate("/");
      snackbar(`Your data was saved successfully`); 
    });
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
              <button className="BackButton">
          <Link to={"/"}>🔙</Link>
        </button>
            </Container>
          </form>
        </ThemeProvider>
      )}
    </>
  );
}
