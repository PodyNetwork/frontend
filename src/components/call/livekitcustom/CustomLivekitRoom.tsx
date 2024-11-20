import {
  LiveKitRoomProps,
  LKFeatureContext,
  RoomContext,
  useLiveKitRoom,
} from "@livekit/components-react";
import * as React from "react";
import { useEffect, useState, useCallback, useMemo } from "react";
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

    const updateParticipantIdentities = useCallback(() => {
      if (room) {
        const identities = [
          room.localParticipant?.identity,
          ...Array.from(room.remoteParticipants.values()).map(
            (p) => p.identity
          ),
        ].filter(Boolean) as string[];

        setParticipantIdentities(identities);
      }
    }, [room]);

    useEffect(() => {
      if (participantsData) {
        setUsers(participantsData);
      }
    }, [participantsData, setUsers]);

    useEffect(() => {
      if (!room) return;

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

      return () => {
        room.off("connected", handleRoomConnected);
        room.off("participantConnected", handleParticipantChange);
        room.off("participantDisconnected", handleParticipantChange);
        room.off("disconnected", handleDisconnected);
      };
    }, [room, updateParticipantIdentities]);

    if (isDisconnected) {
      return <CallEndPage />;
    }

    const memoizedRoomContext = useMemo(() => {
      return room ? (
        <RoomContext.Provider value={room}>
          <LKFeatureContext.Provider value={props.featureFlags}>
            {props.children}
          </LKFeatureContext.Provider>
        </RoomContext.Provider>
      ) : null;
    }, [room, props.featureFlags, props.children]);

    return (
      <div ref={ref} {...htmlProps}>
        {memoizedRoomContext}
      </div>
    );
  }
);
