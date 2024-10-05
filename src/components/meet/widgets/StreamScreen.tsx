"use client";
import React, { useEffect, useState } from "react";
import Controls from "./Controls";
import { useParams } from "next/navigation";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import useCreateCallToken from "@/hooks/call/useCreateCallToken";

import {
  GridLayout,
  LiveKitRoom,
  useTracks,
  ControlBar,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";
import { ParticipantCustomTile } from "../livekitcustom/ParticipantCustomTile";

const StreamScreen = () => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);

  const { createCallToken, accessToken } = useCreateCallToken();

  const [isTokenFetched, setIsTokenFetched] = useState<boolean>(false);

  useEffect(() => {
    if (call && !isTokenFetched) {
      createCallToken.mutate({ callId: call._id });
      setIsTokenFetched(true);
    }
  }, [call, isTokenFetched, createCallToken]); 

  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  const token = accessToken;

  return (
    token && (
      <div className="bg-pody-primary/10 dark:bg-pody-dark md:h-full md:rounded-2xl pt-5 md:pt-5 md:py-5 px-7 flex flex-col gap-4 __main-screen relative float-left">
        <div className="md:hidden text-red-200 flex flex-row items-center text-sm font-semibold justify-between gap-x-2">
          <p className="text-slate-500">Mining Hash: 120m/s</p>
          <div className="flex flex-row gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-slate-600"
              viewBox="0 0 24 24"
              style={{ msFilter: "" }}
              fill="currentColor"
            >
              <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
            <p className="text-pody-danger">End Meeting</p>
          </div>
        </div>
        <div className="relative flex flex-col gap-y-2">
          <h2 className="font-bold text-lg md:text-xl text-slate-600 dark:text-slate-400">
            0x3ax on social impact of Nigeria Education
          </h2>
          <div className="text-sm flex flex-row flex-wrap justify-between gap-x-3 items-center">
            <p className="text-slate-500">25 Sep 2024</p>
            <button className="px-2 md:px-4 py-1 md:py-1.5 text-xs md:text-sm whitespace-nowrap bg-pody-primary text-slate-900 rounded-md hover:bg-pody-primary/80 hover:transition-all hidden md:block">
              Share meeting link
            </button>
          </div>
        </div>
        <div className="w-full flex flex-wrap gap-3">
          <LiveKitRoom
            video={true}
            audio={true}
            token={token}
            serverUrl={serverUrl}
            data-lk-theme="default"
            style={{ width: "100%", aspectRatio: 16 / 9, height: "auto" }}
          >
            <MyVideoConference />
            <ControlBar />
          </LiveKitRoom>
        </div>
        <Controls />
      </div>
    )
  );
};

export default StreamScreen;

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  ).filter(track => track.participant.permissions?.canPublish);

  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantCustomTile />
    </GridLayout>
  );
}
