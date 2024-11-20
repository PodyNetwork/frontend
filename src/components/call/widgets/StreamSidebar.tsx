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
        <Image src={podyLogo} alt="Pody" className="w-6 object-contain" />
      </div>
      <div className="w-full">
        <ul className="flex flex-col items-center justify-center gap-y-8">
          <Link href="/dashboard" className="w-full">
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
                <path d="M160-200h173.46v-320H160v320Zm233.46 0h173.08v-560H393.46v560Zm233.08 0H800v-240H626.54v240ZM100-140v-440h233.46v-240h293.08v320H860v360H100Z"/>
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
                <path d="M160-288.46v76.15q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h615.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-76.15H160Zm12.31-410.77H283q-5-9-7.46-19t-2.46-21q0-41.92 29.04-70.96 29.04-29.04 70.96-29.04 25.15 0 46.53 13.07 21.38 13.07 37.31 32.47l22.31 29.85 22.31-29.85q15.31-20.15 37.06-32.85 21.76-12.69 46.87-12.69 41.84 0 70.87 29.04 29.04 29.04 29.04 70.96 0 11-2.27 21t-7.65 19h112.23q30.31 0 51.31 21 21 21 21 51.31v414.61Q860-182 839-161q-21 21-51.31 21H172.31Q142-140 121-161q-21-21-21-51.31v-414.61q0-30.31 21-51.31 21-21 51.31-21ZM160-391.54h640v-235.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H569.07l81.7 111.69-47.85 34.46-123.69-167.84-123.69 167.84-47.85-34.46 80.47-111.69H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v235.38Zm213.08-307.69q17 0 28.5-11.5t11.5-28.5q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5Zm212.3 0q17 0 28.5-11.5t11.5-28.5q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5Z"/>
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
