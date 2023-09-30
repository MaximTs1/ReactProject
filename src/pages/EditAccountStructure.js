import Joi from "joi";


export const structure = [
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
    {
      name: "city",
      type: "text",
      label: "city",
      required: true,
      block: false
    },
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


  export const AccountSchema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    middleName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    email: Joi.string().email({ tlds: { allow: false } }),
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








//   import Avatar from "@mui/material/Avatar";
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
// import { useContext, useState } from "react";
// import { RoleTypes } from "../components/Roles";
// import IconButton from "@mui/material/IconButton";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { signupSchema } from "./SignupStructure";
// import "../user/Signup.css";

// const defaultTheme = createTheme();


// export default function Login() {
//   const { setUser, setLoader, setRoleType, snackbar  } = useContext(GeneralContext);
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);


//   const [formData, setFormData] = useState({
//     password: "",
//     email: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isValid, setIsValid] = useState(false);

//   const handleInputChange = (ev) => {
//     const { id, value } = ev.target;

//     const AccountData = {
//       ...formData,
//       [id]: value,
//     };

//     setFormData(AccountData);

//     const validationResults = signupSchema.validate(AccountData, {
//       abortEarly: true,
//       allowUnknown: true,
//     });
  
//     const newErrors = {};
//     validationResults.error?.details.forEach((error) => {
//       newErrors[error.path[0]] = error.message;
//     });
  
//     setErrors(newErrors);
//     setIsValid(!Object.keys(newErrors).length);

//   };





  
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     setLoader(true);

//     fetch(
//       `https://api.shipap.co.il/clients/login?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`,
//       {
//         credentials: "include",
//         method: "POST",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify({
//           email: data.get("email"),
//           password: data.get("password"),
//         }),
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
//       .then((data) => {
//         setUser(data);
//         setRoleType(RoleTypes.user);
//         snackbar(`${data.fullName} מחובר!`);

//         if (data.business) {
//           setRoleType(RoleTypes.business);
//         } else if (data.admin) {
//           setRoleType(RoleTypes.admin);
//         }
        
//         navigate("/");
//       })
//       .catch((err) => {
//            snackbar(err.message);
//       })
//       .finally(() => setLoader(false));
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//       <form onSubmit={handleSubmit}>
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
//             התחברות
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             noValidate
//             sx={{ mt: 1 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="אימייל"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               error={!!errors["email"]}
//               helperText={errors["email"] || ''}
//               onChange={handleInputChange}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="סיסמה"
//               type={showPassword ? "text" : "password"}
//               id="password"
//               error={!!errors["password"]}
//               helperText={errors["password"] || ''}
//               onChange={handleInputChange}
//               autoComplete="current-password"
//               InputProps={{
//                 endAdornment: (
//                   <IconButton
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? (
//                       <VisibilityOffIcon />
//                     ) : (
//                       <VisibilityIcon />
//                     )}
//                   </IconButton>
//                 ),
//               }}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               // disabled={!isValid}
//             >
//               התחבר
//             </Button>
//             <Grid container justifyContent="center">
//               <Grid item>
//                 <Link to="/signup">להרשמה לחץ כאן</Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <button className="BackButton">
//           <Link to={"/"}>🔙</Link>
//         </button>
//         </form>
//       </Container>
//     </ThemeProvider>
//   );
// }





