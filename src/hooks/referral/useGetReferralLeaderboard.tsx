"use client";

import { useState, useCallback } from "react";
import axios from "@/network/axios";
import { useQuery } from "@tanstack/react-query";

interface ReferralData {
  _id: string;
  count: number;
  username: string;
}

interface Referral {
  data: ReferralData[];
  currentPage: number;
  totalPages: number;
}

interface GetReferralArgs {
  limit?: number;
  sortDirection?: "asc" | "desc";
}

const useGetReferralLeaderboard = (args: GetReferralArgs = {}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchReferrals = useCallback(async () => {
    const response = await axios.get<Referral>("/public/user/referral/stat", {
      params: { ...args, page: currentPage },
    });
    return response.data;
  }, [args, currentPage]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["referralsLeaderboard", args, currentPage],
    queryFn: fetchReferrals,
    placeholderData: () => ({
      data: [],
      currentPage,
      totalPages: 1,
    }),
    staleTime: 0,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const referralLeaderboard = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return {
    referralLeaderboard,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    isLoading,
    isError,
    refetch,
  };
};

export default useGetReferralLeaderboard;
