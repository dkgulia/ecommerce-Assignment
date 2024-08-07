// components/ProductCard.tsx
import { Card, CardActionArea, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
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

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={imageUrl} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
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
