"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/network/axios";
import { BaseResponse } from "@/types/globals";

const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient(); // Access the query client

  const mutation = useMutation<BaseResponse, Error>({
    mutationFn: async () => {
      const response = await axios.post<BaseResponse>("/notification/read/all");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notificationStat'] });
    },
    retry: 2, 
  });

  return {
    markAllAsRead: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export default useMarkAllNotificationsAsRead;