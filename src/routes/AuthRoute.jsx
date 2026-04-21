import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore.js';
import { toast } from 'sonner';

export const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useUserStore();

  if (!isLoggedIn) {
    toast.error("Por favor, inicia sesión para continuar");
    return <Navigate to="/login" replace />;
  }

  return children;
};
