"use client"
import { useCallback } from 'react';
import axios from "@/network/axios"
import { BaseResponse } from '@/types/globals';
import { useQuery } from '@tanstack/react-query';

interface PointBalanceResponse extends BaseResponse {
    data: {
        _id: string;
        userId: string;
        points: number;
        claimedPoints: number;
        lastUpdate: Date;
    }
}

const useGetPointsBalance = () => {
  const fetchPointsHistory = useCallback(async (): Promise<PointBalanceResponse> => {
    const response = await axios.get<PointBalanceResponse>('/point/balance');
    return response.data;
  }, []);

  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['pointsBalance'],
    queryFn: fetchPointsHistory,
    retry: 2,
    staleTime: 0,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  const pointsBalance = data?.data

  return { 
    pointsBalance, 
    isLoading, 
    isError, 
    refetch 
  };
}

export default useGetPointsBalance