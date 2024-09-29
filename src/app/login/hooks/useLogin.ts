import { setAccessToken, setRefreshToken } from '@/utils/token';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { LoginCredentials } from '@/types/login';
import axios from "@/network/axios"
import { AxiosError } from 'axios';
import useErrorMessage from '../../../hooks/useErrorMessage';
import handleCreatePassport from '../utils/handleLoginSigner';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import { Response, ResponseError } from '@/types/globals';


const useLogin = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();
  const router = useRouter();
  const loginUser = useCallback(async (): Promise<Response> => {
    const credentials: LoginCredentials = await handleCreatePassport()
    const response = await axios.post<Response>('/auth/login', credentials);
    return response.data;
  }, []);

  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: Response) => {
      clearErrorMessage();
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      router.push('/dashboard');
    },
    onError: (error: AxiosError | Error) => {
      if (isAxiosError(error)) {
        const errorData = error?.response?.data as ResponseError;
        setErrorMessage(errorData.message, 'error');
        return; 
      }
      setErrorMessage(error.message, 'error');
    },
  });

  return { login, errorMessage };
}

export default useLogin