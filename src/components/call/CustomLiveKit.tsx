import {
  RoomAudioRenderer,
} from "@livekit/components-react";
import { LayoutContextProvider } from "@livekit/components-react";
import { CustomLiveKitRoom } from "./livekitcustom/CustomLivekitRoom";
import { type ReactNode } from "react";


const CustomLiveKit = ({ children, token }: { children: ReactNode; token: string; }) => {
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
 
  return (
    <LayoutContextProvider>
      <CustomLiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={serverUrl}
      >
        <RoomAudioRenderer />
        {children}
      </CustomLiveKitRoom>
    </LayoutContextProvider>
  );
};

export default CustomLiveKit;
