import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Title from './Title';

export default function Orders() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  // Debugging states
  const [debugInfo, setDebugInfo] = useState({
    userId: null,
    clientId: null,
    apiResponse: null,
    error: null,
  });

  // Fetch userId and clientId from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const client = JSON.parse(localStorage.getItem('selectedClient'));
    if (!user || !user.id || !client || !client.id) {
      console.error('Missing userId or clientId from localStorage');
      setDebugInfo((prev) => ({
        ...prev,
        error: 'Missing userId or clientId from localStorage',
      }));
    } else {
      setDebugInfo((prev) => ({
        ...prev,
        userId: user.id,
        clientId: client.id,
      }));
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Fetch orders from the API
  const fetchOrders = async () => {
    const { userId, clientId } = debugInfo;

    if (!userId || !clientId) {
      console.error('Missing userId or clientId; aborting fetchOrders');
      setLoading(false);
      return;
    }

    console.log('Calling API with:', { userId, clientId });

    try {
      setLoading(true);
      const response = await axios.get(
        `https://act-production-5e24.up.railway.app/api/orders/${userId}/${clientId}`
      );
      console.log('API Response:', response.data);

      setRows(response.data.orders || []);
      setDebugInfo((prev) => ({
        ...prev,
        apiResponse: response.data.orders,
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
      setDebugInfo((prev) => ({
        ...prev,
        error: error.message,
      }));
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debugInfo.userId && debugInfo.clientId) {
      fetchOrders();
    }
  }, [debugInfo.userId, debugInfo.clientId]);

  return (
    <React.Fragment>
      <Title>Client Orders</Title>
      <div>
        <strong>Debug Info:</strong>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>
      {loading ? (
        <p>Loading orders...</p>
      ) : rows.length === 0 ? (
        <p>No orders found for this client.</p>
      ) : (
        <>
          <Table size="medium">
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.symbol}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>${row.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {row.type === 'BUY'
                        ? `$${row.totalCost.toFixed(2)}`
                        : `$${row.totalEarnings.toFixed(2)}`}
                    </TableCell>
                    <TableCell>{new Date(row.date.seconds * 1000).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </React.Fragment>
  );
}
