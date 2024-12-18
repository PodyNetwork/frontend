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
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const refParam = queryParams.get("ref");
    setReferralCode(refParam);
  }, []);

  const signupHandler = useCallback(
    async ({ username }: SignupPayload): Promise<Response> => {
      const credentials = await handleCreatePassport({ username, referralCode });
      const response = await axios.post<Response>('/auth/signup', credentials);
      return response.data;
    },
    [referralCode]
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

  return { signup, errorMessage, referralCode };
};

export default useSignup;

