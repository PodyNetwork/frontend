'use client'
import React from 'react'
import MeetLayout from '@/components/meet/meetLayout'
import { useParams } from 'next/navigation';
import  useGetCallByURL from '@/hooks/call/useGetCallByURL';


const Meet = () => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  console.log(url, call);
  return (
    <main className="relative float-left w-full h-full overflow-hidden" aria-label="Meeting">
        <MeetLayout />
    </main>
  )
}

export default Meet