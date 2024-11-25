import React, { useEffect, useRef } from "react";
import Image from "next/image";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import useProfile from "@/hooks/user/useProfile";
import { useParams } from "next/navigation";
import { useDialog } from "../../utils/DialogContext";
import EndCallButton from "../StreamControl/widget/EndCallButton";
import LeaveCallButton from "../StreamControl/widget/LeaveCallButton";
import StreamShare from "../share/StreamShare";

const NoParticipantInCall = () => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const { profile } = useProfile();
  const { closeDialog } = useDialog();

  const dialogNotifRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogNotifRef.current &&
        !dialogNotifRef.current.contains(event.target as Node)
      ) {
        closeDialog("notifNoParticipant");
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
            ref={dialogNotifRef}
        >
          <Image
            src="/illustration/virtual-meeting-group-video-conference-man-desktop.png"
            className="w-full md:w-[320px] object-contain mx-auto"
            width={1500}
            height={536}
            alt="pody audio playback illustration"
          />
          <h2 className="text-base xs:text-lg font-medium mt-2">
            ⏳ To keep things efficient, this Classroom will end in 5 minutes if
            no one joins.
          </h2>
          <p className="text-sm">
            ✨ Great Classroom are just one invite away. Send a quick invite to
            bring someone into the Classroom!
          </p>
          <div className="flex gap-2 flex-row flex-wrap __endleavebtn">
            <StreamShare>
              <div className="px-4 py-3 bg-pody-dark text-slate-300 text-sm rounded-full">
                Invite Participant
              </div>
            </StreamShare>
            {profile?.id === call?.userId ? (
              <EndCallButton>
                <div className="px-4 py-3 bg-pody-danger text-slate-100 text-sm rounded-full">
                  End Classroom
                </div>
              </EndCallButton>
            ) : (
              <LeaveCallButton>
                <div className="px-4 py-3 bg-pody-danger text-slate-300 text-sm rounded-full">
                  Leave Classroom
                </div>
              </LeaveCallButton>
            )}
          </div>
        </div>
      </div>
      <div
        className="absolute top-4 right-4"
        onClick={() => closeDialog("notifNoParticipant")}
      >
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

export default NoParticipantInCall;
