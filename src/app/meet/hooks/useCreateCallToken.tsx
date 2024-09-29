"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import axios from "@/network/axios"
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../../../hooks/useErrorMessage';
import { ResponseError } from '@/types/globals';
import type { Call, ActionResponse } from '../types';

interface CreateCallTokenArgs {
  callId: string;
}

interface CallTokenResponse extends ActionResponse {
 data: {
    token: string;
    call: Call;
 }
}

const useCreateCallToken = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();

  const createCallTokenHandler = useCallback(async (args: CreateCallTokenArgs): Promise<CallTokenResponse> => {
    const response = await axios.post<CallTokenResponse>(`/call/${args.callId}/token`);
    return response.data;
  }, []);

  const createCallToken = useMutation({
    mutationFn: createCallTokenHandler,
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

  return { createCallToken, errorMessage };
}

export default useCreateCallToken
