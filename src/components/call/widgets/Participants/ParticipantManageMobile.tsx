import { useMemo, useState } from "react";
import { useParticipants } from "@livekit/components-react";
import useProfile from "@/hooks/user/useProfile";
import { useParams } from "next/navigation";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import useUpdateCallParticipantPermission from "@/hooks/call/useUpdateCallParticipantPermission";
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import { useParticipantMenu } from "../../utils/ParticipantMenuContext";
import { useUserContext } from "../../utils/UserContext";
import { ParticipantNamePody } from "./ParticipantName";
import { ParticipantControls } from "./ParticipantControls";
import useMuteParticipant from "@/hooks/call/useMuteParticipant";
import ParticipantSearch from "./ParticipantSearch";
import { Participant } from "livekit-client";

const ParticipantMobileManage = () => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const { profile } = useProfile();
  const participants = useParticipants();
  const { updateCallParticipantPermission } =
    useUpdateCallParticipantPermission();
  const { users } = useUserContext();
  const { updateParticipantMute } = useMuteParticipant();
  const { isMenuOpen, closeMenu } = useParticipantMenu();
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const handleMuteParticipant = (username: string) => {
    const getParticipantSid = (username: string) => {
      const participant = participants.find((p) => p.identity === username);
      const audioTracks = participant?.audioTrackPublications;
      if (!audioTracks || audioTracks.size === 0) return null;

      const firstTrack = audioTracks.values().next().value;
      return firstTrack?.trackSid || null;
    };
    const trackSid = getParticipantSid(username);

    if (!trackSid) {
      console.error(`Track SID not found for participant: ${username}`);
      return;
    }

    updateParticipantMute.mutate({
      callId: call?._id || "",
      username,
      trackSid,
      mute: true,
    });
  };

  const filteredParticipants = useMemo(() => {
    const hostId = call?.userId;

    return participants
      .filter((participant) =>
        participant.identity.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const getRolePriority = (participant: Participant) => {
          const profile = users.find(
            (user) => user.username === participant.identity
          );
          if (profile?.id === hostId) return 1;
          if (participant.permissions?.canPublish) return 2;
          return 3;
        };

        return getRolePriority(a) - getRolePriority(b);
      });
  }, [participants, searchQuery, users, call]);

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
        <div>
          <ParticipantSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="mb-[20px] gap-0 flex flex-wrap flex-col relative">
          {filteredParticipants.length === 0 ? (
            <div className="text-center text-xs text-slate-500 dark:text-slate-300">
              No Participants Found. Please Invite More Participants to the
              Classroom.
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
                    <ParticipantControls
                      participant={participant}
                      handleAddToSpeak={handleAddToSpeak}
                      handleRemoveFromSpeak={handleRemoveFromSpeak}
                      handleMuteParticipant={handleMuteParticipant}
                      profile={profile}
                      call={call}
                      role={role}
                      className="flex"
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantMobileManage;
