"use client"
import { useCallback } from 'react';
import axios from "@/network/axios"
import { BaseResponse } from '@/types/globals';
import { useInfiniteQuery } from '@tanstack/react-query';

interface NotificationResponse extends BaseResponse {
    data: {
      notifications: {
        _id: string;
        type: string;
        message: number;
        timeCreated: Date;
      },
      totalPages: number,
      currentPage: number
    }
}

interface NotificationArgs { 
  page?: number, 
  limit?: number, 
}

const useGetNotification = (args: NotificationArgs = { limit: 5 }) => {
  const fetchNotification = useCallback(async ({ pageParam = 1 }): Promise<NotificationResponse> => {
    const response = await axios.get<NotificationResponse>('/notification', { 
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
    queryKey: ['notifications', args],
    queryFn: fetchNotification,
    getNextPageParam: (lastPage: NotificationResponse) => {
      if (lastPage.data.currentPage >= lastPage.data.totalPages) return undefined;
      return lastPage.data.currentPage + 1;
    },
    initialPageParam: 1,
    retry: 2,
    staleTime: 10000,
    refetchInterval: false,
  });

  const notifications = data?.pages?.flatMap((page) => page.data.notifications) || [];

  return { 
    notifications, 
    fetchNextPage,
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
    isError, 
    refetch 
  };
};


export default useGetNotification