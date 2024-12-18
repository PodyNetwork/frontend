"use client";

import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import type { Response, ResponseError } from '@/types/globals';
import axios from "@/network/axios";
import { AxiosError, isAxiosError } from 'axios';
import useErrorMessage from '../../../hooks/useErrorMessage';
import handleCreatePassport from '../utils/handleCreatePassport';
import { useRouter } from 'next/navigation';

type SignupPayload = {
  username: string;
  referralCode?: string | null;
};

const useSignup = () => {
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();
  const router = useRouter();

  const signupHandler = useCallback(
    async ({ username, referralCode }: SignupPayload): Promise<Response> => {
      const credentials = await handleCreatePassport({ username });
      console.log({...credentials, referralCode})
      const response = await axios.post<Response>('/auth/signup', {...credentials, referralCode});
      return response.data;
    },
    []
  );

  const signup = useMutation({
    mutationFn: signupHandler,
    onSuccess: () => {
      clearErrorMessage();
      router.push('/login');
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

  return { signup, errorMessage };
};

export default useSignup;
