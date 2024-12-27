import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Headers";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const storedData = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = storedData?.id;
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlertsDialog, setOpenAlertsDialog] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [ticker, setTicker] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [alertPrice, setAlertPrice] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const history = useNavigate();

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

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get(
        `https://act-production-5e24.up.railway.app/api/watchlist/${userId}`
      );
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching watchlist:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPriceAlerts = async () => {
    try {
      const response = await axios.get(
        `https://act-production-5e24.up.railway.app/api/alerts/${userId}`
      );
      setAlerts(response.data);
      setOpenAlertsDialog(true);
    } catch (error) {
      console.error("Error fetching price alerts:", error.response?.data || error.message);
    }
  };

  const deletePriceAlert = async (alertId) => {
    try {
      await axios.delete(
        `https://act-production-5e24.up.railway.app/api/alerts/remove`,
        { data: { userId, alertId } }
      );
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== alertId));
    } catch (error) {
      console.error("Error deleting price alert:", error.response?.data || error.message);
    }
  };

  const handleAlertsDialogClose = () => {
    setOpenAlertsDialog(false);
    setAlerts([]);
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const columns = [
    { field: "name", headerName: "Company Name", flex: 1 },
    { field: "symbol", headerName: "Symbol", flex: 0.5 },
    { field: "today", headerName: "Current Price", flex: 0.5, type: "number" },
    { field: "Percent", headerName: "Percent Change", flex: 0.5, type: "number" },
    { field: "open", headerName: "Open", flex: 0.3, type: "number" },
    { field: "high", headerName: "High", flex: 0.3, type: "number" },
    { field: "low", headerName: "Low", flex: 0.3, type: "number" },
    { field: "close", headerName: "Close", flex: 0.3, type: "number" },
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
    {
      field: "Buy",
      headerName: "Buy",
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => history("/buyStock", { state: params.row })}
          variant="contained"
          color="success"
        >
          Buy
        </Button>
      ),
    },
    {
      field: "Sell",
      headerName: "Sell",
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => history("/sellStock", { state: params.row })}
          variant="outlined"
          color="error"
        >
          Sell
        </Button>
      ),
    },
    {
      field: "Delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => (
        <DeleteIcon
          onClick={() => deleteWatchlistItem(params.row.symbol)}
          style={{ cursor: "pointer", color: "red" }}
        />
      ),
    },
    {
      field: "Details",
      headerName: "Details",
      sortable: false,
      renderCell: (params) => (
        <AddCircleOutlineIcon
          onClick={() => history("/details", { state: params.row })}
          style={{ cursor: "pointer" }}
        />
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Watchlist" subtitle="Your Watchlisted Stocks" />
      <Button
        variant="contained"
        color="primary"
        onClick={fetchPriceAlerts}
        style={{ marginBottom: "20px" }}
      >
        View Price Alerts
      </Button>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          loading={isLoading}
        />
      </Box>

      {/* Dialog for Adding Price Alert */}
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

      {/* Dialog for Viewing Price Alerts */}
      <Dialog open={openAlertsDialog} onClose={handleAlertsDialogClose}>
        <DialogTitle>Your Price Alerts</DialogTitle>
        <DialogContent>
          {alerts.map((alert) => (
            <Box key={alert.id} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography>
                {alert.stockSymbol} - {alert.condition} {alert.targetPrice}
              </Typography>
              <DeleteIcon
                onClick={() => deletePriceAlert(alert.id)}
                style={{ cursor: "pointer", color: "red" }}
              />
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertsDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Watchlist;
