import React from "react";
import Image from "next/image";
import { useNavigate } from "@/components/utils/PageRouter";
import Loader from "@/components/preloader/Loader";

interface Props {
  showStartButton: boolean;
  handleStartCall: () => void;
}

const HostLobby = ({ showStartButton, handleStartCall }: Props) => {
  const { handleClick, isPending } = useNavigate();

  return (
    <>
      {isPending && <Loader />}
      <div className="min-h-screen flex flex-col items-center justify-center bg-pody-dark_secondary text-white p-4">
        <div className="w-full p-4">
          <div className="max-w-md mx-auto flex flex-col text-center items-center justify-center gap-y-3 my-12 bg-white p-9 rounded-xl text-slate-700">
            <Image
              src="/illustration/11395275.jpg"
              className="w-full md:w-[320px] object-contain mx-auto"
              width={1500}
              height={536}
              alt="pody host lobby"
            />
            <h3 className="text-2xl font-medium">
              Get the Classroom Session Started
            </h3>
            <p className="text-sm">
              The classroom session isn&apos;t live just yet. Click below to start
              the session and engage your students!
            </p>
            <div className="flex flex-row items-center flex-wrap gap-2">
              {showStartButton && (
                <button
                  onClick={handleStartCall}
                  className="px-4 py-3 bg-pody-dark text-slate-300 text-sm rounded-full"
                >
                  Start the CLassroom
                </button>
              )}
              <button
                onClick={() => handleClick("/dashboard")}
                className="px-4 py-3 bg-pody-dark text-slate-300 text-sm rounded-full"
              >
                Go To Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostLobby;
