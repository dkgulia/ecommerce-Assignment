import { useState } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button, Divider, Box, Snackbar } from '@mui/material';
import { useRouter } from 'next/router';
import { useCart } from '../component/cartContext';
import { useAuth } from '../component/authContext';

export default function OrdersPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth(); // Assuming you have user info in auth context
  const [orderDetails, setOrderDetails] = useState({
    fullName: '',
    contact: '',
    address: '',
    nearby: '',
    pincode: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (cartItems.length === 0) {
        setErrorMessage('Cart is empty');
        return;
      }
      if (!orderDetails.fullName || !orderDetails.contact || !orderDetails.address || !orderDetails.pincode) {
        setErrorMessage('All shipping details must be filled out');
        return;
      }

      // Send a POST request for each item in the cart
      const orderPromises = cartItems.map(async (item) => {
        const response = await fetch('/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user?.id || 1,
            product_id: item.id,
            quantity: 1, 
            total_price: item.price,
            full_name: orderDetails.fullName,
            contact: orderDetails.contact,
            address: orderDetails.address,
            nearby: orderDetails.nearby,
            pincode: orderDetails.pincode,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to place order');
        }
      });

      await Promise.all(orderPromises);

      // Clear cart and show success message
      clearCart();
      setSuccessMessage('Order placed successfully');
      setTimeout(() => {
        router.push('/products');
      }, 2000); 

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setErrorMessage(errorMessage);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shipping Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <TextField
              label="Full Name"
              name="fullName"
              fullWidth
              variant="outlined"
              margin="normal"
              value={orderDetails.fullName}
              onChange={handleChange}
            />
            <TextField
              label="Contact"
              name="contact"
              fullWidth
              variant="outlined"
              margin="normal"
              value={orderDetails.contact}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              name="address"
              fullWidth
              variant="outlined"
              margin="normal"
              value={orderDetails.address}
              onChange={handleChange}
            />
            <TextField
              label="Nearby"
              name="nearby"
              fullWidth
              variant="outlined"
              margin="normal"
              value={orderDetails.nearby}
              onChange={handleChange}
            />
            <TextField
              label="Pincode"
              name="pincode"
              fullWidth
              variant="outlined"
              margin="normal"
              value={orderDetails.pincode}
              onChange={handleChange}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {cartItems.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ${item.price.toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Divider sx={{ mb: 2 }} />
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
              Confirm Order
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Success Message Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
        message={successMessage}
      />

      {/* Error Message Snackbar */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
        message={errorMessage}
      />
    </Container>
  );
}
