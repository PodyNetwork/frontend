"use client";

import React from "react";
import { useParticipants } from "@livekit/components-react";
import useProfile from "@/hooks/user/useProfile";
import { useParams } from "next/navigation";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import useUpdateCallParticipantPermission from "@/hooks/call/useUpdateCallParticipantPermission";
import { useUserContext } from "../utils/UserContext";
import { ParticipantControls } from "./Participants/ParticipantControls";
import { HeaderParticipant } from "./Participants/HeaderParticipants";
import { MobileParticipantInfo } from "./Participants/MobileparticipantInfo";
import { AvatarParticipant } from "../../Avatar/AvatarParticipant";
import { ParticipantNamePody } from "./Participants/ParticipantName";
import { useParticipantBar } from "../utils/ParticipantBarContext";


const Participant = () => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const { profile } = useProfile();
  const participants = useParticipants();
  const { updateCallParticipantPermission } = useUpdateCallParticipantPermission();
  const { users } = useUserContext();
  
  const { participantBarIsExpanded, toggleParticipantBar } = useParticipantBar();

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

  // if (callLoading || profileLoading) {
  //   return <ParticipantListSkeleton expanded={participantBarToggleExpanded} />;
  // }

  return (
    <div className="w-full md:h-full md:overflow-y-auto">
      <HeaderParticipant
        enabled={participantBarIsExpanded}
        participants={participants}
        participantBarToggle={toggleParticipantBar}
      />
      <div className="grid grid-cols-3 xs:grid-cols-4 gap-3 md:mb-[20px] md:gap-0 md:flex flex-row flex-wrap md:flex-col relative __participant_list">
        {participants.map((participant, index) => {
          const { identity, permissions } = participant;
          const profileScan = users.find((user) => user.username === identity);
          const isHost = profileScan?.id === call?.userId;
          const isSpeaker = permissions?.canPublish;
          const role = isSpeaker ? (isHost ? "Host" : "Speaker") : "Listener";
          return (
            <div
              className={`md:flex flex-row justify-between md:gap-x-2 py-0 md:py-2 text-sm text-slate-500 ${
                !participantBarIsExpanded && "md:justify-center"
              }`}
              key={index}
            >
              <div className="flex md:flex-row flex-col items-center truncate relative">
                <div
                  className={`w-[60px] h-[60px] md:w-7 md:h-7 object-cover rounded-full ${
                    !participantBarIsExpanded && "md:w-[2.4rem] md:h-[2.4rem]"
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
        })}
      </div>
    </div>
  );
};

export default Participant;
