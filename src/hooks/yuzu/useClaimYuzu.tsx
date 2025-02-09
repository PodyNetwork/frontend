"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "@/network/axios";
import { BaseResponse } from "@/types/globals";

interface ClaimYuzuResponse extends BaseResponse {
  data: {
    success: boolean;
    message: string;
  };
}

const useClaimYuzu = () => {
  const mutation = useMutation<ClaimYuzuResponse, Error, void>({
    mutationFn: async () => {
      const response = await axios.post<ClaimYuzuResponse>("/yuzu/claim");
      return response.data;
    }
  });

  return {
    claimed: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    error: mutation.error,
  };
};

export default useClaimYuzu;
