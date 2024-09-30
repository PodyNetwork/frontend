"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import axios from "@/network/axios"
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../useErrorMessage';
import { BaseResponse, ResponseError } from '@/types/globals';
interface EndCallArgs { callId: string }

const useEndCall = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();

  const endCallHandler = useCallback(async (args: EndCallArgs): Promise<BaseResponse> => {
    const response = await axios.post<BaseResponse>(`/call/${args.callId}/end`);
    return response.data;
  }, []);

  const endCall = useMutation({
    mutationFn: endCallHandler,
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

  return { endCall, errorMessage };
}

export default useEndCall