"use client";

import CustomLiveKit from "@/components/call/CustomLiveKit";
import CallEndPage from "@/components/call/widgets/Status/Callend";
import CallPendingPage from "@/components/call/widgets/Status/CallPending";
import LoaderStatus from "@/components/call/widgets/Status/LoaderStatus";
import useCreateCallToken from "@/hooks/call/useCreateCallToken";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import AuthMiddleware from "@/middleware/AuthMiddleware";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const { createCallToken, accessToken } = useCreateCallToken();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (call && !accessToken) {
      createCallToken.mutate({ callId: call._id });
    }
  }, [call, accessToken]);

  if (call?.type === "scheduled" && call?.status === "pending") {
    return (
      <CallPendingPage
        targetDate={new Date(call?.scheduledTime ?? Date.now()).toISOString()}
      />
    );
  }

  if (call?.status === "ended") return <CallEndPage />;

  if (!accessToken) return <LoaderStatus status="Loading..." />;

  return <CustomLiveKit token={accessToken}>{children}</CustomLiveKit>;
}


const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthMiddleware><LayoutComponent>{children}</LayoutComponent></AuthMiddleware>
}

export default Layout