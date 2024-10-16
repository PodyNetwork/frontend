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

const useProfile = () => {
  const fetchProfile = useCallback(async (): Promise<ProfileResponse> => {
    const response = await axios.get<ProfileResponse>('/user/profile');
    return response.data;
  }, []);

  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    retry: false,
  });

  return { 
    profile: data?.data, 
    isLoading, 
    isError, 
    refetch 
  };
}

export default useProfile;
