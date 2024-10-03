"use client"
import { useCallback } from 'react';
import axios from "@/network/axios"
import type { Call } from '../../app/call/types';
import { BaseResponse } from '@/types/globals';
import { useQuery } from '@tanstack/react-query';

interface CallResponse extends BaseResponse {
  data: {
    call: Call;
  };
}

const useGetCallByURL = (url: string) => {
  const fetchCall = useCallback(async (): Promise<CallResponse> => {
    const response = await axios.get<CallResponse>(`/call/url/${url}`);
    return response.data;
  }, [url]);

  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['call', url],
    queryFn: fetchCall,
    retry: 2,
    staleTime: 0,
    refetchInterval: 5000
  });

  const call = data?.data;

  return { 
    call, 
    isLoading, 
    isError, 
    refetch 
  };
}

export default useGetCallByURL;
