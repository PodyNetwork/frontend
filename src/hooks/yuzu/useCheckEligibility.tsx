"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "@/network/axios";
import { BaseResponse } from "@/types/globals";

interface EligibilityResponse extends BaseResponse {
  data: {
    isEligible: boolean;
    reason?: string;
  };
}

const useCheckEligibility = () => {
  const { data, isLoading, isError, refetch } = useQuery<EligibilityResponse, Error>({
    queryKey: ["eligibility"],
    queryFn: async () => {
      const response = await axios.get<EligibilityResponse>("/yuzu/eligibility");
      return response.data;
    },
    staleTime: 10000, 
    refetchInterval: false, 
    retry: 2, 
  });

  return {
    isEligible: data?.data.isEligible ?? false,
    isLoading,
    isError,
    refetch,
  };
};

export default useCheckEligibility;
