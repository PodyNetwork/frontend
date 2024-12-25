"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import Image from "next/image";
import { useNavigate } from "@/components/utils/PageRouter";
import Loader from "@/components/preloader/Loader";

const CallEndPage = () => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const [isOngoing, setIsOngoing] = useState(call?.status === "ongoing");

  useEffect(() => {
    if (call) {
      setIsOngoing(call.status === "ongoing");
    }
  }, [call?.status, call]);

  const { handleClick, isPending } = useNavigate();

  const handleClickMain = () => {
    if (isOngoing) {
      window.location.reload();
    } else {
      handleClick("/dashboard/reward");
    }
  };

  return (
    <>
      {isPending && <Loader />}
      <div className="min-h-screen flex flex-col items-center justify-center bg-pody-dark_secondary text-white p-4">
        <div className="w-full p-4">
          <div className="max-w-md mx-auto flex flex-col text-center items-center justify-center gap-y-3 my-6 bg-white p-9 rounded-xl text-slate-700">
            <Image
              src="/illustration/virtual-meeting-group-video-conference-man-desktop.png"
              className="w-full md:w-[320px] object-contain mx-auto"
              width={450}
              height={300}
              alt="pody audio playback illustration"
            />
            <h2 className="text-xl xs:text-2xl font-medium">
              {isOngoing ? "You've left the Classroom" : "Classroom Ended"}
            </h2>
            <p className="text-sm">
              {isOngoing
                ? "Oops! It looks like you're no longer connected. Don't miss out—reconnect to continue earning Rewards!"
                : "Create Classroom and unlock Rewards, every conversation brings you closer to more exciting Rewards!"}
            </p>
            <div className="flex flex-row gap-2 flex-wrap">
              <button
                onClick={() => handleClick("/dashboard")}
                className="px-4 py-3 bg-pody-dark text-slate-300 text-sm rounded-full w-full sm:w-auto"
              >
                Go to Dashboard
              </button>
              <button
                onClick={handleClickMain}
                className="px-4 py-3 bg-pody-dark text-slate-300 text-sm rounded-full w-full sm:w-auto"
              >
                {isOngoing ? "Resume Classroom" : "Claim Reward"}
              </button>
            </div>
            {!isOngoing && (
              <div>
                <div className="flex items-center gap-2 mt-3 text-center justify-center">
                  <Link
                    href="https://docs.google.com/forms/d/e/1FAIpQLScYTZCgfEUd-Rvk8wqUd1SgZHK2LMy42HbwjwXT2oC0Nwz0GQ/viewform?usp=sf_link"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-pody-danger hover:opacity-50"
                      viewBox="0 -960 960 960"
                      fill="currentColor"
                    >
                      <path d="M612.49-535.38q18.66 0 31.55-13.07 12.88-13.07 12.88-31.73 0-18.67-13.06-31.55-13.07-12.89-31.73-12.89-18.67 0-31.55 13.07-12.89 13.07-12.89 31.73 0 18.67 13.07 31.55 13.06 12.89 31.73 12.89Zm-264.62 0q18.67 0 31.55-13.07 12.89-13.07 12.89-31.73 0-18.67-13.07-31.55-13.06-12.89-31.73-12.89-18.66 0-31.55 13.07-12.88 13.07-12.88 31.73 0 18.67 13.06 31.55 13.07 12.89 31.73 12.89ZM480-420q-57.23 0-105.42 31.58-48.2 31.57-72.43 83.8H342q22-37 58.5-58.5t79.5-21.5q43 0 79.5 21.5t58.5 58.5h39.85q-24.23-52.23-72.43-83.8Q537.23-420 480-420Zm.13 300q-74.67 0-140.41-28.34-65.73-28.34-114.36-76.92-48.63-48.58-76.99-114.26Q120-405.19 120-479.87q0-74.67 28.34-140.41 28.34-65.73 76.92-114.36 48.58-48.63 114.26-76.99Q405.19-840 479.87-840q74.67 0 140.41 28.34 65.73 28.34 114.36 76.92 48.63 48.58 76.99 114.26Q840-554.81 840-480.13q0 74.67-28.34 140.41-28.34 65.73-76.92 114.36-48.58 48.63-114.26 76.99Q554.81-120 480.13-120ZM480-480Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://docs.google.com/forms/d/e/1FAIpQLScYTZCgfEUd-Rvk8wqUd1SgZHK2LMy42HbwjwXT2oC0Nwz0GQ/viewform?usp=sf_link"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-pody-success hover:opacity-50"
                      viewBox="0 -960 960 960"
                      fill="currentColor"
                    >
                      <path d="M612.49-535.38q18.66 0 31.55-13.07 12.88-13.07 12.88-31.73 0-18.67-13.06-31.55-13.07-12.89-31.73-12.89-18.67 0-31.55 13.07-12.89 13.07-12.89 31.73 0 18.67 13.07 31.55 13.06 12.89 31.73 12.89Zm-264.62 0q18.67 0 31.55-13.07 12.89-13.07 12.89-31.73 0-18.67-13.07-31.55-13.06-12.89-31.73-12.89-18.66 0-31.55 13.07-12.88 13.07-12.88 31.73 0 18.67 13.06 31.55 13.07 12.89 31.73 12.89ZM480-284.62q57.23 0 105.42-31.57 48.2-31.58 72.43-83.81H618q-22 37-58.5 58.5T480-320q-43 0-79.5-21.5T342-400h-39.85q24.23 52.23 72.43 83.81 48.19 31.57 105.42 31.57Zm.13 164.62q-74.67 0-140.41-28.34-65.73-28.34-114.36-76.92-48.63-48.58-76.99-114.26Q120-405.19 120-479.87q0-74.67 28.34-140.41 28.34-65.73 76.92-114.36 48.58-48.63 114.26-76.99Q405.19-840 479.87-840q74.67 0 140.41 28.34 65.73 28.34 114.36 76.92 48.63 48.58 76.99 114.26Q840-554.81 840-480.13q0 74.67-28.34 140.41-28.34 65.73-76.92 114.36-48.58 48.63-114.26 76.99Q554.81-120 480.13-120ZM480-480Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
                    </svg>
                  </Link>
                </div>
                <p className="text-xs">
                  Submit your feedback and earn an additional 1500 points!
                </p>
              </div>
            )}
            <div>
              <h4 className="text-sm">
                Join Pody Community{" "}
                <span className="web3-gradient-text font-medium">
                  +30,000 Points
                </span>
              </h4>
              <div className="flex flex-row items-center gap-x-3 justify-center mt-1.5">
                <Link
                  href="https://discord.gg/Xk4JR3P"
                  className="cursor-pointer"
                >
                  <svg
                    id="fi_5968756"
                    enableBackground="new 0 0 512 512"
                    className="w-6 h-6"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="m433.43 93.222c-32.633-14.973-67.627-26.005-104.216-32.324-.666-.122-1.332.183-1.675.792-4.501 8.005-9.486 18.447-12.977 26.655-39.353-5.892-78.505-5.892-117.051 0-3.492-8.39-8.658-18.65-13.179-26.655-.343-.589-1.009-.894-1.675-.792-36.568 6.298-71.562 17.33-104.216 32.324-.283.122-.525.325-.686.589-66.376 99.165-84.56 195.893-75.64 291.421.04.467.303.914.666 1.199 43.793 32.161 86.215 51.685 127.848 64.627.666.203 1.372-.04 1.796-.589 9.848-13.449 18.627-27.63 26.154-42.543.444-.873.02-1.91-.888-2.255-13.925-5.282-27.184-11.723-39.939-19.036-1.009-.589-1.09-2.032-.161-2.723 2.684-2.011 5.369-4.104 7.932-6.217.464-.386 1.11-.467 1.655-.224 83.792 38.257 174.507 38.257 257.31 0 .545-.264 1.191-.182 1.675.203 2.564 2.113 5.248 4.226 7.952 6.237.928.691.867 2.134-.141 2.723-12.755 7.456-26.014 13.754-39.959 19.016-.908.345-1.312 1.402-.867 2.275 7.689 14.892 16.468 29.073 26.134 42.523.404.569 1.13.813 1.796.609 41.835-12.941 84.257-32.466 128.05-64.627.384-.284.626-.711.666-1.178 10.676-110.441-17.881-206.376-75.7-291.421-.14-.284-.382-.487-.664-.609zm-262.336 233.843c-25.227 0-46.014-23.16-46.014-51.604 0-28.443 20.383-51.604 46.014-51.604 25.831 0 46.417 23.364 46.013 51.604 0 28.444-20.384 51.604-46.013 51.604zm170.127 0c-25.226 0-46.013-23.16-46.013-51.604 0-28.443 20.383-51.604 46.013-51.604 25.832 0 46.417 23.364 46.014 51.604 0 28.444-20.181 51.604-46.014 51.604z"
                        fill="#5865f2"
                      ></path>
                    </g>
                  </svg>
                </Link>
                <Link
                  href="https://x.com/intent/follow?screen_name=podynetwork"
                  className="cursor-pointer"
                >
                  <svg
                    id="fi_5968830"
                    enableBackground="new 0 0 1227 1227"
                    viewBox="0 0 1227 1227"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path d="m654.53 592.55 276.12 394.95h-113.32l-225.32-322.28v-.02l-33.08-47.31-263.21-376.5h113.32l212.41 303.85z"></path>
                    <path d="m1094.42 0h-961.84c-73.22 0-132.58 59.36-132.58 132.58v961.84c0 73.22 59.36 132.58 132.58 132.58h961.84c73.22 0 132.58-59.36 132.58-132.58v-961.84c0-73.22-59.36-132.58-132.58-132.58zm-311.8 1040.52-228.01-331.84-285.47 331.84h-73.78l326.49-379.5-326.49-475.17h249.02l215.91 314.23 270.32-314.23h73.78l-311.33 361.9h-.02l338.6 492.77z"></path>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallEndPage;
