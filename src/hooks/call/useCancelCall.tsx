"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import axios from "@/network/axios"
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../useErrorMessage';
import { BaseResponse, ResponseError } from '@/types/globals';

interface CreateMeetingArgs{ callId: string }

const useCancelCall = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();

  const cancelCallHandler = useCallback(async (args: CreateMeetingArgs): Promise<BaseResponse> => {
    const response = await axios.post<BaseResponse>(`/call/${args.callId}/cancel`);
    return response.data;
  }, []);

  const cancelCall = useMutation({
    mutationFn: cancelCallHandler,
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

  return { cancelCall, errorMessage };
}

export default useCancelCall