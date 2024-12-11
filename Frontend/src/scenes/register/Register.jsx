// import { useState } from 'react';
// import { useSignup } from '../../hooks/useSignup.jsx';
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
// import './register.scss';
// import { tokens } from "../../theme.js";

// const Register = () => {
//   const theme = useTheme();
//   const colors = tokens("dark");
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { signup, error, isLoading } = useSignup();
//   let navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const isSignedUp = await signup(firstName, lastName, email, password);
//     if (isSignedUp) {
//         navigate("/clients"); // Redirect to home
//     } else {
//         console.error("Signup failed. Check error messages above.");
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
//             Signup
//           </Typography>
//         </div>

//         <Box
//           width={"40%"}
//           position="absolute"
//           p="2rem"
//           ml="55rem"
//           mt="4rem"
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
//               id="firstName"
//               label="First Name"
//               name="firstName"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="lastName"
//               label="Last Name"
//               name="lastName"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               autoFocus
//             />
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
//               Sign Up
//             </Button>

//             {error && <Alert severity="error">{error}</Alert>}

//             <a href="/login" onClick={() => navigate('../login')} variant="body2">
//               {"Already have an account? Log In"}
//             </a>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Register;


import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup.jsx';
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
import './register.scss';
import { tokens } from "../../theme.js";

const Register = () => {
  const theme = useTheme();
  const colors = tokens("dark");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSignedUp = await signup(firstName, lastName, email, password);
    if (isSignedUp) {
      navigate("/clients"); // Redirect to home
    } else {
      console.error("Signup failed. Check error messages above.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "#8F87F2" // Light purple background
      }}
    >
      {/* Header */}
      <Box
        sx={{
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
                width: "900px",
                height: "600px",
                maxWidth: "100%",
                objectFit: "cover",
                borderRadius: "1rem"
              }}
            />
          </Box>
        </Box>

        {/* Right Side: Signup Form */}
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
            Sign Up
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
              id="firstName"
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoFocus
              InputProps={{
                style: {
                  backgroundColor: "#D1C7FA"
                }
              }}
              InputLabelProps={{
                style: { color: "#000" }
              }}
            />

            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: "#D1C7FA"
                }
              }}
              InputLabelProps={{
                style: { color: "#000" }
              }}
            />

            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              InputProps={{
                style: {
                  backgroundColor: "#D1C7FA"
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
                  backgroundColor: "#D1C7FA"
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
              Sign Up
            </Button>

            {error && <Alert severity="error">{error}</Alert>}

            <Typography
              variant="body2"
              sx={{ mt: 2, textAlign: "center", textDecoration: "underline", cursor: "pointer", color: "#000" }}
              onClick={() => navigate('../login')}
            >
              Already have an account? Log In
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
