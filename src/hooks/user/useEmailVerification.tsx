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

interface EmailVerificationArgs { otp: string }


const useEmailVerification = () => {
  const router = useRouter(); 
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();
  const { startLoading, stopLoading, loading } = useLoading();

  const verifyEmailHandler = useCallback(async (args: EmailVerificationArgs): Promise<CallResponse> => {
    startLoading();
    try {
      const response = await axios.post<CallResponse>('/user/email/verify', args);
      return response.data;
    } finally {
      stopLoading(); 
    }
  }, [startLoading, stopLoading]);

  const verifyEmail = useMutation({
    mutationFn: verifyEmailHandler,
    onSuccess: (data) => {
      clearErrorMessage();
      router.push(`/dashboard`);
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

  return { verifyEmail, errorMessage, loading };
}

export default useEmailVerification