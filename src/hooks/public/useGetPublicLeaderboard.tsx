"use client"
import { useCallback } from 'react';
import axios from "@/network/axios"
import { BaseResponse } from '@/types/globals';
import { useInfiniteQuery } from '@tanstack/react-query';
import { LeaderboardEntry } from '@/app/dashboard/leaderboard/types';


interface LeaderboardResponse extends BaseResponse {
  data: {
    leaderboard: LeaderboardEntry[];
    totalPages: number;
    currentPage: number;
  };
}

interface LeaderboardParams {
  limit?: number;
}

const useLeaderboard = ({ limit = 10 }: LeaderboardParams = {}) => {
  const fetchLeaderboard = useCallback(async ({ pageParam = 1 }): Promise<LeaderboardResponse> => {
    const response = await axios.get<LeaderboardResponse>('/point/public/leaderboard', {
      params: { page: pageParam, limit }
    });
    return response.data;
  }, [limit]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch
  } = useInfiniteQuery({
    queryKey: ['leaderboard', limit],
    queryFn: fetchLeaderboard,
    getNextPageParam: (lastPage: LeaderboardResponse) => {
      if (lastPage.data.currentPage >= lastPage.data.totalPages) return undefined;
      return lastPage.data.currentPage + 1;
    },
    initialPageParam: 1,
    retry: 2,
    staleTime: 0, 
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  const leaderboard = data?.pages?.flatMap((page: LeaderboardResponse) => page.data.leaderboard) || [];

  return { 
    leaderboard, 
    fetchNextPage,
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
    isError, 
    refetch 
  };
}

export default useLeaderboard