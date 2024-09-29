"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import axios from "@/network/axios"
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../../../hooks/useErrorMessage';
import { BaseResponse, ResponseError } from '@/types/globals';

interface SubscribeToTracksArgs {
  callId: string;
  trackSids: string[];
  subscribe: boolean;
}

const useSubscribeToTracks = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();

  const subscribeToTracksHandler = useCallback(async (args: SubscribeToTracksArgs): Promise<BaseResponse> => {
    const response = await axios.post<BaseResponse>('/call/participant/track', args);
    return response.data;
  }, []);

  const subscribeToTracks = useMutation({
    mutationFn: subscribeToTracksHandler,
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

  return { subscribeToTracks, errorMessage };
}

export default useSubscribeToTracks
