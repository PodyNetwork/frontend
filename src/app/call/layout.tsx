"use client";
import CustomLiveKit from "@/components/call/CustomLiveKit";
import CallEndPage from "@/components/call/widgets/Callend";
import LoaderStatus from "@/components/call/widgets/LoaderStatus";
import useCreateCallToken from "@/hooks/call/useCreateCallToken";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const { createCallToken, accessToken } = useCreateCallToken();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (call && !accessToken) {
      createCallToken.mutate({ callId: call._id });
    }
  }, [call, accessToken]);

  if(call?.status === 'ended') return <CallEndPage />

  if(!accessToken) return <LoaderStatus status="loading..."/>

  return (
    <CustomLiveKit token={accessToken}>{children}</CustomLiveKit>
  );
}
