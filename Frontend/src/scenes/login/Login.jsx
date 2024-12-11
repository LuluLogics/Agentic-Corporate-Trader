// import { useState } from "react";
// import { useLogin } from '../../hooks/useLogin.jsx';
// import { useNavigate } from "react-router-dom";
// import {
//   Avatar,
//   Button,
//   TextField,
//   Box,
//   Typography,
//   useTheme,
//   Alert,
// } from "@mui/material";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import './login.scss';
// import { tokens } from "../../theme.js";

// const Login = () => {
//   const theme = useTheme();
//   const colors = tokens("dark");
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login, error, isLoading } = useLogin(); // Using the updated `useLogin` hook
//   let navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const isLoggedIn = await login(email, password); // Attempt login using `useLogin`
//     if (isLoggedIn) {
//       navigate('../clients'); // Redirect to home on success
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", backgroundColor: colors.blueAccent[400] }}>
//       <Box
//         width="100%"
//         backgroundColor={theme.palette.background.alt}
//         p="1rem 7%"
//         textAlign="center"
//       >
//         <Typography fontWeight="bold" fontSize="32px" color="primary">
//           Stock Portfolio Manager
//         </Typography>
//       </Box>

//       <Box m="2rem" className="backImage" display="inline-flex">
//         <img
//           src="http://www.jonesday.com/-/media/images/news/2021/07/spoofing_and_disruptive_trading_social.jpg"
//           width="800"
//           height="569"
//           alt="ios"
//           loading="lazy"
//         />
//         <div className="Login">
//           <Avatar sx={{ bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Login
//           </Typography>
//         </div>

//         <Box
//           width={"40%"}
//           position="absolute"
//           p="2rem"
//           ml="55rem"
//           mt="8rem"
//           pb="10rem"
//           borderRadius="1.5rem"
//         >
//           <Box
//             component="form"
//             width="62%"
//             noValidate
//             justifyContent="space-between"
//             onSubmit={handleSubmit}
//             sx={{ mt: 1 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               autoComplete="current-password"
//             />

//             <Button
//               type="submit"
//               disabled={isLoading}
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Log In
//             </Button>

//             {error && <Alert severity="error">{error}</Alert>}

//             <a href="/register" onClick={() => navigate('../register')} variant="body2">
//               {"Don't have an account? Sign Up"}
//             </a>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Login;

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
      navigate('../clients');
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#8F87F2", // Light purple background
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          p: "1rem",
        }}
      >
        <Typography fontWeight="bold" fontSize="32px" color="#000">
          Stock Portfolio Manager
        </Typography>
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4rem",
          p: "2rem"
        }}
      >
        {/* Left Side Image */}
        <Box 
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Box sx={{ borderRadius: "1rem", overflow: "hidden" }}>
            <img
              src="http://www.jonesday.com/-/media/images/news/2021/07/spoofing_and_disruptive_trading_social.jpg"
              alt="Stock Graph"
              style={{
                width: "600px",
                height: "auto",
                maxWidth: "100%",
                objectFit: "cover",
                borderRadius: "1rem"
              }}
            />
          </Box>
        </Box>

        {/* Right Side: Login Form */}
        <Box
          sx={{
            backgroundColor: theme.palette.background.alt,
            borderRadius: "1rem",
            padding: "2rem",
            width: "350px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main', mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2, color: "#000" }}>
            Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            }}
            noValidate
          >
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
              InputProps={{
                style: {
                  backgroundColor: "#D1C7FA" // Light purple input background
                }
              }}
              InputLabelProps={{
                style: { color: "#000" }
              }}
            />

            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              InputProps={{
                style: {
                  backgroundColor: "#D1C7FA" // Same light purple input background
                }
              }}
              InputLabelProps={{
                style: { color: "#000" }
              }}
            />

            <Button
              type="submit"
              disabled={isLoading}
              fullWidth
              variant="contained"
              sx={{ mt: 1, backgroundColor: "#000", color: "#fff", "&:hover": { backgroundColor: "#333" } }}
            >
              Log In
            </Button>

            {error && <Alert severity="error">{error}</Alert>}

            <Typography
              variant="body2"
              sx={{ mt: 2, textAlign: "center", textDecoration: "underline", cursor: "pointer", color: "#000" }}
              onClick={() => navigate('../register')}
            >
              Don't have an account? Sign Up
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
