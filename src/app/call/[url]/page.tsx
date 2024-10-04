'use client'
import React, { useEffect, useState } from 'react'
import MeetLayout from '@/components/meet/meetLayout'
import { useParams } from 'next/navigation';
import useGetCallByURL from '@/hooks/call/useGetCallByURL';
import useCreateCallToken from '@/hooks/call/useCreateCallToken';

const Meet = () => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  
  const { createCallToken, accessToken } = useCreateCallToken();

  const [isTokenFetched, setIsTokenFetched] = useState<boolean>(false)

  useEffect(() => {
    if (call && !isTokenFetched) { 
      createCallToken.mutate({ callId: call._id });
      setIsTokenFetched(true)
    }
  }, [, isTokenFetched, createCallToken]);

  useEffect(() => {
    if (accessToken) {
      console.log("Access Token:", accessToken); 
    }
  }, []); 

  return (
    <main className="relative float-left w-full h-full overflow-hidden" aria-label="Meeting">
        <MeetLayout />
    </main>
  )
}

export default Meet;