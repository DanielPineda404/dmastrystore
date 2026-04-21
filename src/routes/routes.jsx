import { createBrowserRouter } from 'react-router-dom';
import { ShopPage } from '../pages/ShopPage.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { RegisterPage } from '../pages/RegisterPage.jsx';
import { CheckoutPage } from '../pages/CheckoutPage.jsx';
import { SuccessPage } from '../pages/SuccessPage.jsx';
import { ProtectedRoute } from './ProtectedRoute.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ShopPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/checkout',
    element: (
      <ProtectedRoute>
        <CheckoutPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/success',
    element: <SuccessPage />,
  },
]);
