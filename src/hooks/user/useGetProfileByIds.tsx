"use client"
import { useCallback } from 'react';
import axios from "@/network/axios"
import { useQuery } from '@tanstack/react-query';

interface Profile {
  id: string;
  username: string;
  walletAddress: string;
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
