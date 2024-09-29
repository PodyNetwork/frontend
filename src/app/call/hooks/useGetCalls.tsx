"use client"
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import axios from "@/network/axios"
import type { Call } from '../types';
import { BaseResponse } from '@/types/globals';

interface CallsResponse extends BaseResponse {
  data: Call[];
}

const useGetCalls = () => {

  const fetchCalls = useCallback(async (): Promise<CallsResponse> => {
    const response = await axios.get<CallsResponse>('/calls');
    return response.data;
  }, []);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['calls'],
    queryFn: fetchCalls,
  });

  return { calls: data?.data, isLoading, isError, refetch };
}

export default useGetCalls