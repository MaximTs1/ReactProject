//very good working one vv

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
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../App";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import { TOKEN } from "../config";
import Joi from "joi";
import {structure, cardSchema} from "./AddCardStructure"

const defaultTheme = createTheme();

export default function AddCard() {
  const { setLoader, snackbar } = useContext(GeneralContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",

    // Initialize other fields here
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);




//option 3 not the best, need some work

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    const cardData = {
      ...formData,
      [name]: value,
    };
  
    setFormData(cardData);
  
    // Validate all fields
    const validationResults = cardSchema.validate(cardData, {
      abortEarly: false,
      allowUnknown: true,
    });
  
    const newErrors = {};
    validationResults.error?.details.forEach((error) => {
      newErrors[error.path[0]] = error.message;
    });
  
    setErrors(newErrors);
    setIsValid(!Object.keys(newErrors).length);
  };
  

  const handleSubmit = (ev) => {
    ev.preventDefault();

    setLoader(true);

    fetch(`https://api.shipap.co.il/business/cards?token=${TOKEN}`, {
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
        snackbar(`Your card was added successfully`);
        navigate("/");
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
            Create Card
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
              Add Card
            </Button>
            <Grid container justifyContent="center"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}










/// option 1 without full card add

  // const handleInputChange = (ev) => {
  //   const { name, value } = ev.target;
  //   const cardData = {
  //     ...formData,
  //     [name]: value,
  //   };

  //   setFormData(cardData);

  //   // Validate the current field only
  //   const fieldSchema = Joi.object({ [name]: cardSchema.extract([name]) });
  //   const { error } = fieldSchema.validate({ [name]: value });

  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [name]: error ? error.details[0].message : undefined,
  //   }));

  //   setIsValid(!error);
  // };





  // option 2 with card add but with problems
  
  // const validateForm = () => {
  //   const validationResults = cardSchema.validate(formData, {
  //     abortEarly: false,
  //     allowUnknown: true,
  //   });

  //   const newErrors = {};
  //   validationResults.error?.details.forEach((error) => {
  //     newErrors[error.path[0]] = error.message;
  //   });

  //   setErrors(newErrors);
  //   setIsValid(!Object.keys(newErrors).length);
  // };

  // const handleInputChange = (ev) => {
  //   const { name, value } = ev.target;
  //   const cardData = {
  //     ...formData,
  //     [name]: value,
  //   };

  //   setFormData(cardData);
  //   validateForm(); // Validate the entire form when any field changes
  // };














// nice version with disabled button (doesnt work perfect) vv

// import React, { useState, useContext } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Link, useNavigate } from "react-router-dom";
// import { GeneralContext } from "../App";
// import Switch from "@mui/material/Switch";
// import { FormControlLabel } from "@mui/material";
// import { TOKEN } from "../config";
// import Joi from "joi";

// const defaultTheme = createTheme();

// const cardSchema = Joi.object({
//   title: Joi.string().min(3).max(50).required(),
//   subtitle: Joi.string().min(3).max(50).required(),
//   description: Joi.string().min(10).max(200).required(),
//   // Add validation rules for other fields here
// });

// export default function AddCard() {
//   const { setLoader } = useContext(GeneralContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     subtitle: "",
//     description: "",
//     // Initialize other fields here
//   });

//   const [errors, setErrors] = useState({});
//   const [isValid, setIsValid] = useState(false);

//   const structure = [
//     {
//       name: "title",
//       type: "text",
//       label: "title",
//       required: true,
//       block: false,
//     },
//     {
//       name: "subtitle",
//       type: "text",
//       label: "subtitle",
//       required: true,
//       block: false,
//     },
//     {
//       name: "description",
//       type: "text",
//       label: "description",
//       required: true,
//       block: false,
//     },
//     // Add other fields here
//   ];





//   const validateForm = () => {
//     const validationResults = cardSchema.validate(formData, {
//       abortEarly: false,
//       allowUnknown: true,
//     });

//     const newErrors = {};
//     validationResults.error?.details.forEach((error) => {
//       newErrors[error.path[0]] = error.message;
//     });

//     setErrors(newErrors);
//     setIsValid(!Object.keys(newErrors).length);
//   };

//   const handleInputChange = (ev) => {
//     const { name, value } = ev.target;
//     const cardData = {
//       ...formData,
//       [name]: value,
//     };

//     setFormData(cardData);
//     validateForm(); // Validate the entire form when any field changes
//   };








//   const handleSubmit = (ev) => {
//     ev.preventDefault();


//     setLoader(true);

//     fetch(`https://api.shipap.co.il/business/cards?token=${TOKEN}`, {
//       credentials: "include",
//       method: "POST",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify(formData),
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           return res.text().then((x) => {
//             throw new Error(x);
//           });
//         }
//       })
//       .then(() => {
//         navigate("/");
//       })
//       .catch((err) => {
//         alert(err.message);
//       })
//       .finally(() => setLoader(false));
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             direction: "ltr",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Create Card
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               {structure.map((s) => (
//                 <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
//                   {s.type === "boolean" ? (
//                     <FormControlLabel
//                       name={s.name}
//                       control={<Switch color="primary" />}
//                       label={s.label}
//                       labelPlacement="start"
//                     />
//                   ) : (
//                     <TextField
//                       name={s.name}
//                       required={s.required}
//                       fullWidth
//                       id={s.name}
//                       label={s.label}
//                       type={s.type}
//                       error={!!errors[s.name]}
//                       helperText={errors[s.name] || ''}
//                       onChange={handleInputChange}
//                     />
//                   )}
//                 </Grid>
//               ))}
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: -2, mb: 3 }}
//               disabled={!isValid}
//             >
//               Add Card
//             </Button>
//             <Grid container justifyContent="center"></Grid>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }

