import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Headers";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Watchlist = () => {
  const storedData = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = storedData?.id; // Retrieve the user ID from localStorage

  const [rows, setRows] = useState([]); // Watchlisted stocks
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false); // State to handle dialog
  const [viewAlertsDialog, setViewAlertsDialog] = useState(false); // State to handle view alerts dialog
  const [ticker, setTicker] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [alertPrice, setAlertPrice] = useState("");
  const [priceAlerts, setPriceAlerts] = useState([]); // State for price alerts

  const history = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDialogOpen = async (stockTicker) => {
    try {
      const stockUrl = `https://finnhub.io/api/v1/quote?symbol=${stockTicker}&token=ce80b8aad3i4pjr4v2ggce80b8aad3i4pjr4v2h0`;
      const response = await axios.get(stockUrl);
      setTicker(stockTicker);
      setCurrentPrice(response.data.c || "N/A");
      setOpenDialog(true);
    } catch (error) {
      console.error("Error fetching stock price:", error.response?.data || error.message);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setTicker("");
    setCurrentPrice("");
    setAlertPrice("");
  };

  const handlePriceAlertSubmit = async () => {
    if (!ticker || !alertPrice) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user")) || null;
      const selectedClient = JSON.parse(localStorage.getItem("selectedClient")) || null;

      const userId = user?.id;
      const clientId = selectedClient?.id || selectedClient;

      if (!userId || !clientId) {
        alert("User ID or Client ID is missing. Please log in again.");
        return;
      }

      await axios.post("https://act-production-5e24.up.railway.app/api/alerts/add", {
        userId,
        stockSymbol: ticker,
        targetPrice: parseFloat(alertPrice),
        condition: parseFloat(alertPrice) > parseFloat(currentPrice) ? "above" : "below",
      });

      alert("Price alert added successfully.");
      handleDialogClose();
    } catch (error) {
      console.error("Error adding price alert:", error.response?.data || error.message);
    }
  };

  const fetchPriceAlerts = async () => {
    try {
      const response = await axios.get(`https://act-production-5e24.up.railway.app/api/alerts/${userId}`);
      setPriceAlerts(response.data);
    } catch (error) {
      console.error("Error fetching price alerts:", error.response?.data || error.message);
    }
  };

  const handleViewAlerts = async () => {
    await fetchPriceAlerts();
    setViewAlertsDialog(true);
  };

  const handleDeleteAlert = async (alertId) => {
    try {
      await axios.delete(`https://act-production-5e24.up.railway.app/api/alerts/delete/${alertId}`);
      setPriceAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== alertId));
      alert("Price alert deleted successfully.");
    } catch (error) {
      console.error("Error deleting price alert:", error.response?.data || error.message);
    }
  };

  const handleViewAlertsClose = () => {
    setViewAlertsDialog(false);
  };

  // Fetch watchlisted stocks for the current user
  const fetchWatchlist = async () => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const selectedClient = JSON.parse(localStorage.getItem("selectedClient")) || null;

    const userId = user?.id;
    const clientId = selectedClient?.id || selectedClient;

    if (!userId || !clientId) {
      console.error("User ID or Client ID is missing or undefined.");
      alert("User ID or Client ID is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(
        `https://act-production-5e24.up.railway.app/api/watchlist/${userId}/${clientId}`
      );
      const transformedData = await Promise.all(
        response.data.map(async (stock, index) => {
          const stockUrl = `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=ce80b8aad3i4pjr4v2ggce80b8aad3i4pjr4v2h0`;
          const stockResponse = await axios.get(stockUrl);
          return {
            id: index,
            name: stock.ticker,
            symbol: stock.ticker,
            today: stockResponse.data.c || "N/A",
            Percent: stockResponse.data.dp ? `${stockResponse.data.dp}%` : "N/A",
          };
        })
      );
      setRows(transformedData);
    } catch (error) {
      console.error("Error fetching watchlist:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const columns = [
    { field: "name", headerName: "Company Name", flex: 1 },
    { field: "symbol", headerName: "Symbol", flex: 0.5 },
    { field: "today", headerName: "Current Price", flex: 0.5 },
    { field: "Percent", headerName: "Percent Change", flex: 0.5 },
    {
      field: "Add Alert",
      headerName: "Price Alert",
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => handleDialogOpen(params.row.symbol)}
          variant="contained"
          color="info"
        >
          Add Alert
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Watchlist" subtitle="Your Watchlisted Stocks" />
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewAlerts}
        >
          View All Price Alerts
        </Button>
      </Box>
      <Box height="75vh">
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          loading={isLoading}
        />
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Price Alert</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Stock Ticker"
            type="text"
            fullWidth
            value={ticker}
            disabled
          />
          <TextField
            margin="dense"
            label="Current Price"
            type="number"
            fullWidth
            value={currentPrice}
            disabled
          />
          <TextField
            margin="dense"
            label="Alert Price"
            type="number"
            fullWidth
            value={alertPrice}
            onChange={(e) => setAlertPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePriceAlertSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={viewAlertsDialog} onClose={handleViewAlertsClose} maxWidth="sm" fullWidth>
        <DialogTitle>All Price Alerts</DialogTitle>
        <DialogContent>
          {priceAlerts.map((alert) => (
            <Box
              key={alert.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography>{`${alert.stockSymbol} - Alert at ${alert.targetPrice} (${alert.condition})`}</Typography>
              <Button
                onClick={() => handleDeleteAlert(alert.id)}
                variant="outlined"
                color="error"
              >
                Delete
              </Button>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewAlertsClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Watchlist;
