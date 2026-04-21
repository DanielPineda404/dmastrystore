import { Toaster } from 'sonner';
import { MainLayout } from '../components/templates/MainLayout.jsx';
import { SuccessScreen } from '../components/organisms/SuccessScreen.jsx';
import { useNavigate } from 'react-router-dom';
import { useCheckoutStore } from '../store/checkoutStore.js';
import { useEffect } from 'react';

export const SuccessPage = () => {
  const navigate = useNavigate();
  const setIsCompletingCheckout = useCheckoutStore(state => state.setIsCompletingCheckout);

  useEffect(() => {
    return () => {
      setIsCompletingCheckout(false);
    };
  }, [setIsCompletingCheckout]);

  return (
    <MainLayout>
      <Toaster position="bottom-right" richColors />

      <SuccessScreen onReturn={() => navigate('/')} />
    </MainLayout>
  );
};
