"use client";

import React, { useEffect, useState } from "react";
import { useParticipants } from "@livekit/components-react";
import useProfile from "@/hooks/user/useProfile";
import { useParams } from "next/navigation";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import useUpdateCallParticipantPermission from "@/hooks/call/useUpdateCallParticipantPermission";
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import { useParticipantBar } from "../../utils/ParticipantBarContext";
import { useUserContext } from "../../utils/UserContext";
import { HeaderParticipant } from "./HeaderParticipants";
import { MobileParticipantInfo } from "./MobileparticipantInfo";
import { ParticipantControls } from "./ParticipantControls";
import { ParticipantNamePody } from "./ParticipantName";


const Participant = () => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const { profile } = useProfile();
  const participants = useParticipants();
  const { updateCallParticipantPermission } =
    useUpdateCallParticipantPermission();
  const { users } = useUserContext();

  const { participantBarIsExpanded, toggleParticipantBar } =
    useParticipantBar();

  const handleAddToSpeak = (username: string) => {
    updateCallParticipantPermission.mutate({
      participantCanPublish: true,
      callId: call?._id || "",
      username,
    });
  };

  const handleRemoveFromSpeak = (username: string) => {
    updateCallParticipantPermission.mutate({
      participantCanPublish: false,
      callId: call?._id || "",
      username,
    });
  };

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredParticipants = participants.filter((participant) => {
    const { identity } = participant;
    return identity.toLowerCase().includes(searchQuery.toLowerCase());
  });

   const joinSound = new Audio("/audio/podynotifjoin.mp3");
   const leaveSound = new Audio("/audio/podynotifjoin.mp3");
 
   useEffect(() => {
     const remoteParticipants = participants.filter(participant => !participant.isLocal);  
 
     const firstRemoteParticipantJoined = remoteParticipants.length === 1;
     const lastRemoteParticipantLeft = remoteParticipants.length === 0;
 
     if (firstRemoteParticipantJoined) {
       joinSound.play();
     }
 
     if (lastRemoteParticipantLeft) {
       leaveSound.play();
     }
   }, [participants]); 

  return (
    <div className="sm:w-full md:h-full md:overflow-y-auto pb-[100px] md:pb-0 pt-4 px-1.5 md:px-0 md:pt-0">
      <HeaderParticipant
        enabled={participantBarIsExpanded}
        participants={participants}
        participantBarToggle={toggleParticipantBar}
      />
      <div className="max-w-md relative mx-auto md:w-full md:mx-0">
        <div className="gap-3 grid grid-cols-4 md:py-4 md:gap-0 md:px-4 md:flex flex-row flex-wrap md:flex-col relative __pd_participant_list_grd">
          <div className="hidden md:block">
            {participantBarIsExpanded && (
              <input
                type="text"
                placeholder="Search Participants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-3 text-xs w-full px-3 py-2 h-10 rounded-md outline-none bg-slate-100 dark:bg-pody-oxfordblue text-slate-700 dark:text-slate-300"
              />
            )}
          </div>
          {filteredParticipants.length === 0 ? (
            <div className="text-center text-xs text-slate-500 dark:text-slate-300">
              No participants found invite more participant to classroom
            </div>
          ) : (
            filteredParticipants.map((participant, index) => {
              const { identity, permissions } = participant;
              const profileScan = users.find(
                (user) => user.username === identity
              );
              const isHost = profileScan?.id === call?.userId;
              const isSpeaker = permissions?.canPublish;
              const role = isSpeaker
                ? isHost
                  ? "Host"
                  : "Speaker"
                : "Listener";
              return (
                <div
                  className={`md:flex flex-row justify-between md:gap-x-2 py-0 text-sm text-slate-700 dark:text-slate-400 ${
                    !participantBarIsExpanded
                      ? "md:justify-center md:py-2"
                      : "md:bg-slate-50 md:dark:bg-pody-dark_secondary rounded-full md:p-1.5 mb-2.5"
                  }`}
                  key={index}
                >
                  <div className="flex md:flex-row flex-col items-center relative">
                    <div
                      className={`w-[60px] h-[60px] md:w-7 md:h-7 object-cover rounded-full ${
                        !participantBarIsExpanded &&
                        "md:w-[2.4rem] md:h-[2.4rem]"
                      }`}
                    >
                      <AvatarParticipant name={participant.identity} />
                    </div>
                    <div
                      className={`mt-1 md:mt-0 md:ms-2.5 flex flex-col items-center justify-center text-sm ${
                        !participantBarIsExpanded && "md:hidden"
                      }`}
                    >
                      <ParticipantNamePody participant={participant} />
                      <MobileParticipantInfo
                        isSpeaker={!!isSpeaker}
                        participant={participant}
                        role={role}
                      />
                    </div>
                  </div>
                  <ParticipantControls
                    participant={participant}
                    handleAddToSpeak={handleAddToSpeak}
                    handleRemoveFromSpeak={handleRemoveFromSpeak}
                    profile={profile}
                    call={call}
                    participantBarToggleExpanded={participantBarIsExpanded}
                    role={role}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Participant;
