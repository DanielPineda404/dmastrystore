import { Toaster } from 'sonner';
import { MainLayout } from '../components/templates/MainLayout.jsx';
import { CheckoutPreview } from '../components/organisms/CheckoutPreview.jsx';
import { useNavigate } from 'react-router-dom';
import { useCheckoutStore } from '../store/checkoutStore.js';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const setIsCompletingCheckout = useCheckoutStore(state => state.setIsCompletingCheckout);

  const handleSuccess = () => {
    setIsCompletingCheckout(true);
    navigate('/success');
  };

  return (
    <MainLayout>
      <Toaster position="bottom-right" richColors />

      <CheckoutPreview
        onBack={() => navigate('/')}
        onSuccess={handleSuccess}
      />
    </MainLayout>
  );
};
