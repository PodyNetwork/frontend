"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "@/network/axios";
import { BaseResponse } from "@/types/globals";
import queryClient from "@/utils/queryClient";
import { useEffect, useState } from "react";

interface EligibilityResponse extends BaseResponse {
  data: {
    eligible: boolean;
  };
}

const useCheckEligibility = () => {

  const [retries, setRetries] = useState(0);

  const fetchEligibility =  async () => {
    const response = await axios.get<EligibilityResponse>("/yuzu/eligibility");
    return response.data;
  }
  
  const { data, isLoading, isError, error, refetch } = useQuery<EligibilityResponse, Error>({
    queryKey: ["eligibility"],
    queryFn: fetchEligibility,
    retry: 0,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (error && retries < 1) {
      queryClient.invalidateQueries();
      queryClient.removeQueries();
      setRetries((prev) => prev + 1);
    }
  }, [error, retries])

  return {
    isEligible: data?.data.eligible,
    isLoading,
    isError,
    refetch,
  };
};

export default useCheckEligibility;
