import React, { useEffect, useState } from "react";
import "./Clients.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Copyright from "../../global/Copyright";
import clientImage from './client.png'; // Import the image file

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch clients from the API
  const fetchClients = async () => {
    try {
      const response = await axios.get(
        `https://act-production-5e24.up.railway.app/api/clients/${user.id}`
      );
      setClients(response.data.clients || []);
    } catch (error) {
      console.error("Error fetching clients:", error.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Add new client
  const addClient = async () => {
    try {
      await axios.post(
        `https://act-production-5e24.up.railway.app/api/clients/add/${user.id}`,
        { clientName: newClientName } // Fix the key to match the API
      );
      setNewClientName("");
      setShowModal(false);
      fetchClients(); // Refresh client list
    } catch (error) {
      console.error("Error adding client:", error.message);
    }
  };

  const handleClientClick = (clientId) => {
    // Store the selected client in localStorage and navigate to the dashboard
    localStorage.setItem("selectedClient", JSON.stringify(clientId));
    navigate("/home");
  };

  return (
    <Box 
      sx={{ 
        width: "100%", 
        minHeight: "100vh",
        display: "flex", 
        flexDirection: "column",
        backgroundColor: "#141b2d" 
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <EqualizerIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
              Client Management
            </a>
          </Typography>

          <Button color="inherit" onClick={() => setShowModal(true)}>
            Add Client
          </Button>
        </Toolbar>
      </AppBar>

      <Typography
        sx={{
          width: "100%",
          fontSize: 50,
          color: "white",
          textAlign: "center",
          mt: "1%",
          pt: "8%",
          pb: "2%"
        }}
      >
        Your Clients
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {clients.map((client, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <div className="client-tile" onClick={() => handleClientClick(client.id)}>
              <Typography variant="h6" className="client-name">
                {client.name}
              </Typography>
              <img
                className="client-image"
                src={clientImage}
                alt="Client"
                style={{ height: "230px", width: "200px" }}
              />
            </div>
          </Grid>
        ))}
      </Grid>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box className="modal-box">
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Add New Client
          </Typography>
          <TextField
            label="Client Name"
            variant="outlined"
            fullWidth
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={addClient}>
              Create
            </Button>
            <Button variant="outlined" color="error" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <Copyright sx={{
        position: "absolute",
        bottom: "10px", 
        left: "50%", 
        transform: "translateX(-50%)", 
        color: "white"
      }}
      />

    </Box>
  );
};

export default Clients;
