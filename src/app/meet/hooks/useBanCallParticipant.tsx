"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import axios from "@/network/axios"
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../../../hooks/useErrorMessage';
import { ResponseError } from '@/types/globals';
import type { ActionResponse } from '../types';

interface BanParticipantArgs {
  callId: string;
  username: string;
}


const useBanCallParticipant = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();

  const banParticipantHandler = useCallback(async (args: BanParticipantArgs): Promise<ActionResponse> => {
    const response = await axios.post<ActionResponse>(`/call/participant/ban`, args);
    return response.data;
  }, []);

  const banParticipant = useMutation({
    mutationFn: banParticipantHandler,
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

  return { banParticipant, errorMessage };
}

export default useBanCallParticipant