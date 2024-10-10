"use client";
import Controls from "./Controls";
import {
  useTracks,
  RoomAudioRenderer,
  useParticipants,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import { useParams } from "next/navigation";
import { EnhancedFocusLayout } from "../livekitcustom/FocusLayoutTile";
import { useState } from "react";
import { shareOnMobile } from "react-mobile-share";
import useProfile from "@/hooks/user/useProfile";

const MyVideoConference = () => {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  ).filter((track) => track.participant.permissions?.canPublish);

  const [focusedIndex, setFocusedIndex] = useState(0); // Manage focused participant state

  const handleParticipantClick = (index: number) => {
    setFocusedIndex(index); // Update focused index on click
  };

  return (
    // <GridLayout
    //   tracks={tracks}
    // >
    //   <ParticipantCustomTile />
    // </GridLayout>
    <EnhancedFocusLayout
      tracks={tracks}
      focusedIndex={focusedIndex}
      onParticipantClick={handleParticipantClick}
    />
  );
};

const StreamScreen = () => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const participants = useParticipants();
  const { profile, isLoading, isError } = useProfile();

  return (
    <>
      <div className="md:hidden text-red-200 flex flex-row items-center text-xs xs:text-sm font-semibold justify-between gap-x-2">
        <p className="text-slate-600 dark:text-slate-200 items-center text-sm flex flex-row gap-x-1 truncate">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-slate-600"
            viewBox="0 -960 960 960"
            style={{ msFilter: "" }}
            fill="currentColor"
          >
            <path d="M160-296.92v72.3q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69h590.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-72.3H160Zm24.62-381.54H318q-5-9-8.42-19-3.43-10-3.43-21 0-33.85 23.08-56.93 23.08-23.07 56.92-23.07 20.31 0 37.57 10.64t30.13 26.43l24.61 33.7 24.62-33.7q12.61-16.3 30.13-26.69 17.51-10.38 37.72-10.38 33.69 0 56.76 23.07 23.08 23.08 23.08 56.93 0 11-3.04 21t-8.81 19h136.46q27.62 0 46.12 18.5 18.5 18.5 18.5 46.11v389.23q0 27.62-18.5 46.12Q803-160 775.38-160H184.62q-27.62 0-46.12-18.5Q120-197 120-224.62v-389.23q0-27.61 18.5-46.11t46.12-18.5ZM160-383.08h640v-230.77q0-9.23-7.69-16.92-7.69-7.69-16.93-7.69H542.15l79.39 109.38-31.69 22.93-111.39-151.7-111.38 151.7-31.7-22.93 78.93-109.38H184.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.92v230.77Zm226.15-295.38q17 0 28.5-11.5t11.5-28.5q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5Zm184.62 0q17 0 28.5-11.5t11.5-28.5q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5Z" />
          </svg>
          120,000XP
        </p>
        <div className="flex flex-row gap-x-2 items-center">
          <p className="w-7 h-7 flex items-center justify-center bg-slate-800 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-slate-600"
              viewBox="0 -960 960 960"
              style={{ msFilter: "" }}
              fill="currentColor"
            >
              <path d="M103.85-215.38v-65.85q0-27.85 14.42-47.89 14.42-20.03 38.76-32.02 52.05-24.78 103.35-39.51 51.31-14.73 123.47-14.73 72.15 0 123.46 14.73 51.31 14.73 103.35 39.51 24.34 11.99 38.76 32.02 14.43 20.04 14.43 47.89v65.85h-560Zm640 0v-67.7q0-34.77-14.08-65.64-14.07-30.87-39.92-52.97 29.46 6 56.77 16.65 27.3 10.66 54 23.96 26 13.08 40.77 33.47 14.76 20.4 14.76 44.53v67.7h-112.3Zm-360-289.24q-49.5 0-84.75-35.25t-35.25-84.75q0-49.5 35.25-84.75t84.75-35.25q49.5 0 84.75 35.25t35.25 84.75q0 49.5-35.25 84.75t-84.75 35.25Zm290.77-120q0 49.5-35.25 84.75t-84.75 35.25q-2.54 0-6.47-.57-3.92-.58-6.46-1.27 20.33-24.9 31.24-55.24 10.92-30.34 10.92-63.01t-11.43-62.44q-11.42-29.77-30.73-55.62 3.23-1.15 6.46-1.5 3.23-.35 6.47-.35 49.5 0 84.75 35.25t35.25 84.75ZM143.85-255.38h480v-25.85q0-14.08-7.04-24.62-7.04-10.53-25.27-20.15-44.77-23.92-94.39-36.65-49.61-12.73-113.3-12.73-63.7 0-113.31 12.73-49.62 12.73-94.39 36.65-18.23 9.62-25.27 20.15-7.03 10.54-7.03 24.62v25.85Zm240-289.24q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0 289.24Zm0-369.24Z" />
            </svg>
          </p>
          <div>
            {!isLoading ||
              (!isError && (
                <button
                  onClick={() =>
                    shareOnMobile({
                      text: `"Hey ${profile?.username} invited you to their call"`,
                      url: `"https://pody.network/${call?.url}"`,
                      title: "Pody Meeting",
                      // images: [imgBase64],
                    })
                  }
                >
                  <p className="w-7 h-7 flex items-center justify-center bg-slate-800 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-slate-600"
                      viewBox="0 -960 960 960"
                      style={{ msFilter: "" }}
                      fill="currentColor"
                    >
                      <path d="M730-420v-120H610v-40h120v-120h40v120h120v40H770v120h-40Zm-370-84.62q-49.5 0-84.75-35.25T240-624.62q0-49.5 35.25-84.75T360-744.62q49.5 0 84.75 35.25T480-624.62q0 49.5-35.25 84.75T360-504.62ZM80-215.38v-65.85q0-24.77 14.42-46.35 14.43-21.57 38.81-33.5 56.62-27.15 113.31-40.73 56.69-13.57 113.46-13.57 56.77 0 113.46 13.57 56.69 13.58 113.31 40.73 24.38 11.93 38.81 33.5Q640-306 640-281.23v65.85H80Zm40-40h480v-25.85q0-13.31-8.58-25-8.57-11.69-23.73-19.77-49.38-23.92-101.83-36.65-52.45-12.73-105.86-12.73t-105.86 12.73Q201.69-349.92 152.31-326q-15.16 8.08-23.73 19.77-8.58 11.69-8.58 25v25.85Zm240-289.24q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 369.24Z" />
                    </svg>
                  </p>
                </button>
              ))}
          </div>
        </div>
      </div>
      <div className="relative flex flex-col gap-y-1">
        <h2 className="font-medium text-base md:text-xl text-slate-600 dark:text-slate-200 truncate">
          {call?.title}
        </h2>
        <div className="text-xs md:text-sm flex flex-row flex-wrap gap-x-2 items-center text-slate-400">
          <p>Instant Call</p>
          <p className="flex items-center flex-row gap-x-1.5">
            <div className="flex items-center flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 me-1"
                viewBox="0 -960 960 960"
                style={{ msFilter: "" }}
                fill="currentColor"
              >
                <path d="M480-420q-41.92 0-70.96-29.04Q380-478.08 380-520v-240q0-41.92 29.04-70.96Q438.08-860 480-860q41.92 0 70.96 29.04Q580-801.92 580-760v240q0 41.92-29.04 70.96Q521.92-420 480-420Zm0-220Zm-30 510v-131.85q-99-11.31-164.5-84.92Q220-420.39 220-520h60q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h60q0 99.61-65.5 173.23Q609-273.16 510-261.85V-130h-60Zm30-350q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
              </svg>
              <span>0</span>
            </div>
            <div className="flex items-center flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 me-1"
                viewBox="0 -960 960 960"
                style={{ msFilter: "" }}
                fill="currentColor"
              >
                <path d="M103.85-215.38v-65.85q0-27.85 14.42-47.89 14.42-20.03 38.76-32.02 52.05-24.78 103.35-39.51 51.31-14.73 123.47-14.73 72.15 0 123.46 14.73 51.31 14.73 103.35 39.51 24.34 11.99 38.76 32.02 14.43 20.04 14.43 47.89v65.85h-560Zm640 0v-67.7q0-34.77-14.08-65.64-14.07-30.87-39.92-52.97 29.46 6 56.77 16.65 27.3 10.66 54 23.96 26 13.08 40.77 33.47 14.76 20.4 14.76 44.53v67.7h-112.3Zm-360-289.24q-49.5 0-84.75-35.25t-35.25-84.75q0-49.5 35.25-84.75t84.75-35.25q49.5 0 84.75 35.25t35.25 84.75q0 49.5-35.25 84.75t-84.75 35.25Zm290.77-120q0 49.5-35.25 84.75t-84.75 35.25q-2.54 0-6.47-.57-3.92-.58-6.46-1.27 20.33-24.9 31.24-55.24 10.92-30.34 10.92-63.01t-11.43-62.44q-11.42-29.77-30.73-55.62 3.23-1.15 6.46-1.5 3.23-.35 6.47-.35 49.5 0 84.75 35.25t35.25 84.75ZM143.85-255.38h480v-25.85q0-14.08-7.04-24.62-7.04-10.53-25.27-20.15-44.77-23.92-94.39-36.65-49.61-12.73-113.3-12.73-63.7 0-113.31 12.73-49.62 12.73-94.39 36.65-18.23 9.62-25.27 20.15-7.03 10.54-7.03 24.62v25.85Zm240-289.24q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0 289.24Zm0-369.24Z" />
              </svg>
              <span>{participants.length}</span>
            </div>
          </p>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-3 my-auto">
        <MyVideoConference />
        <RoomAudioRenderer />
      </div>
      <Controls />
    </>
  );
};

export default StreamScreen;
