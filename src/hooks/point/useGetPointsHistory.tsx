"use client"
import { useCallback } from 'react';
import axios from "@/network/axios"
import { BaseResponse } from '@/types/globals';
import { useInfiniteQuery } from '@tanstack/react-query';

interface PointHistoryResponse extends BaseResponse {
    data: {
      pointHistory: {
        _id: string;
        userId: string;
        points: bigint;
        timeCreated: Date;
      },
      totalPages: number,
      currentPage: number
    }
}

interface PointHistoryArgs { 
  page?: number, 
  limit?: number, 
  type?: "instant"| "scheduled", 
  status?: 'pending' | 'ongoing' | 'ended' | 'cancelled',
  sortDirection?: "asc" | "desc";
}

const useGetPointsHistory = (args: PointHistoryArgs = {}) => {
  const fetchPointsHistory = useCallback(async ({ pageParam = 1 }): Promise<PointHistoryResponse> => {
    const response = await axios.get<PointHistoryResponse>('/point/history', { 
      params: { ...args, page: pageParam } 
    });
    return response.data;
  }, [args]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['pointsHistory', args],
    queryFn: fetchPointsHistory,
    getNextPageParam: (lastPage: PointHistoryResponse) => {
      if (lastPage.data.currentPage >= lastPage.data.totalPages) return undefined;
      return lastPage.data.currentPage + 1;
    },
    initialPageParam: 1,
    retry: 2,
    staleTime: 0,
    refetchInterval: 5000
  });

  const pointsHistory = data?.pages?.flatMap((page: PointHistoryResponse) => page.data.pointHistory) || [];

  return { 
    pointsHistory, 
    fetchNextPage,
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
    isError, 
    refetch, 
  };
}

export default useGetPointsHistory