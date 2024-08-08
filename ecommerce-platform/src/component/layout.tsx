// components/Layout.tsx
import { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container, Button, IconButton, Badge } from '@mui/material';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../component/authContext';
import { useCart } from '../component/cartContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </Link>
          </Typography>
          <div style={{ flexGrow: 1 }} />
          {isAuthenticated ? (
            <>
              <Link href="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color="inherit">Products</Button>
              </Link>
              <Link href="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                <IconButton color="inherit">
                  <Badge badgeContent={cartItems.length} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color="inherit">Login</Button>
              </Link>
              <Link href="/registerPage" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
