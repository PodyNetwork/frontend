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

const useProfilesByIds = (ids: number[]) => {
  const fetchProfiles = useCallback(async (): Promise<Profile[]> => {
    const response = await axios.post('/user/profiles/', { ids }); 
    return response.data.data; 
  }, [ids]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['profiles', ids],
    queryFn: fetchProfiles,
    retry: 2,
    staleTime: 300000,
    enabled: ids.length > 0, 
  });

  return { profiles: data, isLoading, isError, refetch };
};


export default useProfilesByIds;
