// src/pages/orders.tsx
import { useState } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button, Divider, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useCart } from '../component/cartContext';

export default function OrdersPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart(); // Added clearCart
  const [orderDetails, setOrderDetails] = useState({
    fullName: '',
    contact: '',
    address: '',
    nearby: '',
    pincode: '',
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      for (const item of cartItems) {
        const response = await fetch('/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 1, // Replace with actual user ID
            product_id: item.id,
            quantity: 1, // Assuming quantity is 1 per item
            total_price: item.price,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to place order');
        }
      }

      setOrderSuccess(true); // Show success message
      clearCart(); // Clear the cart

      setTimeout(() => {
        router.push('/'); // Redirect to home or another page after 2 seconds
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred.');
      }
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
          <Paper sx={{ p: 3, bgcolor: '#ffc300' }}>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">Total:</Typography>
              <Typography variant="body1" fontWeight="bold">
                ${totalAmount.toFixed(2)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color={orderSuccess ? 'success' : 'primary'}
              fullWidth
              onClick={handleSubmit}
              sx={{
                bgcolor: orderSuccess ? 'green' : undefined,
                '&:hover': {
                  bgcolor: orderSuccess ? 'darkgreen' : undefined,
                },
              }}
            >
              {orderSuccess ? 'Order Placed Successfully' : 'Confirm Order'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
