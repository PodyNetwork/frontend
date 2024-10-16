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

interface Props {
  participantBarToggle: () => void;
  participantBarToggleExpanded: boolean;
}

const Participant: React.FC<Props> = ({
  participantBarToggle,
  participantBarToggleExpanded,
}) => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const { profile } = useProfile();
  const participants = useParticipants();
  const { updateCallParticipantPermission } =
    useUpdateCallParticipantPermission();
  const { users } = useUserContext();

  const handleAddToSpeak = (username: string) => {
    updateCallParticipantPermission.mutate({
      participantCanPublish: true,
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
        enabled={participantBarToggleExpanded}
        participants={participants}
        participantBarToggle={participantBarToggle}
      />
      <div className="grid grid-cols-3 xs:grid-cols-4 gap-2.5 md:mb-[20px] md:gap-0 md:flex flex-row flex-wrap md:flex-col relative __participant_list">
        {participants.map((participant, index) => {
          const { identity, permissions } = participant;
          const profileScan = users.find((user) => user.username === identity);
          const isHost = profileScan?.id === call?.userId;
          const isSpeaker = permissions?.canPublish;
          const role = isSpeaker ? (isHost ? "Host" : "Speaker") : "Listener";
          return (
            <div
              className={`md:flex flex-row justify-between md:gap-x-2 py-0 md:py-2 text-sm text-slate-500 ${
                !participantBarToggleExpanded && "md:justify-center"
              }`}
              key={index}
            >
              <div className="flex md:flex-row flex-col items-center truncate relative">
                <div
                  className={`w-[60px] h-[60px] md:w-7 md:h-7 object-cover rounded-full ${
                    !participantBarToggleExpanded && "md:w-[2.7rem] md:h-[2.7rem]"
                  }`}
                >
                  <AvatarParticipant name={participant.identity} />
                </div>
                <div
                  className={`md:ms-2.5 flex flex-col items-center justify-center text-sm ${
                    !participantBarToggleExpanded && "md:hidden"
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
                profile={profile}
                call={call}
                participantBarToggleExpanded={participantBarToggleExpanded}
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
