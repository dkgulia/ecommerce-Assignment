// pages/_app.tsx
import { AppProps } from 'next/app';
import { AuthProvider } from '../component/authContext';
import { CartProvider } from '../component/cartContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
