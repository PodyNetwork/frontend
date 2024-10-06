import { LiveKitRoom, RoomAudioRenderer, useConnectionState} from "@livekit/components-react";
import { Room } from "livekit-client";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";


const CustomLiveKit = ({children, token}: {children: ReactNode, token: string}) => {
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL

    return <LiveKitRoom
    video={true}
    audio={true}
    token={token}
    serverUrl={serverUrl}
  >
    <RoomAudioRenderer />
    {children}
  </LiveKitRoom>
}

export default CustomLiveKit