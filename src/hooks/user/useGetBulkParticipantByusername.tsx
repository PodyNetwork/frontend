"use client";
import { useCallback } from 'react';
import axios from "@/network/axios";
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { BaseResponse } from '@/types/globals';

interface UserBulk {
  id: string;
  username: string;
  walletAddress: string;
}

interface BulkUserResponse extends BaseResponse {
  data: UserBulk[];
}

const useBulkUserByUsername = (usernames: string) => {
  const fetchBulkUsers = useCallback(async (): Promise<BulkUserResponse> => {
    const response = await axios.get<BulkUserResponse>('user/profile/retrieve/bulk', { params: { usernames } });
    return response.data;
  }, [usernames]);

  const {
    data,
    isLoading,
    isError,
    refetch,
  }: UseQueryResult<BulkUserResponse> = useQuery({
    queryKey: ['bulkUserByUsername', usernames],
    queryFn: fetchBulkUsers,
    enabled: !!usernames, 
    retry: false,
    staleTime: 300000, 
  });

  if (isError) {
    console.error("Error fetching bulk users:", data);
  }

  return { 
    userProfiles: data?.data || [], 
    isLoading, 
    isError, 
    refetch 
  };
}

export default useBulkUserByUsername;
