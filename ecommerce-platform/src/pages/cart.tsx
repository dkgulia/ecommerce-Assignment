// src/pages/cart.tsx
import { useCart } from '../component/cartContext';
import { Container, Grid, Paper, Typography, Button, Divider, Box } from '@mui/material';
import { useRouter } from 'next/router';

export default function CartPage() {
  const { cartItems } = useCart();
  const router = useRouter();
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = () => {
    router.push('/orders');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      
      {cartItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Paper key={item.id} sx={{ mb: 2, p: 2, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: '0 0 100px', mr: 2 }}>
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100%', borderRadius: '8px' }} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.price.toFixed(2)}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ ml: 2 }}>
                  ${item.price.toFixed(2)}
                </Typography>
              </Paper>
            ))}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">Total:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  ${totalAmount.toFixed(2)}
                </Typography>
              </Box>
              <Button variant="contained" color="primary" fullWidth onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
