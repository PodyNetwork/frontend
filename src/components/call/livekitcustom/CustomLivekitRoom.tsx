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
    const [participantIdentities, setParticipantIdentities] = useState<
      string[]
    >([]);
    const [isRoomConnected, setIsRoomConnected] = useState<boolean>(false);

    const { setUsers } = useUserContext();
    
    const shouldFetchUsers =
      isRoomConnected && participantIdentities.length > 0;
   
      const { data: participantsData } = useFetchBulkUsers(
      shouldFetchUsers ? participantIdentities : []
    );

    useEffect(() => {
      if (participantsData) {
        setUsers(participantsData);
      }
    }, [participantsData, setUsers]);

    useEffect(() => {
      if (!room) return;

      const updateParticipantIdentities = () => {
        const identities = [
          room.localParticipant?.identity,
          ...Array.from(room.remoteParticipants.values()).map(
            (p) => p.identity
          ),
        ].filter(Boolean) as string[];

        setParticipantIdentities(identities);
      };

      const handleRoomConnected = () => {
        setIsRoomConnected(true);
        updateParticipantIdentities();
      };

      const handleParticipantChange = () => {
        if (room.state === "connected") {
          updateParticipantIdentities();
        }
      };

      const handleDisconnected = () => {
        setIsDisconnected(true);
      };

      room.on("connected", handleRoomConnected);
      room.on("participantConnected", handleParticipantChange);
      room.on("participantDisconnected", handleParticipantChange);
      room.on("disconnected", handleDisconnected);

      // Cleanup event listeners on component unmount or when room changes
      return () => {
        room.off("connected", handleRoomConnected);
        room.off("participantConnected", handleParticipantChange);
        room.off("participantDisconnected", handleParticipantChange);
        room.off("disconnected", handleDisconnected);
      };
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
