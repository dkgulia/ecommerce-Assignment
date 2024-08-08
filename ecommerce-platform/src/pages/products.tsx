// pages/products.tsx
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ProductCard from '../component/productCard';
import Layout from '../component/layout';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:7070/products', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching products:', error);
          setError(error.message);
        } else {
          console.error('Unexpected error:', error);
          setError('An unexpected error occurred');
        }
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <Layout>
        <Typography variant="h4" component="h1" gutterBottom>
          Error: {error}
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        {/* Products */}
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default ProductsPage;
