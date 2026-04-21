import { Toaster } from 'sonner';
import { MainLayout } from '../components/templates/MainLayout.jsx';
import { AuthSection } from '../components/organisms/AuthSection.jsx';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Toaster position="bottom-right" richColors />

      <div className="max-w-md mx-auto py-20">
        <AuthSection
          initialMode="login"
          onSuccess={() => navigate('/')}
          onSwitchMode={(mode) => navigate(`/${mode}`)}
        />
      </div>
    </MainLayout>
  );
};
