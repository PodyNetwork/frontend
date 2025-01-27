"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
import { Participant } from "livekit-client";
import { useDialog } from "../../utils/DialogContext";
import useEndCall from "@/hooks/call/useEndCall";
import useMuteParticipant from "@/hooks/call/useMuteParticipant";
import ParticipantSearch from "./ParticipantSearch";

/* eslint-disable react-hooks/exhaustive-deps */

const ParticipantPody = () => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const { profile } = useProfile();
  const participants = useParticipants();
  const { updateCallParticipantPermission } = useUpdateCallParticipantPermission();
  const { updateParticipantMute } = useMuteParticipant();
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
  
  

  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const joinSound = useMemo(() => new Audio("/audio/podynotifjoin.mp3"), []);
  const leaveSound = useMemo(() => new Audio("/audio/podynotifjoin.mp3"), []);

  const [prevRemoteParticipants, setPrevRemoteParticipants] = useState<
    Participant[]
  >([]);

  useEffect(() => {
    const remoteParticipants = participants.filter(
      (participant) => !participant.isLocal
    );
    const remoteCount = remoteParticipants.length;

    if (remoteCount === 1 && prevRemoteParticipants.length === 0) {
      joinSound.play();
    }

    if (remoteCount === 0 && prevRemoteParticipants.length === 1) {
      leaveSound.play();
    }

    setPrevRemoteParticipants(remoteParticipants);
  }, [participants, prevRemoteParticipants.length, joinSound, leaveSound]);

  const [callState, setCallState] = useState({
    timeElapsed: 0,
    notificationSent: false,
    isOnlyParticipant: false,
    autoEndCanceled: false,
    callEnded: false,
  });

  const { openDialog } = useDialog();
  const { endCall } = useEndCall();
  const [callId, setCallId] = useState<string | undefined>(call?._id);

  const updateCallState = useCallback(
    (
      updates:
        | Partial<typeof callState>
        | ((prev: typeof callState) => Partial<typeof callState>)
    ) => {
      setCallState((prev) => {
        const newState =
          typeof updates === "function" ? updates(prev) : updates;
        return { ...prev, ...newState };
      });
    },
    []
  );

  const checkIfOnlyParticipant = useCallback(() => {
    const remoteCount = participants.reduce(
      (count, participant) => (!participant.isLocal ? count + 1 : count),
      0
    );
    if ((remoteCount === 0) !== callState.isOnlyParticipant) {
      updateCallState({ isOnlyParticipant: remoteCount === 0 });
    }
  }, [participants, callState.isOnlyParticipant, updateCallState]);

  useEffect(() => {
    checkIfOnlyParticipant();
  }, [participants, checkIfOnlyParticipant]);

  useEffect(() => {
    if (call?._id) {
      setCallId(call._id);
    }
  }, [call]);

  useEffect(() => {
    if (!callState.isOnlyParticipant) {
      updateCallState({
        timeElapsed: 0,
        notificationSent: false,
        autoEndCanceled: true,
        callEnded: false,
      });
      return;
    }

    const intervalId = setInterval(() => {
      setCallState((prev) => {
        if (prev.callEnded) {
          clearInterval(intervalId);
          return prev;
        }
        return { ...prev, timeElapsed: prev.timeElapsed + 1 };
      });
    }, 60000);

    return () => clearInterval(intervalId);
  }, [callState.isOnlyParticipant]);

  useEffect(() => {
    if (!callState.isOnlyParticipant) return;

    if (callState.timeElapsed === 15 && !callState.notificationSent) {
      openDialog("notifNoParticipant");
      updateCallState({ notificationSent: true });
    }

    if (callState.timeElapsed >= 20 && !callState.callEnded) {
      if (callId) {
        endCall.mutate({ callId });
      } else {
        console.error("No call ID available to end the call.");
      }
      updateCallState({ callEnded: true });
    }
  }, [callState, callId, endCall, openDialog]);

  return (
    <>
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
                <ParticipantSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              )}
            </div>
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
                      handleMuteParticipant={handleMuteParticipant}
                      profile={profile}
                      call={call}
                      participantBarToggleExpanded={participantBarIsExpanded}
                      role={role}
                      className="hidden md:flex"
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantPody;
