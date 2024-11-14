import { useCustomDisconnectButton } from "@/components/call/livekitcustom/CustomDisconnect";

const LeaveCallButton = () => {
  const { buttonProps } = useCustomDisconnectButton({
    stopTracks: true,
  });
  const { stopTracks, ...restButtonProps } = buttonProps;
  return (
    <button {...restButtonProps} className="flex-shrink-0">
      <label className="sr-only">LeaveCall</label>
      <div className="bg-pody-danger/90 flex-shrink-0 h-10 w-10 rounded-full flex justify-center items-center text-slate-100 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 -960 960 960"
          style={{ msFilter: "" }}
          fill="currentColor"
        >
          <path d="M790.46-81.23 573.08-298.62q-89.39 75.46-189.27 117.04Q283.92-140 182.39-140q-21.7 0-32.04-12Q140-164 140-182v-129.69q0-15.54 9.58-26.81t24.73-14.65l111.07-22.62q12.54-2.38 26.93 2.04 14.38 4.42 23.54 13.58l89.76 90.54q24.93-14.08 53.81-34.04 28.89-19.97 50.27-38.35L85.23-786.46l42.16-42.15 705.22 705.22-42.15 42.16Zm-422-161.23-70.61-71.39q-1.93-1.92-3.66-2.5-1.73-.57-4.04.2l-84 17.69q-3.07.77-4.61 2.69-1.54 1.92-1.54 5v84.15q0 2.31 1.54 3.85t3.85 1.54q37.53-1.85 80.42-12.27 42.88-10.42 82.65-28.96Zm302-156.69-42.15-42.16q15.77-18.54 32.61-43.42 16.85-24.89 27.77-45.42l-92.38-89.93q-9.16-8.77-12.35-22.69-3.19-13.92-.81-25.23l22.93-117.69q3.38-15.15 14.65-24.73t26.81-9.58H778q18 0 30 12.19 12 12.2 12 30.2 0 99.61-40.46 197.38T670.46-399.15Zm46-187.77Q735-629 745.35-671.31q10.34-42.3 13.42-83.3 0-2.31-1.54-3.85t-3.85-1.54h-84.92q-3.08 0-5 1.54t-2.69 4.61l-18 89.39q-.77 2.31-.19 4.81.57 2.5 2.5 4.42l71.38 68.31Zm0 0Zm-348 344.46Z" />
        </svg>
      </div>
    </button>

    
  );
};

export default LeaveCallButton;