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

interface CreateCallArgs{ scheduledTime?: number, participantsCanPublish?: boolean, title?: string, participantsCanPublishData?: boolean, privacy?: string}

const useCreateCall = () => {
  const router = useRouter(); 
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();
  const { startLoading, stopLoading, loading } = useLoading();

  const createCallHandler = useCallback(async (args: CreateCallArgs = {}): Promise<CallResponse|void> => {
    startLoading();
    try {
      const response = await axios.post<CallResponse>('/call', args);
      return response.data;
    } catch {
      stopLoading(); 
    }
  }, [startLoading, stopLoading]);

  const createCall = useMutation({
    mutationFn: createCallHandler,
    onSuccess: (data) => {
      clearErrorMessage();
      router.push(`/call/${data?.data.url}`);
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

  return { createCall, errorMessage, loading };
}

export default useCreateCall