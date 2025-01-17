import React, { useRef, useEffect } from "react";
import Image from "next/image";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import useProfile from "@/hooks/user/useProfile";
import { useParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import LeaveCallButton from "./LeaveCallButton";
import { useDialog } from "@/components/call/utils/DialogContext";

const EndCallDialog = () => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const { profile } = useProfile();
  const { closeDialog } = useDialog();

  const dialogRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        closeDialog("leaveControl");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeDialog]);

  return (
    <div className="dark:bg-black/80 bg-black/90 fixed top-0 left-0 w-full h-screen max-h-screen flex flex-col z-50 items-center justify-center overflow-y-auto">
      <div className="w-full p-4">
        <div
          className="max-w-md mx-auto flex flex-col text-center items-center justify-center gap-y-3 my-6 bg-white p-9 rounded-xl text-slate-700"
          ref={dialogRef}
        >
          <Image
            src="/illustration/virtual-meeting-group-video-conference-man-desktop.png"
            className="w-full md:w-[320px] object-contain mx-auto"
            width={450}
            height={300}
            alt="pody audio playback illustration"
            priority
            loading="eager"
            quality={75}
          />
          <h2 className="text-base xs:text-lg font-medium mt-2">
            {profile?.id === call?.userId
              ? "Would you like to end the Classroom now, or just step away for a moment?"
              : "Are you sure you want to leave? Staying means more rewards. Don’t miss out!"}
          </h2>
          <div className="flex gap-2 flex-row flex-wrap __endleavebtn">
            <LeaveCallButton>
              <div className="px-4 py-3 bg-pody-dark text-slate-300 text-sm rounded-full">
                Leave Classroom
              </div>
            </LeaveCallButton>
            {profile?.id === call?.userId && (
              <EndCallButton>
                <div className="px-4 py-3 bg-pody-danger text-slate-100 text-sm rounded-full">
                  End Classroom
                </div>
              </EndCallButton>
            )}
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4" onClick={() => closeDialog('leaveControl')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-slate-200"
          viewBox="0 -960 960 960"
          fill="currentColor"
        >
          <path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z" />
        </svg>
      </div>
    </div>
  );
};

export default EndCallDialog;
