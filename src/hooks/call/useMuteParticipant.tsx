"use client";
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import axios from "@/network/axios";
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../useErrorMessage';
import { BaseResponse, ResponseError } from '@/types/globals';

interface UpdateParticipantMuteArgs {
  callId: string;
  username: string;
  trackSid: string;
  mute: boolean;
}

const useMuteParticipant = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();

  const updateCallParticipantMute = useCallback(
    async (args: UpdateParticipantMuteArgs): Promise<BaseResponse> => {
      const response = await axios.post<BaseResponse>(`/call/participant/track`, args);
      return response.data;
    },
    []
  );

  const updateParticipantMute = useMutation({
    mutationFn: updateCallParticipantMute,
    onSuccess: () => {
      clearErrorMessage();
    },
    onError: (error: AxiosError | Error) => {
      if (isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ResponseError;
        setErrorMessage(errorData?.message ?? "An unknown server error occurred", 'error');
        return;
      }
      setErrorMessage(error.message || "An unexpected error occurred", 'error');
    },
  });

  return { updateParticipantMute, errorMessage };
};

export default useMuteParticipant;
