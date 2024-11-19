import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, Avatar, Paper, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const BuyStock = () => {
    const [currentPrice, setCurrentPrice] = useState(null); // Current market price of the stock
    const [quantity, setQuantity] = useState('');
    const [total, setTotal] = useState(0); // Total cost = price * quantity
    const [error, setError] = useState(null); // Error message handling
    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem('user')); // Fetch user details from localStorage
    const { symbol, name } = location.state; // Stock details from navigation state

    // Fetch the current price of the stock
    useEffect(() => {
        const fetchPrice = async () => {
            try {
                // Simulate fetching price (replace with API integration if needed)
                const response = await axios.get(
                    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=your_finnhub_api_key`
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

        try {
            const payload = {
                userId: user.id,
                symbol,
                name,
                quantity: parseInt(quantity, 10),
                price: currentPrice,
                totalCost: total,
            };

            // Make a transaction request
            const response = await axios.post(`/api/transaction`, payload);

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
                    backgroundImage: 'url(https://source.unsplash.com/random)',
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
