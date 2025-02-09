"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "@/network/axios";
import { BaseResponse } from "@/types/globals";

interface EligibilityResponse extends BaseResponse {
  data: {
    eligible: boolean;
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
    retry: 2,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return {
    isEligible: data?.data.eligible,
    isLoading,
    isError,
    refetch,
  };
};

export default useCheckEligibility;
