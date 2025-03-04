import { setAccessToken, setRefreshToken } from '@/utils/jwtoken';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState, useTransition } from 'react';

import axios from "@/network/axios"
import { AxiosError } from 'axios';
import useErrorMessage from '../../../hooks/useErrorMessage';
import handleCreatePassport from '../utils/handleLoginSigner';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import { Response, ResponseError } from '@/types/globals';
import { LoginCredentials } from '../types';

interface LoginResponse extends Response {
  data: {
    accessToken: string;
    refreshToken: string;
  }
}

const useLogin = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const loginUser = useCallback(async (): Promise<LoginResponse> => {
    const credentials: LoginCredentials = await handleCreatePassport()
    const response = await axios.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  }, []);

  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponse) => {
      clearErrorMessage();
      setSuccessMessage('Login successful! Redirecting...');
      setAccessToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);
      const redirect_after_login = sessionStorage.getItem('redirect_after_login')
      startTransition(() => {
        router.push(redirect_after_login ?? '/dashboard');
      });
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

  return { login, errorMessage, successMessage, isPending };
}

export default useLogin