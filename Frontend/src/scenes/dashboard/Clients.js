import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import Header from "../../components/Headers";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

const Clients = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [clients, setClients] = useState([]); // List of clients
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog visibility
  const [newClientName, setNewClientName] = useState(""); // New client name
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch clients for the current user
  const fetchClients = async () => {
    try {
      const response = await axios.get(`https://your-backend-url/api/clients/${user.id}`);
      setClients(response.data.clients || []);
    } catch (error) {
      console.error("Error fetching clients:", error.message);
    }
  };

  // Add a new client
  const handleAddClient = async () => {
    if (!newClientName.trim()) {
      alert("Client name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(`https://your-backend-url/api/clients/add`, {
        userId: user.id,
        clientName: newClientName,
      });

      // Update the clients list after adding
      setClients([...clients, response.data.newClient]);
      setNewClientName(""); // Clear the input
      setIsDialogOpen(false); // Close the dialog
    } catch (error) {
      console.error("Error adding client:", error.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const columns = [
    { field: "name", headerName: "Client Name", flex: 1 },
    {
      field: "View",
      headerName: "View",
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => {
            // Navigate to the main site with selected client
            localStorage.setItem("selectedClient", JSON.stringify(params.row));
            window.location.href = "/main"; // Change to your main app route
          }}
          variant="contained"
          color="primary"
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Clients" subtitle="Manage Your Clients" />
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Button variant="contained" color="success" onClick={() => setIsDialogOpen(true)}>
          Add Client
        </Button>
      </Paper>
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid rows={clients} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>

      {/* Add Client Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
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
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddClient} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Clients;