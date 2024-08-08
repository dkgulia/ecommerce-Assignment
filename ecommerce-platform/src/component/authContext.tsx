import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user?: User;  // Add user property
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);  // Track user
  const router = useRouter();

  const login = () => {
    setIsAuthenticated(true);
    setUser({ id: 1, name: 'John Doe', email: 'john.doe@example.com' }); // Example user data
    router.push('/products'); // Redirect to /products after login
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(undefined);  // Clear user data
    router.push('/'); // Redirect to home after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
