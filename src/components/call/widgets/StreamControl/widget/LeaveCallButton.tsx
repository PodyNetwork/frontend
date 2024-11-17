import { useCustomDisconnectButton } from "@/components/call/livekitcustom/CustomDisconnect";
import { ReactNode } from "react";

type LeaveCallButtonProps = {
  children: ReactNode;
  className?: string;
};

const LeaveCallButton = ({children, className}: LeaveCallButtonProps) => {
  const { buttonProps } = useCustomDisconnectButton({
    stopTracks: true,
  });
  const { ...restButtonProps } = buttonProps;
  return (
    <button {...restButtonProps} className={`flex-shrink-0 ${className}`}>
      {children}
    </button>
  );
};

export default LeaveCallButton;
