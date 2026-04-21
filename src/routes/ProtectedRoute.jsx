import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore.js';
import { useCartStore } from '../store/cartStore.js';
import { useCheckoutStore } from '../store/checkoutStore.js';
import { toast } from 'sonner';

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useUserStore();
  const { cart } = useCartStore();
  const { isCompletingCheckout } = useCheckoutStore();

  if (!isLoggedIn) {
    toast.error("Por favor, inicia sesión para continuar");
    return <Navigate to="/login" replace />;
  }

  if (cart.length === 0 && !isCompletingCheckout) {
    toast.error("Tu carrito está vacío");
    return <Navigate to="/" replace />;
  }

  return children;
};
