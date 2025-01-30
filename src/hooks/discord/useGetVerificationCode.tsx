"use client"
import { useCallback } from 'react';
import axios from "@/network/axios";
import { useQuery } from '@tanstack/react-query';

type DiscordVerificationResponse = {
  data: {
    code: string
  }
}

const useGetDiscordVerification = () => {
  const fetchVerificationCode = useCallback(async (): Promise<DiscordVerificationResponse> => {
    const response = await axios.get<DiscordVerificationResponse>('/discord/verification/code');
    return response.data;
  }, []);

  const {
    data,
    isLoading,
    isError,
    isFetched,
    refetch
  } = useQuery({
    queryKey: ['dicordVerificationCode'],
    queryFn: fetchVerificationCode,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { 
    verification: data?.data, 
    isFetched,
    isLoading, 
    isError, 
    refetch 
  };
}

export default useGetDiscordVerification;


