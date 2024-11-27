import React, { useEffect, useState } from "react";
import { Box, Button, Paper } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import Header from "../../components/Headers";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Get the logged-in user
  const selectedClient = JSON.parse(localStorage.getItem("selectedClient")); // Get the selected client
  const history = useNavigate();
  const [rows, setRows] = useState([]);
  const [invAmt, setInvAmt] = useState(0);
  const [currAmt, setCurrAmt] = useState(0);
  const [tProfit, setTProfit] = useState(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch the portfolio for the selected client
  const fetchPortfolio = async () => {
    if (!user || !selectedClient) {
      console.error("User or selected client is missing.");
      return;
    }

    try {
      const response = await axios.get(
        `https://act-production-5e24.up.railway.app/api/portfolio/${user.id}/${selectedClient}`
      );

      const portfolioData = response.data.portfolio || [];

      let totalInvestedAmount = 0;
      let totalCurrentAmount = 0;

      const updatedPortfolio = await Promise.all(
        portfolioData.map(async (stock) => {
          try {
            const finnHubResponse = await axios.get(
              `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=ce80b8aad3i4pjr4v2ggce80b8aad3i4pjr4v2h0`
            );
            const currentPrice = finnHubResponse.data.c || 0;

            const investedAmount = stock.quantity * stock.averagePrice;
            const currentAmount = stock.quantity * currentPrice;
            const profitLoss = currentAmount - investedAmount;

            totalInvestedAmount += investedAmount;
            totalCurrentAmount += currentAmount;

            return {
              id: stock.id,
              name: stock.name,
              symbol: stock.symbol,
              quantity: stock.quantity,
              averagePrice: stock.averagePrice,
              currentPrice,
              investedAmount,
              currentAmount,
              profitLoss,
            };
          } catch (error) {
            console.error(`Error fetching data for ${stock.symbol}:`, error.message);
            return {
              ...stock,
              currentPrice: 0,
              investedAmount: 0,
              currentAmount: 0,
              profitLoss: 0,
            };
          }
        })
      );

      setRows(updatedPortfolio);
      setInvAmt(totalInvestedAmount);
      setCurrAmt(totalCurrentAmount);
      setTProfit(totalCurrentAmount - totalInvestedAmount);
    } catch (error) {
      console.error("Error fetching portfolio data:", error.message);
    }
  };

  // Fetch portfolio on component mount
  useEffect(() => {
    fetchPortfolio();
  }, []);

  const columns = [
    { field: "name", headerName: "Company Name", flex: 1 },
    { field: "symbol", headerName: "Symbol", flex: 0.5 },
    { field: "currentPrice", headerName: "Current Price", flex: 0.5, type: "number" },
    { field: "averagePrice", headerName: "Average Price", flex: 0.5, type: "number" },
    { field: "quantity", headerName: "Quantity", flex: 0.5, type: "number" },
    { field: "currentAmount", headerName: "Current Amount", flex: 0.5, type: "number" },
    { field: "investedAmount", headerName: "Invested Amount", flex: 0.5, type: "number" },
    { field: "profitLoss", headerName: "Profit/Loss", flex: 0.5, type: "number" },
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 5,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <div
            style={{
              margin: "5px 15px",
              fontWeight: "bold",
              paddingRight: "50px",
              fontSize: "x-large",
            }}
          >
            {"Invested Amount: "}
            <div style={{ color: "blue", textAlign: "center" }}>
              $ {invAmt.toFixed(2)}
            </div>
          </div>
          <div
            style={{
              margin: "5px 15px",
              fontWeight: "bold",
              paddingRight: "50px",
              fontSize: "x-large",
            }}
          >
            {"Current Amount: "}
            <div style={{ color: "blue", textAlign: "center" }}>
              $ {currAmt.toFixed(2)}
            </div>
          </div>
          <div
            style={{
              margin: "5px 15px",
              fontWeight: "bold",
              paddingRight: "50px",
              fontSize: "x-large",
            }}
          >
            {"Profit/Loss: "}
            <div style={{ color: tProfit >= 0 ? "#03C03C" : "red", textAlign: "center" }}>
              $ {tProfit.toFixed(2)}
            </div>
          </div>
        </Box>
      </Paper>
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  );
};

export default Portfolio;
