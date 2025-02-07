"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "@/network/axios";
import { BaseResponse } from "@/types/globals";

interface MarkAsReadArgs {
  id: string;
}

const useMarkNotificationAsRead = () => {
  const mutation = useMutation<BaseResponse, Error, MarkAsReadArgs>({
    mutationFn: async ({ id }) => {
      const response = await axios.post<BaseResponse>("/notification/read", { id });
      return response.data;
    },
    retry: 2,
  });

  return {
    markAsRead: mutation.mutate,
    error: mutation.error,
  };
};

export default useMarkNotificationAsRead;