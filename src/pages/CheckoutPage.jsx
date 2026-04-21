import { Toaster } from 'sonner';
import { MainLayout } from '../components/templates/MainLayout.jsx';
import { CheckoutPreview } from '../components/organisms/CheckoutPreview.jsx';
import { useNavigate } from 'react-router-dom';

export const CheckoutPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Toaster position="bottom-right" richColors />

      <CheckoutPreview
        onBack={() => navigate('/')}
        onSuccess={() => navigate('/success')}
      />
    </MainLayout>
  );
};
