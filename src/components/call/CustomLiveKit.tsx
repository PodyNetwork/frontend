import { CustomLiveKitRoom } from "./livekitcustom/CustomLivekitRoom";
import { type ReactNode } from "react";
import { UserProvider } from "./utils/UserContext";

const CustomLiveKit = ({
  children,
  token,
}: {
  children: ReactNode;
  token: string;
}) => {
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  return (
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
  );
};

export default CustomLiveKit;
