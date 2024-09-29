"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import axios from "@/network/axios"
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../../../hooks/useErrorMessage';
import { BaseResponse, ResponseError } from '@/types/globals';

interface TrackMuteArgs {
  callId: string;
  username: string;
  trackSid: string;
  mute: boolean;
}

const useTrackMute = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();

  const trackMuteHandler = useCallback(async (args: TrackMuteArgs): Promise<BaseResponse> => {
    const response = await axios.post<BaseResponse>('/call/mute-track', args);
    return response.data;
  }, []);

  const muteTrack = useMutation({
    mutationFn: trackMuteHandler,
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

  return { muteTrack, errorMessage };
}

export default useTrackMute
