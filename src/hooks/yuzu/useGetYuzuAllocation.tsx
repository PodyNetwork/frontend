"use client";
import { useCallback } from "react";
import axios from "@/network/axios";
import { useQuery } from "@tanstack/react-query";
import { BaseResponse } from "@/types/globals";

interface YuzuAllocation {
  _id: string;
  allocation: string;
  claimed: boolean;
  createdAt: Date;
}

interface YuzuAllocationResponse extends BaseResponse {
  data: YuzuAllocation;
}

const useYuzuAllocation = () => {
  const fetchYuzuAllocation =
    useCallback(async (): Promise<YuzuAllocationResponse> => {
      const response = await axios.get<YuzuAllocationResponse>(`/yuzu`);
      return response.data;
    }, []);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["yuzuAllocation"],
    queryFn: fetchYuzuAllocation,
    retry: 2,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return {
    yuzuAllocation: data?.data,
    isLoading,
    isError,
    refetch,
  };
};

export default useYuzuAllocation;
