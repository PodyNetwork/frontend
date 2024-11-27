"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import axios from "@/network/axios"
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../useErrorMessage';
import type { CallResponse } from '../../app/classroom/types';
import { ResponseError } from '@/types/globals';
import { useRouter } from 'next/navigation';
import useLoading from '../useLoading';


const useClaimPoint = () => {
  const router = useRouter(); 
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();
  const { startLoading, stopLoading, loading } = useLoading();

  const claimHandler = useCallback(async (): Promise<CallResponse> => {
    startLoading();
    try {
      const response = await axios.post<CallResponse>('/point/withdraw');
      return response.data;
    } finally {
      stopLoading(); 
    }
  }, [startLoading, stopLoading]);

  const claimPoint = useMutation({
    mutationFn: claimHandler,
    onSuccess: () => {
      clearErrorMessage();
      router.push(`/dashboard/reward?claimBox=true`);
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

  return { claimPoint, errorMessage, loading };
}

export default useClaimPoint