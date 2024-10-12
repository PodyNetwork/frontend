"use client"; // Enable client-side rendering

import MeetLayout from "@/components/call/meetLayout";
import CallEndPage from "@/components/call/widgets/Callend";
import LoaderStatus from "@/components/call/widgets/LoaderStatus";
import { useConnectionState } from "@livekit/components-react";
import { useEffect, useState } from "react";

const Meet = () => {
  const connectionState = useConnectionState();
  const [initialConnection, setInitialConnection] = useState(false);
  const [callEnded, setCallEnded] = useState(false); // Track when the call ends

  useEffect(() => {
    if (connectionState === "connected" && !initialConnection) {
      setInitialConnection(true);
    }

    if (connectionState === "disconnected" && initialConnection) {
      setCallEnded(true); // Mark that the call has ended
    }
  }, [connectionState, initialConnection]);

  if (callEnded) {
    return <CallEndPage />;
  }

  if (connectionState === "connecting") {
    return <LoaderStatus status="Connecting" />;
  }

  return (
    <>
      <main
        className="relative float-left w-full h-full overflow-hidden"
        aria-label="Meeting"
      >
        <MeetLayout />
      </main>
    </>
  );
};

export default Meet;
