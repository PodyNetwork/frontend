"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react'; // Import useState
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
  const [accessToken, setAccessToken] = useState<string | null>(null); // Add state for access token

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
      if (isAxiosError(error)) {
        const errorData = error?.response?.data as ResponseError;
        setErrorMessage(errorData.message, 'error');
        return; 
      }
      setErrorMessage(error.message, 'error');
    },
  });

  return { createCallToken, errorMessage, accessToken }; // Return the access token
}

export default useCreateCallToken;