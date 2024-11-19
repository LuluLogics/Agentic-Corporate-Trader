import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Headers";
import Paper from "@mui/material/Paper";

const Portfolio = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve logged-in user data
  const history = useNavigate();
  const [rows, setRows] = useState([]); // Portfolio data rows
  const [invAmt, setInvAmt] = useState(0); // Total invested amount
  const [currAmt, setCurrAmt] = useState(0); // Current market value
  const [tProfit, setTProfit] = useState(0); // Total profit or loss
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch portfolio data from the backend
  const fetchPortfolio = async () => {
    if (!user || !user.id) {
      console.error("User ID is missing. Please log in again.");
      return;
    }

    try {
      // API call to the backend
      const response = await axios.get(
        `https://act-production-5e24.up.railway.app/api/portfolio/${user.id}`
      );

      const portfolioData = response.data;

      // Calculate totals
      let totalInvestedAmount = 0;
      let totalCurrentAmount = 0;
      let totalProfitOrLoss = 0;

      // Transform data for the DataGrid
      const transformedData = portfolioData.map((stock) => {
        totalInvestedAmount += stock.investedAmount || 0;
        totalCurrentAmount += stock.currentAmount || 0;
        totalProfitOrLoss += stock.profitLoss || 0;

        return {
          id: stock.id, // Unique ID for the grid
          name: stock.name,
          symbol: stock.symbol,
          today: stock.currentPrice || "N/A",
          buyPrice: stock.averagePrice || "N/A",
          shares: stock.quantity || "N/A",
          currAmount: stock.currentAmount || "N/A",
          invAmount: stock.investedAmount || "N/A",
          profit: stock.profitLoss || "N/A",
          open: stock.open || "N/A",
          high: stock.high || "N/A",
          low: stock.low || "N/A",
          close: stock.close || "N/A",
        };
      });

      setInvAmt(totalInvestedAmount);
      setCurrAmt(totalCurrentAmount);
      setTProfit(totalProfitOrLoss);
      setRows(transformedData);
    } catch (error) {
      console.error("Error fetching portfolio:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const columns = [
    { field: "name", headerName: "Company Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "symbol", headerName: "Symbol", flex: 0.5, cellClassName: "symbol-column--cell" },
    { field: "today", headerName: "Current Price", flex: 0.5, type: "number", headerAlign: "left", align: "left" },
    { field: "buyPrice", headerName: "Average Price", flex: 0.5, type: "number", headerAlign: "left", align: "left" },
    { field: "shares", headerName: "Quantity", flex: 0.5, type: "number", headerAlign: "left", align: "left" },
    { field: "currAmount", headerName: "Current Amount", flex: 0.5, type: "number", headerAlign: "left", align: "left" },
    { field: "invAmount", headerName: "Invested Amount", flex: 0.5, type: "number", headerAlign: "left", align: "left" },
    { field: "profit", headerName: "Profit/Loss", flex: 0.5, type: "number", headerAlign: "left", align: "left" },
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
  ];

  return (
    <Box m="20px">
      <Header title="Portfolio" />
      <Paper elevation={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5, m: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
          <div style={{ margin: "5px 15px", fontWeight: "bold", paddingRight: "50px", fontSize: "x-large" }}>
            {"Invested Amount: "} <div style={{ color: "blue", textAlign: "center" }}>$ {invAmt.toFixed(2)}</div>
          </div>
          <div style={{ margin: "5px 15px", fontWeight: "bold", paddingRight: "50px", fontSize: "x-large" }}>
            {"Current Amount: "} <div style={{ color: "blue", textAlign: "center" }}>$ {currAmt.toFixed(2)}</div>
          </div>
          <div style={{ margin: "5px 15px", fontWeight: "bold", paddingRight: "50px", fontSize: "x-large" }}>
            {"Profit/Loss: "} <div style={{ color: "#03C03C", textAlign: "center" }}>$ {tProfit.toFixed(2)}</div>
          </div>
        </Box>
      </Paper>
      <Box m="40px 0 0 0" height="75vh" sx={{ "& .MuiDataGrid-root": { border: "none" } }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          loading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default Portfolio;
