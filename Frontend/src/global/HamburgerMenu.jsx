import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountBalanceSharpIcon from "@mui/icons-material/AccountBalanceSharp";
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp";
import MultilineChartSharpIcon from "@mui/icons-material/MultilineChartSharp";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import Divider from '@mui/material/Divider';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Link
        to={to}
        style={{
          textDecoration: "none",
          color: colors.grey[100],
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  );
};

const HamburgerMenu = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();
  const storedData = JSON.parse(localStorage.getItem("user") || "{}");

  const handleClientsClick = () => {
    // Remove selected client from localStorage
    localStorage.removeItem("selectedClient");
    // Navigate to the Clients page
    navigate("/clients");
  };

  return (
    <Box
      sx={{
        "& .sidebar-root": {
          backgroundColor: colors.primary[700],
        },
        "& .icon-wrapper": {
          backgroundColor: colors.primary[300],
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .menu-item.active": {
          color: "#FFFFFF !important",
        },
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        rootStyles={{
          backgroundColor: colors.primary[1000],
        }}
      >
        <Box isCollapsed sx={{ backgroundColor: colors.background }}>
          <Menu iconshape="square">
            <MenuItem
              onClick={() => {
                collapseSidebar();
                setIsCollapsed(!isCollapsed);
              }}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.blueAccent[700],
              }}
            >
              {!isCollapsed && (
                <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                  <Typography variant="h3" color={colors.grey[100]}>
                    Menu
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src="https://thumbs.dreamstime.com/b/man-business-suit-icon-illustration-98773345.jpg"
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {storedData?.firstName && storedData?.lastName
                      ? `${storedData.firstName} ${storedData.lastName}`
                      : "User"}
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[100]}>
                    Elite Investor
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "1%"}>
              <Item
                title="Dashboard"
                to="/home"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Clients"
                to="/clients"
                icon={<AccountCircleIcon />}
                selected={selected}
                setSelected={setSelected}
                onClick={handleClientsClick} // Navigate and clear selectedClient
              />
              <Typography variant="h6" color={colors.grey[100]} sx={{ m: "15px 0 5px 20px" }}>
                Data
              </Typography>
              <Item
                title="Watchlist"
                to="/watchlist"
                icon={<AccountBalanceSharpIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Portfolio"
                to="/portfolio"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Orders"
                to="/orders"
                icon={<ReceiptLongOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography variant="h6" color={colors.grey[100]} sx={{ m: "15px 0 5px 20px" }}>
                Pages
              </Typography>
              <Item
                title="News"
                to="/news"
                icon={<NewspaperOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="IPO"
                to="/ipo"
                icon={<CandlestickChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Reviews"
                to="/testimonials"
                icon={<RateReviewOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </Box>
      </Sidebar>
    </Box>
  );
};

export default HamburgerMenu;
