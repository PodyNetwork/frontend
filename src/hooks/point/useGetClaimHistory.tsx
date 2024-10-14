"use client"
import { useCallback } from 'react';
import axios from "@/network/axios"
import { BaseResponse } from '@/types/globals';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ClaimHistoryResponse extends BaseResponse {
    data: {
        claimHistory: {
        _id: string;
        userId: string;
        points: bigint;
        signature: string;
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

const useGetClaimHistory = (args: PointHistoryArgs = {}) => {
  const fetchPointsHistory = useCallback(async ({ pageParam = 1 }): Promise<ClaimHistoryResponse> => {
    const response = await axios.get<ClaimHistoryResponse>('/claim/history', { 
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
    refetch
  } = useInfiniteQuery({
    queryKey: ['calls', args],
    queryFn: fetchPointsHistory,
    getNextPageParam: (lastPage: ClaimHistoryResponse) => {
      if (lastPage.data.currentPage >= lastPage.data.totalPages) return undefined;
      return lastPage.data.currentPage + 1;
    },
    initialPageParam: 1,
    retry: 2,
    staleTime: 0,
    refetchInterval: 5000
  });

  const claimHistory = data?.pages?.flatMap((page: ClaimHistoryResponse) => page.data.claimHistory) || [];

  return { 
    claimHistory, 
    fetchNextPage,
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
    isError, 
    refetch 
  };
}

export default useGetClaimHistory