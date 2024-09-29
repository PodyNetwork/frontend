"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import axios from "@/network/axios"
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../../../hooks/useErrorMessage';
import { BaseResponse, ResponseError } from '@/types/globals';

interface BanParticipantArgs {
  participantId: string;
  callId: string;
  username: string;
}

const useParticipantBan = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();

  const banParticipantHandler = useCallback(async (args: BanParticipantArgs): Promise<BaseResponse> => {
    const response = await axios.post<BaseResponse>(`/call/participant/permission`, args);
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

export default useParticipantBan
