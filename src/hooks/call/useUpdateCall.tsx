"use client"
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import axios from "@/network/axios"
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../useErrorMessage';
import type { CallResponse } from '../../app/call/types';
import { ResponseError } from '@/types/globals';

interface CreateMeetingArgs{ scheduledTime: number, participantsCanPublish: boolean, title: string, _id: string }


const useUpdateCall = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();

  const updateCallHandler = useCallback(async (args: CreateMeetingArgs): Promise<CallResponse> => {
      const response = await axios.put<CallResponse>(`/call/${args._id}`, {
        scheduledTime: args.scheduledTime,
        participantsCanPublish: args.participantsCanPublish,
        title: args.title
      });
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