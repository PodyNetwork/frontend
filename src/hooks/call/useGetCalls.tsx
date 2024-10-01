"use client"
import { useCallback } from 'react';
import axios from "@/network/axios"
import type { Call } from '../../app/call/types';
import { BaseResponse } from '@/types/globals';
import { useInfiniteQuery } from '@tanstack/react-query';

interface CallsResponse extends BaseResponse {
  data: {
    calls: Call[];
    totalPages: number;
    currentPage: number;
  };
}

interface GetCallsArgs { 
  page?: number, 
  limit?: number, 
  type?: "instant"| "scheduled", 
  status?: 'pending' | 'ongoing' | 'ended' | 'cancelled',
  sortDirection?: "asc" | "desc";
}

const useGetCalls = (args: GetCallsArgs = {}) => {
  const fetchCalls = useCallback(async ({ pageParam = 1 }): Promise<CallsResponse> => {
    const response = await axios.get<CallsResponse>('/call', { 
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
    queryFn: fetchCalls,
    getNextPageParam: (lastPage: CallsResponse) => {
      if (lastPage.data.currentPage >= lastPage.data.totalPages) return undefined;
      return lastPage.data.currentPage + 1;
    },
    initialPageParam: 1,
    retry: 2,
    staleTime: 0,
    refetchInterval: 5000
  });

  const calls = data?.pages?.flatMap((page: CallsResponse) => page.data.calls) || [];

  return { 
    calls, 
    fetchNextPage,
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
    isError, 
    refetch 
  };
}

export default useGetCalls