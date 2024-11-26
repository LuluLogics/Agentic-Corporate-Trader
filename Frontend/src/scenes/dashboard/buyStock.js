import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, Avatar, Paper, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline";

const BuyStock = () => {
    const [currentPrice, setCurrentPrice] = useState(null); // Current market price of the stock
    const [quantity, setQuantity] = useState('');
    const [total, setTotal] = useState(0); // Total cost = price * quantity
    const [error, setError] = useState(null); // Error message handling
    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem('user')); // Fetch user details from localStorage
    const selectedClient = JSON.parse(localStorage.getItem('selectedClient')); // Fetch selected client from localStorage
    const { symbol, name } = location.state; // Stock details from navigation state

    // Fetch the current price of the stock
    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await axios.get(
                    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=ce80b8aad3i4pjr4v2ggce80b8aad3i4pjr4v2h0`
                );
                setCurrentPrice(response.data.c); // Update current price
            } catch (err) {
                setError('Failed to fetch current stock price');
            }
        };
        fetchPrice();
    }, [symbol]);

    // Calculate the total cost whenever quantity changes
    useEffect(() => {
        if (currentPrice && quantity) {
            setTotal(currentPrice * quantity);
        }
    }, [currentPrice, quantity]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!selectedClient) {
            setError("No client selected. Please select a client.");
            return;
        }

        try {
            const payload = {
                userId: user.id,
                clientId: selectedClient,
                symbol,
                name,
                quantity: parseInt(quantity, 10),
                price: currentPrice,
                totalCost: total,
            };

            // Make a transaction request
            const response = await axios.post(`https://act-production-5e24.up.railway.app/api/buy`, payload);

            // If successful, navigate to portfolio
            alert(response.data.message || 'Stock purchased successfully');
            navigate('/portfolio');
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during the transaction');
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1579226905180-636b76d96082?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dHJhZGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Buy Stock
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Stock Name"
                            value={name}
                            disabled
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="currentPrice"
                            label="Current Price"
                            value={currentPrice ? `$${currentPrice.toFixed(2)}` : 'Loading...'}
                            disabled
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="quantity"
                            label="Quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="total"
                            label="Total Cost"
                            value={total ? `$${total.toFixed(2)}` : '0.00'}
                            disabled
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!quantity || !currentPrice}
                        >
                            Buy Stock
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default BuyStock;