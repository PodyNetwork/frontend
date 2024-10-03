'use client'
import React, { useEffect } from 'react'
import MeetLayout from '@/components/meet/meetLayout'
import { useParams } from 'next/navigation';
import useGetCallByURL from '@/hooks/call/useGetCallByURL';
import useCreateCallToken from '@/hooks/call/useCreateCallToken';

const Meet = () => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  
  const { createCallToken, errorMessage, accessToken } = useCreateCallToken(); // Destructure accessToken

  useEffect(() => {
    if (call?.url) { 
      createCallToken.mutate({ callId: call.url });
    } else {
      console.log("url is undefined");
    }
  }, []);

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