import {
  LiveKitRoomProps,
  LKFeatureContext,
  RoomContext,
  useLiveKitRoom,
} from "@livekit/components-react";
import * as React from "react";
import { useEffect, useState } from "react";
import CallEndPage from "../widgets/Status/Callend";
import useFetchBulkUsers from "@/hooks/user/useFetchBulkUsers";
import { useUserContext } from "../utils/UserContext";

export const CustomLiveKitRoom: React.FC<
  React.PropsWithChildren<LiveKitRoomProps> &
  React.RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement, React.PropsWithChildren<LiveKitRoomProps>>(
  function LiveKitRoom(props, ref) {
    const { room, htmlProps } = useLiveKitRoom(props);
    const [isDisconnected, setIsDisconnected] = useState<boolean>(false);
    const [participantIdentities, setParticipantIdentities] = useState<string[]>([]);

    const { setUsers } = useUserContext(); 
    const { data: participantsData } = useFetchBulkUsers(participantIdentities);

    useEffect(() => {
      if (participantsData) {
        setUsers(participantsData);
      }
    }, [participantsData, setUsers]);

    useEffect(() => {
      if (!room) return;

      const updateParticipantIdentities = () => {
        if (room.state !== "connected") return;

        const identities: string[] = [];

        const localParticipant = room.localParticipant;
        if (localParticipant) {
          identities.push(localParticipant.identity);
        }

        const remoteIdentities = Array.from(room.remoteParticipants.values())
          .map((participant) => participant.identity)
          .filter(Boolean);

        identities.push(...remoteIdentities);
        setParticipantIdentities(identities);
      };

      room.on("connected", updateParticipantIdentities);
      room.on("participantConnected", updateParticipantIdentities);
      room.on("participantDisconnected", updateParticipantIdentities);
    }, [room]);

    useEffect(() => {
      const handleDisconnected = () => {
        setIsDisconnected(true);
      };
      room?.on("disconnected", handleDisconnected);
    }, [room]);

    if (isDisconnected) {
      return <CallEndPage />;
    }

    return (
      <div ref={ref} {...htmlProps}>
        {room && (
          <RoomContext.Provider value={room}>
            <LKFeatureContext.Provider value={props.featureFlags}>
              {props.children}
              {/* You can now use participantsData to display user info */}
            </LKFeatureContext.Provider>
          </RoomContext.Provider>
        )}
      </div>
    );
  }
);
