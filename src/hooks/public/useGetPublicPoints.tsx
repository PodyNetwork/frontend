"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/network/axios"; // Renamed for clarity
import { BaseResponse } from "@/types/globals";

interface PointBalanceResponse extends BaseResponse {
  data: {
    totalPoints: number;
  };
}

const useGetPublicPoints = () => {
  const fetchPointsHistory = async (): Promise<PointBalanceResponse> => {
    const response = await axiosInstance.get<PointBalanceResponse>(
      "/public/point/leaderboard"
    );
    return response.data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["pointsBalance"],
    queryFn: fetchPointsHistory,
    retry: 2,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const pointsTotal = data?.data.totalPoints ?? 0;

  return {
    pointsTotal,
    isLoading,
    isError,
    refetch,
  };
};

export default useGetPublicPoints;
