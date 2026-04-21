import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore.js';

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useUserStore();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
