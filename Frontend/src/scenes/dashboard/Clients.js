import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Clients = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const navigate = useNavigate();

  // Fetch clients from API
  const fetchClients = async () => {
    try {
      const response = await axios.get(
        `https://act-production-5e24.up.railway.app/api/clients/${user.id}`
      );
      setClients(response.data.clients);
    } catch (error) {
      console.error("Error fetching clients:", error.message);
    }
  };

  // Handle selecting a client
  const selectClient = (client) => {
    localStorage.setItem("selectedClient", JSON.stringify(client));
    navigate("/home");
  };

  // Handle opening and closing the dialog
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setNewClientName("");
    setOpen(false);
  };

  // Handle adding a new client
  const handleAddClient = async () => {
    try {
      const response = await axios.post(
        `https://act-production-5e24.up.railway.app/api/clients/add`,
        { userId: user.id, name: newClientName }
      );
      setClients([...clients, response.data.client]);
      handleClose();
    } catch (error) {
      console.error("Error adding client:", error.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <Box m="20px">
      <h1>Clients</h1>
      <Box>
        {clients.map((client) => (
          <Box
            key={client.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <span>{client.name}</span>
            <Button
              variant="contained"
              color="primary"
              onClick={() => selectClient(client)}
            >
              Select
            </Button>
          </Box>
        ))}
      </Box>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add Client
      </Button>

      {/* Dialog for adding a new client */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Client Name"
            type="text"
            fullWidth
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddClient} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Clients;
