"use client"
import { setAccessToken, setRefreshToken } from '@/utils/token';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { LoginCredentials, LoginResponse, LoginResponseError } from '@/types/login';
import axios from "@/network/axios"
import { AxiosError } from 'axios';
import useErrorMessage from './useErrorMessage';

const useLogin = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();

  const loginUser = useCallback(async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  }, []);

  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      clearErrorMessage();
      setAccessToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);
    },
    onError: (error: AxiosError) => {
      const errorData = error?.response?.data as LoginResponseError;
      setErrorMessage(errorData.message, 'error');
    },
  });

  return { login, errorMessage };
}

export default useLogin