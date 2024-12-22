"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import axios from "@/network/axios"
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../useErrorMessage';
import { BaseResponse, ResponseError } from '@/types/globals';
import type { Call } from '../../app/classroom/types';

interface CreateCallTokenArgs {
  callId: string;
}

interface CallTokenResponse extends BaseResponse {
 data: {
    token: string;
    call: Call;
 }
}

const useCreateCallToken = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const createCallTokenHandler = useCallback(async (args: CreateCallTokenArgs): Promise<CallTokenResponse> => {
    const response = await axios.post<CallTokenResponse>(`/call/${args.callId}/token`);
    return response.data;
  }, []);

  const createCallToken = useMutation({
    mutationFn: createCallTokenHandler,
    onSuccess: (data) => { 
      clearErrorMessage();
      setAccessToken(data.data.token);
    },
    onError: (error: AxiosError | Error) => {
      const errorMessage = isAxiosError(error) ? (error?.response?.data as ResponseError).message : error.message;
      setErrorMessage(errorMessage, 'error');
    },
  });

  return useMemo(() => ({ createCallToken, errorMessage, accessToken }), [createCallToken, errorMessage, accessToken]);
}

export default useCreateCallToken;