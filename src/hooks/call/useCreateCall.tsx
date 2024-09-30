"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import axios from "@/network/axios"
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../useErrorMessage';
import type { CallResponse } from '../../app/call/types';
import { ResponseError } from '@/types/globals';

interface CreateCallArgs{ scheduledTime?: string, participantsCanPublish?: boolean, title?: string }

const useCreateCall = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();

  const createCallHandler = useCallback(async (args: CreateCallArgs = {}): Promise<CallResponse> => {
    const response = await axios.post<CallResponse>('/call', args);
    return response.data;
  }, []);

  const createCall = useMutation({
    mutationFn: createCallHandler,
    onSuccess: () => {
      clearErrorMessage();
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

  return { createCall, errorMessage };
}

export default useCreateCall