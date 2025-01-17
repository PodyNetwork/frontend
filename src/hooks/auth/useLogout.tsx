import { removeAccessToken, removeRefreshToken } from '@/utils/jwtoken';
import { useRouter } from 'next/navigation';

const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    removeAccessToken();
    removeRefreshToken();
    sessionStorage.removeItem('redirect_after_login');
    router.push('/login');
  };

  return { logout };
};

export default useLogout;