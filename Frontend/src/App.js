import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import Topbar from "./global/Topbar";
import HamburgerMenu from "./global/HamburgerMenu";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login/Login";
import Register from "./scenes/register/Register";
import WatchList from "./scenes/dashboard/watchlist";
import Details from "./scenes/dashboard/details";
import BuyStock from "./scenes/dashboard/buyStock";
import SellStock from "./scenes/dashboard/sellStock";
import LandingPage from "./global/LandingPage";
import Newz from "./scenes/dashboard/news";
import IPO from "./scenes/dashboard/ipo";
import Portfolio from "./scenes/dashboard/Portfolio";
import Orders from "./scenes/dashboard/tradeHistory";
import Testimonials from "./global/Testimonials";
import Clients from "./scenes/dashboard/Clients"; // Import the Clients screen
import Copyright from "./global/Copyright";
import { useState } from "react";

const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;
const selectedClientId = JSON.parse(localStorage.getItem('selectedClient'))?.id;


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Standalone Clients Page */}
          <Route path="/clients" element={<Clients />} />

          {/* Main App Layout */}
          <Route
            path="/home"
            element={
              <div className="app">
                <HamburgerMenu />
                <main className="context">
                  <Topbar />
                  <Dashboard />
                </main>
                {/* <Copyright /> */}
              </div>
            }
          />
          <Route
            path="/watchlist"
            element={
              <div className="app">
                <HamburgerMenu />
                <main className="context">
                  <Topbar />
                  <WatchList />
                </main>
              </div>
            }
          />
          <Route
            path="/details"
            element={
              <div className="app">
                <HamburgerMenu />
                <main className="context">
                  <Topbar />
                  <Details />
                </main>
              </div>
            }
          />
          <Route
            path="/news"
            element={
              <div className="app">
                <HamburgerMenu />
                <main className="context">
                  <Topbar />
                  <Newz />
                </main>
              </div>
            }
          />
          <Route
            path="/ipo"
            element={
              <div className="app">
                <HamburgerMenu />
                <main className="context">
                  <Topbar />
                  <IPO />
                </main>
              </div>
            }
          />
          <Route
            path="/buyStock"
            element={
              <div className="app">
                <HamburgerMenu />
                <main className="context">
                  <Topbar />
                  <BuyStock />
                </main>
              </div>
            }
          />
          <Route
            path="/sellStock"
            element={
              <div className="app">
                <HamburgerMenu />
                <main className="context">
                  <Topbar />
                  <SellStock />
                </main>
              </div>
            }
          />
          <Route
            path="/portfolio"
            element={
              <div className="app">
                <HamburgerMenu />
                <main className="context">
                  <Topbar />
                  <Portfolio />
                </main>
              </div>
            }
          />
          <Route
            path="/orders"
            element={
              <div className="app">
                <HamburgerMenu />
                <main className="context">
                  <Topbar />
                  <Orders userId={currentUserId} clientId={selectedClientId} />
                </main>
              </div>
            }
          />

          <Route
            path="/testimonials"
            element={
              <div className="app">
                <HamburgerMenu />
                <main className="context">
                  <Topbar />
                  <Testimonials />
                </main>
              </div>
            }
          />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
