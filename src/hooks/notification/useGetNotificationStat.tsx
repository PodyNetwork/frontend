"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "@/network/axios";
import { BaseResponse } from "@/types/globals";

interface NotificationStatResponse extends BaseResponse {
  data: {
    totalNotifications: number; 
    unreadNotifications: number;
    readNotifications: number; 
  };
}

const useGetNotificationStat = () => {
  const fetchNotificationStat = async (): Promise<NotificationStatResponse> => {
    const response = await axios.get<NotificationStatResponse>("/notification/stat");
    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<NotificationStatResponse, Error>({
    queryKey: ["notificationStat"], 
    queryFn: fetchNotificationStat,
    retry: 2, 
    staleTime: 10000,
  });

  return {
    stat: data?.data, 
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useGetNotificationStat;