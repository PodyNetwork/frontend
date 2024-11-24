"use client"
import { useCallback } from 'react';
import axios from "@/network/axios"
import { useQuery } from '@tanstack/react-query';
import { BaseResponse } from '@/types/globals';

interface Profile {
  id: string;
  username: string;
  walletAddress: string;
}

interface ProfileResponse extends BaseResponse {
  data: Profile;
}

const useProfileById = (id: string) => {
  const fetchProfile = useCallback(async (): Promise<ProfileResponse> => {
    const response = await axios.get<ProfileResponse>(`/user/profile/${id}`);
    return response.data;
  }, [id]);

  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['profile', id],
    queryFn: fetchProfile,
    retry: 2,
    staleTime: 300000, 
  });

  return { 
    profile: data?.data, 
    isLoading, 
    isError, 
    refetch 
  };
}

export default useProfileById;
