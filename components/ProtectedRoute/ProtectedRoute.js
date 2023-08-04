// components/ProtectedRoute.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../utils/auth'; // Replace this with your authentication utility

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      // Redirect the user to the login page or any other page of your choice
      router.push('/login');
    }
  }, []);

  // Render the children (page content) if the user is authenticated
  return isAuthenticated() ? <>{children}</> : null;
};

export default ProtectedRoute;
