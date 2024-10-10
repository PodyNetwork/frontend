"use client";
import React from "react";
import { useParticipants } from "@livekit/components-react";
import Image from "next/image";

const Participant = () => {
  const participants = useParticipants();

  return (
    <div className="w-full md:h-full md:overflow-y-auto">
      <div className="hidden md:flex flex-row justify-between mb-3.5">
        <h3 className="text-base">
          <span className="font-semibold text-slate-600 dark:text-slate-400">
            Participant
          </span>{" "}
          <span className="text-slate-500">({participants.length})</span>
        </h3>
      </div>
      <div className="grid grid-cols-4 gap-2.5 md:mb-[20px] md:gap-0 md:flex flex-row flex-wrap md:flex-col relative __participant_list">
        {participants.map((participant, index) => (
          <div
            className="md:flex flex-row justify-between md:gap-x-2 py-0 md:py-2 text-sm text-slate-500"
            key={index}
          >
            <div className="flex md:flex-row flex-col items-center">
              <Image
                src="/avatar/user1.webp"
                alt="user icon"
                width={200}
                height={200}
                className="w-[70px] h-[70px] md:w-7 md:h-7 object-cover rounded-full"
              />
              <div className="md:ms-2.5 flex flex-col items-center text-sm">
                <p className="text-sm mt-1 md:mt-0 text-slate-300">
                  <span className="leading-none font-semibold truncate">
                    {participant.name}
                  </span>
                </p>
                <p className="block md:hidden text-xs leading-none">
                  {participant.permissions?.canPublish ? (
                    <span>Speaker</span>
                  ) : (
                    <span>Listener</span>
                  )}
                </p>
              </div>
            </div>
            <div className="hidden md:flex flex-row items-center gap-x-2.5">
              {!participant.permissions?.canPublish && (
                <button className="text-xs text-blue-500">Add to speak</button>
              )}
              {participant.permissions?.canPublish ? (
                <p className="hidden md:block text-xs">
                  <span>Host</span>
                </p>
              ) : (
                <p className="hidden md:block text-xs">
                  <span>Listener</span>
                </p>
              )}
              {participant.permissions?.canPublish && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 ${
                      participant.isMicrophoneEnabled &&
                      "opacity-100 text-red-500"
                    }`}
                    viewBox="0 -960 960 960"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                  >
                    {participant.isMicrophoneEnabled ? (
                      <path d="M480-420q-41.92 0-70.96-29.04Q380-478.08 380-520v-240q0-41.92 29.04-70.96Q438.08-860 480-860q41.92 0 70.96 29.04Q580-801.92 580-760v240q0 41.92-29.04 70.96Q521.92-420 480-420Zm0-220Zm-30 510v-131.85q-99-11.31-164.5-84.92Q220-420.39 220-520h60q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h60q0 99.61-65.5 173.23Q609-273.16 510-261.85V-130h-60Zm30-350q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
                    ) : (
                      <path d="m669.23-423.54-30.31-31.84q5.54-11.47 9.08-28.39t3.54-36.23h40q0 30.15-6.08 53.5t-16.23 42.96ZM451.54-642.46Zm78.15 78.92-38.15-38.15V-760q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5v76.77l-40-40V-760q0-33.85 23.08-56.92Q417.69-840 451.54-840q33.84 0 56.92 23.08 23.08 23.07 23.08 56.92v187.69q0 2.54-.58 4.62-.57 2.08-1.27 4.15ZM431.54-140v-140.69q-94-8.62-157-76.85-63-68.23-63-162.46h40q0 83 58.27 141.5T451.54-320q43.23 0 80.65-17.04 37.43-17.04 64.73-46.81l28.54 28.54q-29 31.46-68.5 51.31t-85.42 23.31V-140h-40Zm365.84 13.23L78.31-845.85l28.31-28.3 719.07 719.07-28.31 28.31Z" />
                    )}
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 ${
                      participant.isCameraEnabled && "opacity-100 text-red-500"
                    }`}
                    viewBox="0 -960 960 960"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                  >
                    {participant.isCameraEnabled ? (
                      <path d="M181.92-180q-30.3 0-51.3-21-21-21-21-51.31v-455.38q0-30.31 21-51.31 21-21 51.3-21h455.39q30.3 0 51.3 21 21 21 21 51.31v183.08l140.77-140.77v370.76L709.61-435.39v183.08q0 30.31-21 51.31-21 21-51.3 21H181.92Zm0-60h455.39q5.38 0 8.84-3.46 3.47-3.46 3.47-8.85v-455.38q0-5.39-3.47-8.85-3.46-3.46-8.84-3.46H181.92q-5.38 0-8.84 3.46t-3.46 8.85v455.38q0 5.39 3.46 8.85t8.84 3.46Zm-12.3 0v-480 480Z" />
                    ) : (
                      <path d="M823.08-329.23 701.54-450.77v84.69l-40-40v-289.3q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92h-289.3l-40-40h329.3q27.62 0 46.12 18.5 18.5 18.5 18.5 46.12v186.15l121.54-121.54v301.54Zm-47.23 207.85L96.77-800.46l28.31-28.31 679.07 679.08-28.3 28.31ZM506.46-561.15Zm-88.31 81.77ZM195.38-758.46 233.85-720h-27.7q-10.77 0-17.69 6.92-6.92 6.93-6.92 17.7v430.76q0 10.77 6.92 17.7 6.92 6.92 17.69 6.92h430.77q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-27.69L700-253.85q-3.85 23-21.19 38.43Q661.46-200 636.92-200H206.15q-27.61 0-46.11-18.5t-18.5-46.12v-430.76q0-24.54 15.42-41.89t38.42-21.19Z" />
                    )}
                  </svg>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participant;
