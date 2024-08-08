// components/ProductCard.tsx
import { Card, CardActionArea, CardContent, CardMedia, Typography, CardActions, Button, Rating } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '../component/authContext';
import { useCart } from '../component/cartContext';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductCard = ({ id, name, description, price, imageUrl }: ProductCardProps) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart({ id, name, price, imageUrl });
    } else {
      router.push('/login');
    }
  };

  const dummyStock = 10; // Dummy stock number

  return (
    <Card sx={{ width: 345, height: 420 }}> {/* Adjusted height to accommodate stock information */}
      <CardActionArea>
        <CardMedia component="img" height="140" image={imageUrl} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Rating name="read-only" value={4} readOnly sx={{ mt: 1 }} /> {/* Dummy rating */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {dummyStock} items left in stock
          </Typography> {/* Stock information */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
