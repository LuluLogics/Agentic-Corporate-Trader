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

export default function Orders({ userId, clientId }) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Fetch orders from the new API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://act-production-5e24.up.railway.app/api/orders/${userId}/${clientId}`
      );
      setRows(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("userId:", userId, "clientId:", clientId);
    if (userId && clientId) {
      fetchOrders();
    }
  }, [userId, clientId]);
  

  return (
    <React.Fragment>
      <Title>Client Orders</Title>
      {loading ? (
        <p>Loading orders...</p>
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
