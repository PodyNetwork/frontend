"use client"
import { useCallback } from 'react';
import axios from "@/network/axios"
import { BaseResponse } from '@/types/globals';
import { useQuery } from '@tanstack/react-query';

interface CallStats {
  activeCalls: number;
  inactiveLinks: number;
  scheduledCalls: number;
  totalLinks: number;
}

interface CallStatsResponse extends BaseResponse {
  data: CallStats;
}

const useCallStats = () => {
  const fetchCallStats = useCallback(async (): Promise<CallStatsResponse> => {
    const response = await axios.get<CallStatsResponse>('/call/stats');
    return response.data;
  }, []);

  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['callStats'],
    queryFn: fetchCallStats,
    retry: 2,
    staleTime: 0,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  return { 
    stats: data?.data, 
    isLoading, 
    isError, 
    refetch 
  };
}

export default useCallStats
