import { CustomLiveKitRoom } from "./livekitcustom/CustomLivekitRoom";
import { type ReactNode } from "react";
import { UserProvider } from "./utils/UserContext";
import { LayoutContextProvider } from "@livekit/components-react";

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
      <UserProvider>
        <CustomLiveKitRoom
          video={true}
          audio={true}
          token={token}
          serverUrl={serverUrl}
        >
          {children}
        </CustomLiveKitRoom>
      </UserProvider>
    </LayoutContextProvider>
  );
};

export default CustomLiveKit;
