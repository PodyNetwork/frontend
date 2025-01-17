"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import axios from "@/network/axios"
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../useErrorMessage';
import { BaseResponse, ResponseError } from '@/types/globals';

interface UpdateCallParticipantPermissionArgs {
  participantCanPublish: boolean;
  callId: string;
  username: string;
}

const useUpdateCallParticipantPermission = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();

  const updateCallParticipantPermissionHandler = useCallback(async (args: UpdateCallParticipantPermissionArgs): Promise<BaseResponse> => {
    const response = await axios.put<BaseResponse>(`/call/participant/permission`, args);
    return response.data;
  }, []);

  const updateCallParticipantPermission= useMutation({
    mutationFn: updateCallParticipantPermissionHandler,
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

  return { updateCallParticipantPermission, errorMessage };
}

export default useUpdateCallParticipantPermission
