"use client";

import CustomLiveKit from "@/components/call/CustomLiveKit";
import CallEndPage from "@/components/call/widgets/Status/Callend";
import CallNotFound from "@/components/call/widgets/Status/CallNotFound";
import CallPendingPage from "@/components/call/widgets/Status/CallPending";
import Loader from "@/components/preloader/Loader";
import useCreateCallToken from "@/hooks/call/useCreateCallToken";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const isCallPending = (call: any) => call?.type === "scheduled" && call?.status === "pending";
const isCallOngoing = (call: any) => call?.type === "instant" || (call?.type === "scheduled" && call?.status === "ongoing");

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  const { url } = useParams();
  const { call, isError } = useGetCallByURL(url as string);
  const { createCallToken, accessToken } = useCreateCallToken();

  useEffect(() => {
    if (call && !accessToken && isCallOngoing(call)) {
      createCallToken.mutate({ callId: call._id });
    }
  }, [call, accessToken]);

  if (isCallPending(call)) {
    return <CallPendingPage targetDate={new Date(call?.scheduledTime ?? Date.now()).toISOString()} />;
  }

  if (call?.status === "ended") return <CallEndPage />;

  if (typeof call === "undefined" && isError) return <CallNotFound />;

  if (!accessToken) return <Loader />;

  return <CustomLiveKit token={accessToken}>{children}</CustomLiveKit>;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthMiddleware><LayoutComponent>{children}</LayoutComponent></AuthMiddleware>;
};

export default Layout;
