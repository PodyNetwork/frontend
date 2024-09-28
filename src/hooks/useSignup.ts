"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { SignupCredentials, SignupResponse, SignupResponseError } from '@/types/signup';
import axios from "@/network/axios"
import { AxiosError } from 'axios';
import useErrorMessage from './useErrorMessage';
import { getUserLevel, mintPassport } from '@/utils/passport';

const useSignup = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();

  const signupUser = useCallback(async (credentials: SignupCredentials): Promise<SignupResponse> => {
    const response = await axios.post<SignupResponse>('/auth/signup', credentials);
    return response.data;
  }, []);

  const signupHandler = useCallback(async (credentials: SignupCredentials): Promise<SignupResponse> => {
    const userLevel = await getUserLevel({ account: credentials.walletAddress });
    if (userLevel == BigInt(0)) {
       await mintPassport({ account: credentials.walletAddress });
    }
    const response = await signupUser(credentials);
    return response;
  }, [signupUser]);

  const signup = useMutation({
    mutationFn: signupHandler,
    onSuccess: () => {
      clearErrorMessage();
    },
    onError: (error: AxiosError) => {
      const errorData = error?.response?.data as SignupResponseError;
      setErrorMessage(errorData.message, 'error');
    },
  });

  return { signup, errorMessage };
}

export default useSignup