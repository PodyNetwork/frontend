"use client";
import Image from "next/image";
import podyLogo from "/public/logo/Logo Icon Varient.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AvatarParticipant } from "../../Avatar/AvatarParticipant";
import useProfile from "@/hooks/user/useProfile";

const StreamSidebar = () => {
  const pathname = usePathname();
  const linkisactive = pathname.startsWith("/call/");
  const { profile } = useProfile();

  return (
    <div className="h-full flex flex-col justify-between items-center gap-3 text-slate-600 dark:text-slate-400 overflow-hidden">
      <div>
        <Image src={podyLogo} alt="Pody" className="w-12 h-12" />
      </div>
      <div className="w-full">
        <ul className="flex flex-col items-center justify-center gap-y-8">
          <Link href="/" className="w-full">
            <li className="w-full justify-center flex relative __pd_lk ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                viewBox="0 -960 960 960"
                style={{ msFilter: "" }}
                fill="currentColor"
              >
                <path d="M240-200h133.85v-237.69h212.3V-200H720v-360L480-740.77 240-560v360Zm-60 60v-450l300-225.77L780-590v450H526.15v-237.69h-92.3V-140H180Zm300-330.38Z" />
              </svg>
            </li>
          </Link>
          <li
            className={`w-full justify-center flex relative ${
              linkisactive ? "__active_pd_lk" : "__pd_lk"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 -960 960 960"
              style={{ msFilter: "" }}
              fill="currentColor"
            >
              <path d="M181.92-180q-30.3 0-51.3-21-21-21-21-51.31v-455.38q0-30.31 21-51.31 21-21 51.3-21h455.39q30.3 0 51.3 21 21 21 21 51.31v183.08l140.77-140.77v370.76L709.61-435.39v183.08q0 30.31-21 51.31-21 21-51.3 21H181.92Zm0-60h455.39q5.38 0 8.84-3.46 3.47-3.46 3.47-8.85v-455.38q0-5.39-3.47-8.85-3.46-3.46-8.84-3.46H181.92q-5.38 0-8.84 3.46t-3.46 8.85v455.38q0 5.39 3.46 8.85t8.84 3.46Zm-12.3 0v-480 480Z" />
            </svg>
          </li>
          <Link href="/dashboard/leaderboard" className="w-full">
            <li className="w-full justify-center flex relative __pd_lk">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 -960 960 960"
                style={{ msFilter: "" }}
                fill="currentColor"
              >
                <path d="M160-200h186.92v-320H160v320Zm226.92 0h186.16v-560H386.92v560Zm226.16 0H800v-240H613.08v240ZM120-160v-400h226.92v-240h266.16v320H840v320H120Z" />
              </svg>
            </li>
          </Link>
          <Link href="/dashboard/reward" className="w-full">
            <li className="w-full justify-center flex relative __pd_lk">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 -960 960 960"
                style={{ msFilter: "" }}
                fill="currentColor"
              >
                <path d="M160-296.92v72.3q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69h590.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-72.3H160Zm24.62-381.54H318q-5-9-8.42-19-3.43-10-3.43-21 0-33.85 23.08-56.93 23.08-23.07 56.92-23.07 20.31 0 37.57 10.64t30.13 26.43l24.61 33.7 24.62-33.7q12.61-16.3 30.13-26.69 17.51-10.38 37.72-10.38 33.69 0 56.76 23.07 23.08 23.08 23.08 56.93 0 11-3.04 21t-8.81 19h136.46q27.62 0 46.12 18.5 18.5 18.5 18.5 46.11v389.23q0 27.62-18.5 46.12Q803-160 775.38-160H184.62q-27.62 0-46.12-18.5Q120-197 120-224.62v-389.23q0-27.61 18.5-46.11t46.12-18.5ZM160-383.08h640v-230.77q0-9.23-7.69-16.92-7.69-7.69-16.93-7.69H542.15l79.39 109.38-31.69 22.93-111.39-151.7-111.38 151.7-31.7-22.93 78.93-109.38H184.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.92v230.77Zm226.15-295.38q17 0 28.5-11.5t11.5-28.5q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5Zm184.62 0q17 0 28.5-11.5t11.5-28.5q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5Z" />
              </svg>
            </li>
          </Link>
        </ul>
      </div>
      <div>
        <div className="w-8 h-8">
          <AvatarParticipant name={profile?.username || "Unknown User"} />
        </div>
      </div>
    </div>
  );
};

export default StreamSidebar;
