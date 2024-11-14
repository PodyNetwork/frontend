import useEndCall from "@/hooks/call/useEndCall";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import { useParams } from "next/navigation";

import { useState, useEffect } from "react";

const EndCallButton = () => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  // end call
  const [callId, setCallId] = useState<string | undefined>(call?._id);
  const { endCall, errorMessage } = useEndCall();

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
  // end call ends here
  return (
    <div
      onClick={handleEndCall}
      className="bg-pody-danger  flex-shrink-0 h-10 w-10 rounded-full flex justify-center items-center text-slate-100 cursor-pointer"
    >
      <label className="sr-only">endCall</label>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 -960 960 960"
        style={{ msFilter: "" }}
        fill="currentColor"
      >
        <path d="m134.85-319-76.23-74.23q-12.39-12-12.2-28.58.2-16.57 12.58-28.96 83-87.31 194.68-133.27Q365.36-630 479.95-630t226.01 45.96Q817.38-538.08 901-450.77q12.38 12.39 12.58 28.96.19 16.58-12.2 28.58L825.15-319q-12.15 11.77-27.23 13.15-15.07 1.39-27.84-8l-100.62-76.46q-9.92-7.54-14.69-16.72T650-427.69v-112.85q-43.38-14.69-84.54-22.08Q524.31-570 480-570q-44.31 0-85.46 7.38-41.16 7.39-84.54 22.08v112.85q0 11.48-4.77 20.66t-14.69 16.72l-100.62 76.46q-12.77 9.39-27.84 8Q147-307.23 134.85-319ZM250-517.39q-35.92 17.31-69.46 40.85Q147-453 118-427.08q-1.92 1.93-1.92 3.85 0 1.92 1.92 3.85l43.85 43.46q1.92 1.92 4.8 2.5 2.89.57 5.2-1.35l73.54-56.38q1.92-1.54 3.26-3.85 1.35-2.31 1.35-4.23v-78.16Zm460 1.23v76.93q0 1.92 1.35 4.23 1.34 2.31 3.26 3.85l73.54 56.38q2.31 1.92 5.2 1.35 2.88-.58 4.8-2.5L842-418.15q1.92-1.93 1.92-3.85 0-1.92-1.92-3.85-29-27.15-62.54-50.38-33.54-23.23-69.46-39.93Zm-460-1.23Zm460 1.23Z" />
      </svg>
    </div>
  );
};

export default EndCallButton;