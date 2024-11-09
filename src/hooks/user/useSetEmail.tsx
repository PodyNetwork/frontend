"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import axios from "@/network/axios"
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../useErrorMessage';
import type { CallResponse } from '../../app/call/types';
import { ResponseError } from '@/types/globals';
import { useRouter } from 'next/navigation';
import useLoading from '../useLoading';

interface SetEmailArgs { email: string }


const useSetEmail = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();
  const { startLoading, stopLoading, loading } = useLoading();
  const router = useRouter()

  const setEmailHandler = useCallback(async (args: SetEmailArgs): Promise<CallResponse> => {
    startLoading();
    try {
      const response = await axios.post<CallResponse>('/user/email', args);
      return response.data;
    } finally {
      stopLoading(); 
    }
  }, [startLoading, stopLoading]);

  const setEmail = useMutation({
    mutationFn: setEmailHandler,
    onSuccess: () => {
      clearErrorMessage();
      router.push('/email/verify')
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

  return { setEmail, errorMessage, loading };
}

export default useSetEmail