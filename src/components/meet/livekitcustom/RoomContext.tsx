import { createContext, useContext } from "react";
import { Room } from "livekit-client";

// Create RoomContext
const RoomContext = createContext<Room | null>(null);

// Custom hook to use the Room context
export const useRoomContext = () => {
  return useContext(RoomContext);
};

// Provider component
export const RoomProvider = ({ room, children }: { room: Room | null, children: React.ReactNode }) => {
  return <RoomContext.Provider value={room}>{children}</RoomContext.Provider>;
};
