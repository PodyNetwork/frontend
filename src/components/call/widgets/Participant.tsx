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
                <p>
                  <span className="leading-none font-semibold">
                    {participant.name}
                  </span>
                </p>
                {participant.permissions?.canPublish ? (
                  <p className="block md:hidden text-xs text-slate-300 leading-none">
                    <span>Speaker</span>
                  </p>
                ) : (
                  <p className="block md:hidden text-xs text-slate-300 leading-none">
                    <span>Listener</span>
                  </p>
                )}
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
                      participant.isMicrophoneEnabled
                        ? "opacity-100 text-red-500"
                        : "opacity-40"
                    }`}
                    viewBox="0 -960 960 960"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                  >
                    <path d="M480-420q-41.92 0-70.96-29.04Q380-478.08 380-520v-240q0-41.92 29.04-70.96Q438.08-860 480-860q41.92 0 70.96 29.04Q580-801.92 580-760v240q0 41.92-29.04 70.96Q521.92-420 480-420Zm0-220Zm-30 510v-131.85q-99-11.31-164.5-84.92Q220-420.39 220-520h60q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h60q0 99.61-65.5 173.23Q609-273.16 510-261.85V-130h-60Zm30-350q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 ${
                      participant.isCameraEnabled
                        ? "opacity-100 text-red-500"
                        : "opacity-40"
                    }`}
                    viewBox="0 -960 960 960"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                  >
                    <path d="M181.92-180q-30.3 0-51.3-21-21-21-21-51.31v-455.38q0-30.31 21-51.31 21-21 51.3-21h455.39q30.3 0 51.3 21 21 21 21 51.31v183.08l140.77-140.77v370.76L709.61-435.39v183.08q0 30.31-21 51.31-21 21-51.3 21H181.92Zm0-60h455.39q5.38 0 8.84-3.46 3.47-3.46 3.47-8.85v-455.38q0-5.39-3.47-8.85-3.46-3.46-8.84-3.46H181.92q-5.38 0-8.84 3.46t-3.46 8.85v455.38q0 5.39 3.46 8.85t8.84 3.46Zm-12.3 0v-480 480Z" />
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
