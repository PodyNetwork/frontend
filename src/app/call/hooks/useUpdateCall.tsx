"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import axios from "@/network/axios"
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../../../hooks/useErrorMessage';
import type { CallResponse } from '../types';
import { ResponseError } from '@/types/globals';

interface CreateMeetingArgs{ scheduledTime: string, participantsCanPublish: boolean, title: string }


const useUpdateCall = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();

  const updateCallHandler = useCallback(async (args: CreateMeetingArgs): Promise<CallResponse> => {
    const response = await axios.put<CallResponse>('/call', args);
    return response.data;
  }, []);

  const updateCall = useMutation({
    mutationFn: updateCallHandler,
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

  return { updateCall, errorMessage };
}

export default useUpdateCall