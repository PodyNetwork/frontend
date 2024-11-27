import { useCustomDisconnectButton } from "@/components/call/livekitcustom/CustomDisconnect";
import { ReactNode } from "react";

/* eslint-disable @typescript-eslint/no-unused-vars */

type LeaveCallButtonProps = {
  children: ReactNode;
  className?: string;
};

const LeaveCallButton = ({children, className}: LeaveCallButtonProps) => {
  const { buttonProps } = useCustomDisconnectButton({
    stopTracks: true, 
  });

  const { stopTracks, ...restButtonProps } = buttonProps;

  return (
    <button {...restButtonProps} className={`flex-shrink-0 ${className}`}>
      {children}
    </button>
  );
};

export default LeaveCallButton;
