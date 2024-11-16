import React from "react";
import { useParticipants } from "@livekit/components-react";
import useProfile from "@/hooks/user/useProfile";
import { useParams } from "next/navigation";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import useUpdateCallParticipantPermission from "@/hooks/call/useUpdateCallParticipantPermission";
import { useUserContext } from "../utils/UserContext";
import { AvatarParticipant } from "../../Avatar/AvatarParticipant";
import { ParticipantNamePody } from "./Participants/ParticipantName";
import { MicrophoneIcon } from "./Participants/MicrophoneIcon";
import { VideoIcon } from "./Participants/VideoIcon";
import { useParticipantMenu } from "../utils/ParticipantMenuContext";

const ParticipantMobileManage = () => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const { profile } = useProfile();
  const participants = useParticipants();
  const { updateCallParticipantPermission } =
    useUpdateCallParticipantPermission();
  const { users } = useUserContext();

  const { isMenuOpen, closeMenu } = useParticipantMenu();

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

  return (
    <div
      className={`bg-[#F7F7F7] md:hidden h-screen z-50 fixed right-0 w-full max-w-[19rem] __shadow_pody flex-1 pb-[20px] overflow-y-auto overflow-hidden p-4 pt-5 flex flex-col gap-y-2 ${
        isMenuOpen ? "block" : "hidden"
      }`}
    >
      <div className="w-ful h-full overflow-y-auto">
        <div className="flex flex-row justify-between mb-3.5 text-slate-600 dark:text-slate-400">
          <h3 className="font-medium text-base">
            {participants.length > 1 ? "Participants" : "Participant"}
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 -960 960 960"
            fill="currentColor"
            onClick={closeMenu}
          >
            <path d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z" />
          </svg>
        </div>
        <div className="mb-[20px] gap-0 flex flex-wrap flex-col relative">
          {participants.map((participant, index) => {
            const { identity, permissions } = participant;
            const profileScan = users.find(
              (user) => user.username === identity
            );
            const isHost = profileScan?.id === call?.userId;
            const isSpeaker = permissions?.canPublish;
            const role = isSpeaker ? (isHost ? "Host" : "Speaker") : "Listener";
            return (
              <div
                className="flex flex-row justify-between gap-x-2 py-2 text-sm text-slate-500"
                key={index}
              >
                <div className="flex flex-row items-center truncate relative">
                  <div className="w-7 h-7 object-cover rounded-full">
                    <AvatarParticipant name={participant.identity} />
                  </div>
                  <div className="ms-2.5 flex flex-col items-center justify-center text-sm">
                    <ParticipantNamePody participant={participant} />
                  </div>
                </div>
                <div className="flex flex-row items-center gap-x-2.5">
                  {profile?.id === call?.userId &&
                    participant.identity !== profile?.username && (
                      <>
                        {!participant.permissions?.canPublish ? (
                          <button
                            className="text-xs text-blue-500"
                            onClick={() =>
                              handleAddToSpeak(participant.identity)
                            }
                          >
                            Add to speak
                          </button>
                        ) : (
                          <button
                            className="text-xs text-red-500"
                            onClick={() =>
                              handleRemoveFromSpeak(participant.identity)
                            }
                          >
                            Remove
                          </button>
                        )}
                      </>
                    )}
                  <p className="block text-xs">
                    <span>{role}</span>
                  </p>
                  {participant.permissions?.canPublish && (
                    <>
                      <MicrophoneIcon
                        enabled={participant.isMicrophoneEnabled ?? false}
                        participant={participant}
                      />
                      <VideoIcon enabled={participant.isCameraEnabled ?? false} />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ParticipantMobileManage;
