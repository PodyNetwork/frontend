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
    retry: false, 
    staleTime: 0,
    refetchOnMount: true, 
    refetchOnWindowFocus: true,
  });
  
  const isEligible = data?.data?.eligible === true;
  return {
    isEligible: isEligible ?? false,
    isLoading,
    isError,
    refetch,
  };
};

export default useCheckEligibility;