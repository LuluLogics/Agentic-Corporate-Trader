// import { useState } from "react";
// import { useLogin } from '../../hooks/useLogin.jsx'
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// // import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// // import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// // import Typography from '@mui/material/Typography';
// import { useNavigate, Navigate } from "react-router-dom";

// import { Box, Typography, useTheme } from "@mui/material";
// import { flexbox } from "@mui/system";
// import './login.scss';
// import { tokens } from "../../theme.js";
// import Alert from '@mui/material/Alert';

// const Login = () => {
//   const theme = useTheme();
//   const colors = tokens("dark");
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const {login, error, isLoading} = useLogin();
//     const [redirect, setRedirect] = useState();
//     let navigate = useNavigate();

//     const redirectHandler = async(e) =>{
//       // setRedirect(true)
//       navigate('../login')
//     }

//     const handleSubmit = async (e) =>{
//         e.preventDefault()
//         // console.log(error)

//         const isLoggedIn= await login(email,password)
       
//     isLoggedIn ?navigate('../home'):navigate('../login')
//     }
//   return (
//     <Box sx={{display:flexbox, backgroundColor:colors.blueAccent[400]}}>
//       <Box
//         width="100%"
//         backgroundColor={theme.palette.background.alt}
//         p="1rem 7%"
//         textAlign="center"
//       >
//         <Typography fontWeight="bold" fontSize="32px" color="primary">
//             Stock Portfolio Manager
//         </Typography>
//       </Box>
    
//       <Box m="2rem" className="backImage" display="inline-flex">
//         <img src="http://www.jonesday.com/-/media/images/news/2021/07/spoofing_and_disruptive_trading_social.jpg" width="800" height="569" alt="ios" loading="lazy"/> 
//          <div class="Login">
//             <Avatar sx={{ bgcolor: 'secondary.main' }}>
//                 <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//                 Login
//             </Typography>
//         </div>
        
//         <Box
//             width={"40%"}
//             position="absolute"
//             p="2rem"
//             ml="55rem"
//             mt="8rem"
//             pb="10rem"
//             borderRadius="1.5rem"
//             // backgroundColor={theme.palette.background.alt}
//         >
        
//         <Box component="form"  width="62%" noValidate justifyContent="space-between" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//                  <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     id="email"
//                     label="Email Address"
//                     name="email"
//                     value = {email}
//                     onChange={(e) =>{setEmail(e.target.value)}}
//                     autoComplete="email"
//                     // ref={emailRef}
//                     autoFocus
//                 />
//                 <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     onChange={(e) =>{setPassword(e.target.value)}}
//                     id="password"
//                     value = {password}
//                     // ref={passwordRef}
//                     autoComplete="current-password"
//                 />

                
//                 <Button
//                     type="submit"
//                     disabled={isLoading}
//                     fullWidth
//                     variant="contained"
//                     sx={{ mt: 3, mb: 2 }}
//                 >
//                     Log In
//                 </Button>
//                 {/* {error && <><div className="error">{error}</div><Navigate to="/login" replace={true} /></>} */}
//                 {error && <><Alert severity="error">{error}</Alert><Navigate to="/login" replace={true} /></>}
//                 {/* {!error && <Navigate to="/home" replace={true}/>} */}
//                 {/* {login && (<Navigate to="/login" replace={true} />)} */}
//                 <a href="/register" onClick={redirectHandler} variant="body2">
//                     {"Don't have an account? Sign In"}
//                     {/* {setRedirect(true)} */}
//                 </a>
//             </Box>

//       </Box>
//       </Box>
      
//     </Box>
//   );
// };

// export default Login;





// // //firebase setup
// // import React, { useState } from "react";
// // import { useLogin } from "../../hooks/useLogin";
// // import { TextField, Button, Alert } from "@mui/material";

// // const Login = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const { login, error, isLoading } = useLogin();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const isLoggedIn = await login(email, password);
// //     if (isLoggedIn) {
// //       console.log("Login successful!");
// //       // Navigate to home or perform another action
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <TextField
// //         label="Email"
// //         value={email}
// //         onChange={(e) => setEmail(e.target.value)}
// //       />
// //       <TextField
// //         label="Password"
// //         type="password"
// //         value={password}
// //         onChange={(e) => setPassword(e.target.value)}
// //       />
// //       <Button type="submit" disabled={isLoading}>
// //         {isLoading ? "Logging in..." : "Log In"}
// //       </Button>
// //       {error && <Alert severity="error">{error}</Alert>}
// //     </form>
// //   );
// // };

// // export default Login;



// FIREBASE SETUP
import { useState } from "react";
import { useLogin } from '../../hooks/useLogin.jsx';
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  useTheme,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './login.scss';
import { tokens } from "../../theme.js";

const Login = () => {
  const theme = useTheme();
  const colors = tokens("dark");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isLoggedIn = await login(email, password);
    if (isLoggedIn) {
      navigate('../home');
    }
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: colors.blueAccent[400] }}>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 7%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Stock Portfolio Manager
        </Typography>
      </Box>

      <Box m="2rem" className="backImage" display="inline-flex">
        <img
          src="http://www.jonesday.com/-/media/images/news/2021/07/spoofing_and_disruptive_trading_social.jpg"
          width="800"
          height="569"
          alt="ios"
          loading="lazy"
        />
        <div className="Login">
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
        </div>

        <Box
          width={"40%"}
          position="absolute"
          p="2rem"
          ml="55rem"
          mt="8rem"
          pb="10rem"
          borderRadius="1.5rem"
        >
          <Box
            component="form"
            width="62%"
            noValidate
            justifyContent="space-between"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              disabled={isLoading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>

            {error && <Alert severity="error">{error}</Alert>}

            <a href="/register" onClick={() => navigate('../register')} variant="body2">
              {"Don't have an account? Sign Up"}
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

