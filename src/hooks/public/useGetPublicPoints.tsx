"use client";
import { useCallback } from "react";
import axios from "@/network/axios";
import { BaseResponse } from "@/types/globals";
import { useQuery } from "@tanstack/react-query";

interface PointBalanceResponse extends BaseResponse {
  data: {
    points: number;
  };
}

const useGetPublicPoints = () => {
  const fetchPointsHistory =
    useCallback(async (): Promise<PointBalanceResponse> => {
      const response = await axios.get<PointBalanceResponse>(
        "/point/public/total"
      );
      return response.data;
    }, []);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["pointsBalance"],
    queryFn: fetchPointsHistory,
    retry: 2,
    staleTime: 0,
    refetchInterval: 5000,
  });

  const pointsTotal = data?.data;

  return {
    pointsTotal,
    isLoading,
    isError,
    refetch,
  };
};

export default useGetPublicPoints;
