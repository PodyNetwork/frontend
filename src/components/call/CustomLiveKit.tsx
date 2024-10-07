import {
  Chat,
  LiveKitRoom,
  RoomAudioRenderer,
} from "@livekit/components-react";
import { LayoutContextProvider } from "@livekit/components-react";
import type { ReactNode } from "react";

const CustomLiveKit = ({
  children,
  token,
}: {
  children: ReactNode;
  token: string;
}) => {
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  return (
    <LayoutContextProvider>
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={serverUrl}
      >
        <RoomAudioRenderer />
        {children}
      </LiveKitRoom>
    </LayoutContextProvider>
  );
};

export default CustomLiveKit;
