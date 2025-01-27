import { useCallback } from "react";
import axios from "@/network/axios";
import { useQuery } from "@tanstack/react-query";

interface GetReferralArgs {
  page?: number;
  limit?: number;
  sortDirection?: string;
  dateJoined?: string | null;
}

interface ReferralResponse {
  referrals: any[]; 
  totalReferralsCount: number; 
  rank: number;
}

const useGetReferrals = (args: GetReferralArgs = {}) => {
  const { page = 1, limit = 10, sortDirection = "desc", dateJoined = null } = args;

  const fetchReferrals = useCallback(async (): Promise<ReferralResponse> => {
    const response = await axios.get("/user/referral", {
      params: {
        page,
        limit,
        sortDirection,
        dateJoined,
      },
    });

    return response.data.data; // Ensure the backend returns `totalReferralsCount`
  }, [page, limit, sortDirection, dateJoined]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["referrals", page, limit, sortDirection, dateJoined],
    queryFn: fetchReferrals,
    staleTime: 0,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const referralData = data?.referrals || [];
  const totalReferralsCount = data?.totalReferralsCount || 0;
  const rank = data?.rank || 0;

  const totalPages = Math.ceil(totalReferralsCount / limit);

  return {
    referralData,
    totalReferralsCount,
    rank,
    totalPages, 
    isLoading,
    isError,
    refetch,
  };
};

export default useGetReferrals;