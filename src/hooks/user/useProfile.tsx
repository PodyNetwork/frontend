"use client"
import { useCallback } from 'react';
import axios from "@/network/axios"
import { useQuery } from '@tanstack/react-query';
import { BaseResponse } from '@/types/globals';
import type { ProfileResponse } from '@/types/profile';

const useProfile = () => {
  const fetchProfile = useCallback(async (): Promise<ProfileResponse> => {
    const response = await axios.get<ProfileResponse>('/user/profile');
    return response.data;
  }, []);

  const {
    data,
    isLoading,
    isError,
    isFetched,
    refetch
  } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    retry: false,
  });

  return { 
    profile: data?.data, 
    isFetched,
    isLoading, 
    isError, 
    refetch 
  };
}

export default useProfile;
