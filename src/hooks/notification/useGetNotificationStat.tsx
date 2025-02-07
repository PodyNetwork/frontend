"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "@/network/axios";
import { BaseResponse } from "@/types/globals";

interface NotificationStatResponse extends BaseResponse {
  data: {
    unreadCount: number;
    totalCount: number;
  };
}

const useGetNotificationStat = () => {
  const { data, isLoading, isError, refetch } = useQuery<NotificationStatResponse, Error>({
    queryKey: ["notificationStat"],
    queryFn: async () => {
      const response = await axios.get<NotificationStatResponse>("/notification/stat");
      return response.data;
    },
    staleTime: 10000, 
    refetchInterval: false, 
    retry: 2,
  });

  return {
    stat: data?.data || { unreadCount: 0, totalCount: 0 },
    isLoading,
    isError,
    refetch,
  };
};

export default useGetNotificationStat;
