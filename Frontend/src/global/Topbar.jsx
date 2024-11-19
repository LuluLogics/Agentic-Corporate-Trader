import { Typography, Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { ColorModeContext, tokens } from "./../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useLogout } from "./../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
import { rows } from "../Symbol";

const filterOptions = createFilterOptions({
  matchFrom: "any",
  limit: 10,
});

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { logout } = useLogout();
  const [userBal, setUserBal] = useState(0); // User balance state
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user info from localStorage
  let navigate = useNavigate();

  // Fetch user balance from the database using an API call
  useEffect(() => {
    const fetchUserBalance = async () => {
      if (user?.id) {
        try {
          const response = await axios.get(
            `https://act-production-5e24.up.railway.app/api/user/balance/${user.id}`
          );
          setUserBal(response.data.balance); // Assuming `balance` is returned in the response
        } catch (error) {
          console.error("Error fetching user balance:", error);
        }
      }
    };

    fetchUserBalance();
  }, [user]);

  // Logout handler
  const logoutHandler = async (event) => {
    await logout(); // Logout logic (e.g., Firebase logout)
    navigate("../"); // Redirect to login or home page
  };

  // Redirect to payment page when wallet icon is clicked
  const handleWalletClick = () => {
    navigate("/payment"); // Replace with your actual payment page route
  };

  return (
    <div display="fixed">
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        {/* App Title */}
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "5px 5px 5px 5px" }}
        >
          Stock Portfolio Manager
        </Typography>

        {/* Search Bar (Optional) */}
        <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
          <Autocomplete
            filterOptions={filterOptions}
            options={rows}
            getOptionLabel={(option) => option.description}
            style={{ width: 500, color: "black" }}
            renderInput={(params) => (
              <TextField {...params} label="Enter Name" placeholder="Add Company" />
            )}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* User Actions */}
        <Box display="flex">
          {/* Wallet Icon with Balance */}
          <IconButton
            sx={{ border: 1, borderRadius: 3 }}
            onClick={handleWalletClick} // Redirect to payment page on click
          >
            <AccountBalanceWalletOutlinedIcon sx={{ mr: "10px" }} />
            ${userBal ? userBal.toFixed(2) : "0.00"}
          </IconButton>

          {/* Dark Mode Toggle */}
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>

          {/* Notifications Icon (Optional) */}
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>

          {/* Settings Icon (Optional) */}
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>

          {/* Logout Button */}
          <IconButton onClick={logoutHandler}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
};

export default Topbar;
