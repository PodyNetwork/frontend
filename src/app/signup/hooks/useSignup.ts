"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { SignupResponse, SignupResponseError } from '@/types/signup';
import axios from "@/network/axios"
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../../../hooks/useErrorMessage';
import handleCreatePassport from '../utils/handleCreatePassport';

const useSignup = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();

  const signupHandler = useCallback(async ( { username }: { username: string }): Promise<SignupResponse> => {
    const credentials = await handleCreatePassport({username});
    const response = await axios.post<SignupResponse>('/auth/signup', credentials);
    return response.data;
  }, []);


  const signup = useMutation({
    mutationFn: signupHandler,
    onSuccess: () => {
      clearErrorMessage();
    },
    onError: (error: AxiosError | Error) => {
      if (isAxiosError(error)) {
        const errorData = error?.response?.data as SignupResponseError;
        setErrorMessage(errorData.message, 'error');
        return; 
      }
      setErrorMessage(error.message, 'error');
    },
  });

  return { signup, errorMessage };
}

export default useSignup