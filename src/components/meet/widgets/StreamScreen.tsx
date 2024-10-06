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
  RoomAudioRenderer,
  useParticipants,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track, Room } from "livekit-client";
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

  // const [room, setRoom] = useState<Room | null>(null);
  
  const Participant = () => {
    const participants = useParticipants(); 
  
    const remoteParticipants = participants.filter(
      (participant) => !participant.isLocal 
    );
  
    if (remoteParticipants.length === 0) {
      return <div>No participants in this meeting</div>;
    }
  
    return (
      <div>
      <h3>Participants</h3>
      <ul>
        {remoteParticipants.map((participant) => (
          <li key={participant.sid}>{participant.identity}</li>
        ))}
      </ul>
    </div>
    );
  };
  

  // useEffect(() => {
  //   if (token && serverUrl) {
  //     const newRoom = new Room();
  //     newRoom.connect(serverUrl, token).then(() => {
  //       setRoom(newRoom);
  //     });

  //     return () => {
  //       newRoom.disconnect();
  //     };
  //   }
  // }, [token, serverUrl]);

  // if (!room) {
  //   return (
  //     <div className="bg-pody-primary/10 dark:bg-pody-dark md:h-full md:rounded-2xl pt-5 md:pt-5 md:py-5 px-7 flex flex-col gap-4 __main-screen relative float-left">
  //       <div className="animate-pulse">
  //           <div className="md:hidden h-6 bg-slate-300 rounded mb-2"></div>
  //           <div className="h-6 bg-slate-200 rounded mb-2"></div> 
  //           <div className="text-sm flex flex-row flex-wrap justify-between gap-x-3 items-center">
  //             <div className="h-4 bg-slate-200 rounded w-1/4"></div>
  //             <div className="h-8 bg-slate-200 rounded w-1/2"></div>
  //           </div>
  //           <div className="w-full flex flex-wrap gap-3 mt-4 mb-2">
  //             <div className="__videobox min-h-[65vh] bg-slate-200 rounded w-full"></div>
  //           </div>
  //           <div className='hidden mt-auto h-10 md:flex flex-wrap justify-center items-center gap-x-4 text-sm' aria-label='controls'>
  //             <div className='bg-slate-200 h-10 w-10 rounded-full flex justify-center items-center animate-pulse'></div>
  //               <div className='bg-slate-200 h-10 w-10 rounded-full flex justify-center items-center animate-pulse'></div> 
  //               <div className='bg-slate-200 h-10 w-10 rounded-full flex justify-center items-center animate-pulse'></div>
  //               <div className='bg-slate-200 h-10 w-10 rounded-full flex justify-center items-center animate-pulse'></div>
  //               <div className='bg-slate-200 h-10 w-10 rounded-full flex justify-center items-center animate-pulse'></div>
  //           </div>
  //         </div>
  //     </div>
  //   );
  // }

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
          <LiveKitRoom token={token} serverUrl={serverUrl}>
            <Participant />
          </LiveKitRoom>
          <div className="text-sm flex flex-row flex-wrap justify-between gap-x-3 items-center">
            <p className="text-slate-500">25 Sep 2024</p>
            <button className="px-2 md:px-4 py-1 md:py-1.5 text-xs md:text-sm whitespace-nowrap bg-pody-primary text-slate-900 rounded-md hover:bg-pody-primary/80 hover:transition-all hidden md:block">
              Share meeting link
            </button>
          </div>
        </div>
        <div className="w-full flex flex-wrap gap-3">
          <div className="__videobox">
            <LiveKitRoom
              video={true}
              audio={true}
              token={token}
              serverUrl={serverUrl}
              data-lk-theme="default"
              style={{ width: "auto", height: "65vh" }}
            >
              <MyVideoConference />
              <RoomAudioRenderer />
              {/* <ControlBar /> */}
            </LiveKitRoom>
          </div>
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
  ).filter((track) => track.participant.permissions?.canPublish);

  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantCustomTile />
    </GridLayout>
  );
}
