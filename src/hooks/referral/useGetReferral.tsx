import { useState, useCallback } from "react";
import axios from "@/network/axios";
import { useQuery } from "@tanstack/react-query";


interface GetReferralArgs {
  limit?: number;
  sortDirection?: "asc" | "desc";
}

const useGetReferrals = (args: GetReferralArgs = {}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchReferrals = useCallback(async () => {
    const { limit = 10, sortDirection = "desc" } = args;

    const response = await axios.get("/user/referral", {
      params: { 
        limit, 
        sortDirection, 
        page: currentPage 
      },
    });

    return response.data.data; 
  }, [args, currentPage]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["referrals", args, currentPage],
    queryFn: fetchReferrals,
    placeholderData: {
      referrals: [],
      totalReferralsCount: 0,
      rank: 0,
      currentPage: 1,
      totalPages: 1,
    },
    staleTime: 0,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const referralData = data?.referrals || [];
  const totalReferralsCount = data?.totalReferralsCount || 0;
  const rank = data?.rank || 0;
  const totalPages = data?.totalPages || 1;

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return {
    referralData,
    totalReferralsCount,
    rank,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    isLoading,
    isError,
    refetch,
  };
};

export default useGetReferrals;
