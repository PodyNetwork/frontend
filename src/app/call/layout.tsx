"use client";
import CustomLiveKit from "@/components/call/CustomLiveKit";
import CallEndPage from "@/components/call/widgets/Callend";
import useCreateCallToken from "@/hooks/call/useCreateCallToken";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const [ isTokenFetched, setIsTokenFetched ] = useState<boolean>(false);
  const { createCallToken, accessToken } = useCreateCallToken();

  console.log(call)
  
  useEffect(() => {
    if (call && !isTokenFetched) {
      createCallToken.mutate({ callId: call._id });
      setIsTokenFetched(true);
    }
  }, [call, isTokenFetched, createCallToken]);

  if(call?.status === 'ended') return <CallEndPage />

  return (
    accessToken && <CustomLiveKit token={accessToken}>{children}</CustomLiveKit>
  );
}
