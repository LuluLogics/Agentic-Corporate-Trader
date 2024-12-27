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
  const [ticker, setTicker] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [alertPrice, setAlertPrice] = useState("");

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

  // Fetch watchlisted stocks for the current user
  const fetchWatchlist = async () => {
    // Retrieve user ID and client ID from localStorage
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const selectedClient = JSON.parse(localStorage.getItem("selectedClient")) || null;

    const userId = user?.id; // Ensure the userId is valid
    const clientId = selectedClient?.id || selectedClient; // Ensure the clientId is valid

    if (!userId || !clientId) {
        console.error("User ID or Client ID is missing or undefined.");
        alert("User ID or Client ID is missing. Please log in again.");
        return;
    }

    try {
        const response = await axios.get(
            `https://act-production-5e24.up.railway.app/api/watchlist/${userId}/${clientId}`
        );
        console.log("Fetched watchlist:", response.data);

        const transformedData = await Promise.all(
            response.data.map(async (stock, index) => {
                try {
                    const stockUrl = `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=ce80b8aad3i4pjr4v2ggce80b8aad3i4pjr4v2h0`;
                    const stockResponse = await axios.get(stockUrl);
                    const stockData = stockResponse.data;

                    return {
                        id: index, // Unique ID for DataGrid
                        name: stock.ticker, // Placeholder for company name (adjust if needed)
                        symbol: stock.ticker, // Symbol of the stock
                        today: stockData.c || "N/A", // Current price
                        Percent: stockData.dp ? `${stockData.dp}%` : "N/A", // Percent change
                        open: stockData.o || "N/A", // Open price
                        high: stockData.h || "N/A", // High price
                        low: stockData.l || "N/A", // Low price
                        close: stockData.pc || "N/A", // Previous close price
                        delete: stock.ticker, // For delete functionality
                        ids: stock.ticker, // Maintain unique reference for operations
                    };
                } catch (stockError) {
                    console.error(`Error fetching stock data for ${stock.ticker}:`, stockError);
                    return {
                        id: index,
                        name: stock.ticker,
                        symbol: stock.ticker,
                        today: "N/A",
                        Percent: "N/A",
                        open: "N/A",
                        high: "N/A",
                        low: "N/A",
                        close: "N/A",
                        delete: stock.ticker,
                        ids: stock.ticker,
                    };
                }
            })
        );

        setRows(transformedData); // Update the DataGrid rows with transformed data
    } catch (error) {
        console.error("Error fetching watchlist:", error.response?.data || error.message);
    } finally {
        setIsLoading(false);
    }
};


  // Delete a stock from the user's watchlist
  const deleteWatchlistItem = async (stockTicker) => {
    // Retrieve user and selected client from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")) || null;
    const selectedClient = JSON.parse(localStorage.getItem("selectedClient")) || null;

    const userId = storedUser?.id; // Extract userId
    const clientId = typeof selectedClient === "string" ? selectedClient : selectedClient?.id; // Ensure clientId is valid

    // Validation check for required IDs
    if (!userId || !clientId) {
        console.error("User ID or Client ID is missing or undefined.");
        alert("User ID or Client ID is missing. Please log in again.");
        return;
    }

    try {
        // Make the API call to delete the stock
        await axios.delete("https://act-production-5e24.up.railway.app/api/watchlist/remove", {
            data: { userId, clientId, stockTicker }, // Include userId and clientId in the request
        });

        console.log(`Removed ${stockTicker} from client's watchlist.`);

        // Update the rows state
        setRows((prevRows) => prevRows.filter((row) => row.symbol !== stockTicker)); // Update rows to remove the deleted stock
    } catch (error) {
        console.error("Error removing stock from client's watchlist:", error.response?.data || error.message);
    }
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
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
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
    </Box>
  );
};

export default Watchlist;
