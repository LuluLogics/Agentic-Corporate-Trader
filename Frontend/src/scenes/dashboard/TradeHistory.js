import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";
import axios from "axios";
import Header from "../../components/Headers";

const TradeHistory = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Get the logged-in user
  const selectedClient = JSON.parse(localStorage.getItem("selectedClient")); // Get the selected client

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    if (!user || !selectedClient) {
      console.error("User or selected client is missing.");
      setError("User or selected client information is missing.");
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching orders...");
      const response = await axios.get(
        `https://act-production-5e24.up.railway.app/api/orders/${user.id}/${selectedClient}`
      );
      console.log("Orders retrieved:", response.data);

      if (response.data.orders && response.data.orders.length > 0) {
        setRows(response.data.orders);
      } else {
        setRows([]);
        console.warn("No orders found for the client.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box m="20px">
      <Header title="Orders" subtitle="Transaction History" />
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" variant="h6" align="center">
          {error}
        </Typography>
      ) : rows.length === 0 ? (
        <Typography variant="h6" align="center">
          No orders found.
        </Typography>
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Stock Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total Cost/Earnings</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.symbol}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>${row.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {row.type === "BUY"
                        ? `$${row.totalCost.toFixed(2)}`
                        : `$${row.totalEarnings.toFixed(2)}`}
                    </TableCell>
                    <TableCell>
                      {new Date(row.date.seconds * 1000).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
};

export default TradeHistory;
