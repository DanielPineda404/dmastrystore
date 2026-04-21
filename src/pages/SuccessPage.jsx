import { Toaster } from 'sonner';
import { MainLayout } from '../components/templates/MainLayout.jsx';
import { SuccessScreen } from '../components/organisms/SuccessScreen.jsx';
import { useNavigate } from 'react-router-dom';

export const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Toaster position="bottom-right" richColors />

      <SuccessScreen onReturn={() => navigate('/')} />
    </MainLayout>
  );
};
