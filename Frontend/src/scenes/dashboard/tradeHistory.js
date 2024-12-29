import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import Header from "../../components/Headers";

const TradeHistory = () => {
  console.log("Rendering Orders component...");

  const user = JSON.parse(localStorage.getItem("user")); // Fetch user from localStorage
  const selectedClient = JSON.parse(localStorage.getItem("selectedClient")); // Fetch client from localStorage

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders data
  const fetchOrders = async () => {
    console.log("Inside fetchOrders...");
    if (!user || !selectedClient) {
      console.error("User or client is missing.", { user, selectedClient });
      setLoading(false);
      return;
    }

    try {
      console.log(`Calling API for user: ${user.id}, client: ${selectedClient.id}`);
      const response = await axios.get(
        `https://act-production-5e24.up.railway.app/api/orders/${user.id}/${selectedClient.id}`
      );

      console.log("API response received:", response.data);
      setRows(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setRows([]);
    } finally {
      console.log("Fetch orders completed.");
      setLoading(false);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    console.log("useEffect triggered - Fetching orders...");
    fetchOrders();
  }, []);

  // Define columns for DataGrid
  const columns = [
    { field: "type", headerName: "Type", flex: 1 },
    { field: "symbol", headerName: "Symbol", flex: 1 },
    { field: "name", headerName: "Stock Name", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 0.5, type: "number" },
    { field: "price", headerName: "Price", flex: 0.5, type: "number" },
    {
      field: "total",
      headerName: "Total Cost/Earnings",
      flex: 0.5,
      type: "number",
      valueGetter: (params) =>
        params.row.type === "BUY"
          ? `$${params.row.totalCost.toFixed(2)}`
          : `$${params.row.totalEarnings.toFixed(2)}`,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueGetter: (params) =>
        new Date(params.row.date.seconds * 1000).toLocaleString(),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Orders" subtitle="Transaction History" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: "#1976d2", borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: "#f4f4f4" },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: "#1976d2" },
        }}
      >
        {loading ? (
          <div>Loading orders...</div>
        ) : rows.length > 0 ? (
          <DataGrid
            rows={rows.map((row, index) => ({ id: index, ...row }))}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        ) : (
          <div>No orders found.</div>
        )}
      </Box>
    </Box>
  );
};

export default TradeHistory;
