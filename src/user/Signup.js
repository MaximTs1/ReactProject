//original one

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
// import { useContext } from "react";
// import { GeneralContext } from "../App";
// import Switch from "@mui/material/Switch";
// import { FormControlLabel } from "@mui/material";
// import {structure} from "./SignupStructure"


// const defaultTheme = createTheme();

// export default function Signup() {
//   const { setLoader } = useContext(GeneralContext);
//   const navigate = useNavigate();

 

//   const handleSubmit = (ev) => {
//     ev.preventDefault();
//     const obj = {};
//     const elements = ev.target.elements;

//     structure.forEach((s) => {
//       if (s.type === "boolean") {
//         obj[s.name] = elements[s.name].value === "on";
//       } else {
//         obj[s.name] = elements[s.name].value;
//       }
//     });

//     setLoader(true);










    
//     fetch(
//       `https://api.shipap.co.il/clients/signup?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`,
//       {
//         credentials: "include",
//         method: "POST",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify(obj),
//       }
//     )
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
//         navigate("/login");
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
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             הרשמה
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 3 }}
//           >
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
//                     />
//                   )}
//                 </Grid>
//               ))}
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               הרשם
//             </Button>
//             <Grid container justifyContent="center">
//               <Grid item>
//                 <Link to="/login">להתחברות לחץ כאן</Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }
















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
// import { useNavigate } from "react-router-dom";
// import { GeneralContext } from "../App";
// import Switch from "@mui/material/Switch";
// import { FormControlLabel } from "@mui/material";
// import { TOKEN } from "../config";
// import Joi from "joi";
// import {structure, cardSchema} from "./SignupStructure"

// const defaultTheme = createTheme();

// export default function Signup() {
//   const { setLoader } = useContext(GeneralContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     password: "",
//     imgUrl: "",
//     imgAlt: "",
//     state: "",
//     country: "",
//     city: "",
//     street: "",
//     houseNumber: "",
//     zip: "",
//     buisness:"",

//     // Initialize other fields here
//   });

//   const [errors, setErrors] = useState({});
//   const [isValid, setIsValid] = useState(false);




// //option 3 not the best, need some work

//   const handleInputChange = (ev) => {
//     const { name, value } = ev.target;
//     const cardData = {
//       ...formData,
//       [name]: value,
//     };
  
//     setFormData(cardData);
  
//     // Validate all fields
//     const validationResults = cardSchema.validate(cardData, {
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
  







//   const handleSubmit = (ev) => {
//     ev.preventDefault();

//     setLoader(true);

//     fetch(`https://api.shipap.co.il/clients/signup?token=${TOKEN}`, {
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
//               sx={{ mt: 2, mb: 3 }}
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



// working but the button stuck 

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
// import { useNavigate } from "react-router-dom";
// import { GeneralContext } from "../App";
// import Switch from "@mui/material/Switch";
// import { FormControlLabel } from "@mui/material";
// import { TOKEN } from "../config";
// import Joi from "joi";

// // Import your structure and schema
// import { structure, signupSchema } from "./SignupStructure";

// const defaultTheme = createTheme();

// export default function Signup() {
//   const { setLoader } = useContext(GeneralContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     password: "",
//     imgUrl: "",
//     imgAlt: "",
//     state: "",
//     country: "",
//     city: "",
//     street: "",
//     houseNumber: "",
//     zip: "",
//     business: false, // Initialize boolean field as false
//   });

//   const [errors, setErrors] = useState({});
//   const [isValid, setIsValid] = useState(false);

//   const handleInputChange = (ev) => {
//     const { name, value, type, checked } = ev.target;
//     // If the input is a checkbox, use `checked` instead of `value`
//     const inputValue = type === 'checkbox' ? checked : value;
//     const formDataCopy = {
//       ...formData,
//       [name]: inputValue,
//     };

//     setFormData(formDataCopy);

//     // Validate all fields
//     const validationResults = signupSchema.validate(formDataCopy, {
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

//   const handleSubmit = (ev) => {
//     ev.preventDefault();

//     setLoader(true);

//     fetch(`https://api.shipap.co.il/clients/signup?token=${TOKEN}`, {
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
//             Create Account
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
//                       checked={formData[s.name]} // Bind the checkbox to formData
//                       onChange={handleInputChange} // Handle checkbox change
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
//               sx={{ mt: 2, mb: 3 }}
//               disabled={!isValid}
//             >
//               Sign Up
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }




















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
import Joi, { number } from "joi";
import {structure, signupSchema, pattern} from "./SignupStructure";
import "./Signup.css";

const defaultTheme = createTheme();

// const handleSubmit = (ev) => {
//   ev.preventDefault();
//   const obj = {};
//   const elements = ev.target.elements;

//   structure.forEach((s) => {
//     if (s.type === "boolean") {
//       obj[s.name] = elements[s.name].value === "on";
//     } else {
//       obj[s.name] = elements[s.name].value;
//     }
//   });
// }


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




//option 3 not the best, need some work

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    const signupData = {
      ...formData,
      [name]: value,
    };
  
    setFormData(signupData);
  
    // Validate all fields
    const validationResults = signupSchema.validate(signupData, {
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

