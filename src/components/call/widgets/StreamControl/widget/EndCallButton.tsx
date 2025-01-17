import useEndCall from "@/hooks/call/useEndCall";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import { useParams } from "next/navigation";
import { useState, useEffect, ReactNode } from "react";

type EndCallButtonProps = {
  children: ReactNode;
  className?: string;
};

const EndCallButton = ({ children, className }: EndCallButtonProps) => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const [callId, setCallId] = useState<string | undefined>(call?._id);
  const { endCall } = useEndCall();

  const handleEndCall = () => {
    if (callId) {
      endCall.mutate({ callId });
    } else {
      console.error("No call ID available to end the call.");
    }
  };

  useEffect(() => {
    if (call?._id) {
      setCallId(call._id);
    }
  }, [call]);

  return (
    <button onClick={handleEndCall} className={className}>
      {children}
    </button>
  );
};

export default EndCallButton;
