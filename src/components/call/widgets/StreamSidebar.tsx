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
          <li className="w-full justify-center flex relative __pd_lk">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 -960 960 960"
              style={{ msFilter: "" }}
              fill="currentColor"
            >
              <path d="M450-100v-328.31q-14.15-8.69-22.08-21.68-7.92-12.99-7.92-30.06 0-24.49 17.73-42.22T480-540q24.54 0 42.27 17.73Q540-504.54 540-480.09q0 17.04-7.92 30.37-7.93 13.33-22.08 21.41V-100h-60ZM218.23-204.23q-54.69-52.31-86.46-123.11Q100-398.15 100-479.89q0-78.88 29.92-148.25t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.93t120.68 81.24q51.31 51.31 81.25 120.67Q860-558.8 860-479.94q0 81.71-31.77 152.86-31.77 71.16-86.46 122.85L700-246.38q46-43.93 73-104.33T800-480q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 69 27 129t74 104l-42.77 42.77Zm113-113q-32.69-30.31-51.96-72.16Q260-431.25 260-480q0-91.67 64.14-155.83Q388.28-700 479.91-700q91.63 0 155.86 64.21Q700-571.58 700-479.85q0 48.62-19.27 90.77-19.27 42.16-51.96 71.85L586-360q25-23 39.5-54t14.5-66q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 36 14.5 66.5T374-360l-42.77 42.77Z" />
            </svg>
          </li>
          <li className="w-full justify-center flex relative __pd_lk">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 -960 960 960"
              style={{ msFilter: "" }}
              fill="currentColor"
            >
              <path d="M305.77-260q-60.13 0-102.95-42.19Q160-344.39 160-404.23v-154.92q0-45.49 29.12-79.82 29.11-34.34 74.11-42.57 54.68-10.36 108.39-14.6 53.72-4.24 108.4-4.24 54.67 0 108.86 4.11 54.2 4.12 107.89 14.73 45 8.85 74.11 42.82Q800-604.75 800-559.15v154.92Q800-344 757.07-302q-42.94 42-103.22 42H615q-11.72 0-23.44-1.69-11.71-1.7-22.94-5.93l-61.7-20.46q-13.15-5-26.92-5-13.77 0-26.92 5L391-267.62q-11.23 4.23-22.95 5.93-11.72 1.69-23.43 1.69h-38.85Zm0-60h38.85q7.4 0 14.27-1.19 6.88-1.19 13.65-3.19 27.08-8.62 53.1-17.85 26.03-9.23 54.43-9.23 28.39 0 54.72 8.87 26.34 8.87 52.67 18.21 6.77 2 13.52 3.19T615-320h38.85q35.3 0 60.73-24.74Q740-369.49 740-404.23v-154.92q0-24.04-15.54-41.52-15.54-17.48-38.85-22.48-50.72-10.53-101.93-13.88-51.22-3.35-103.68-3.35-52.62 0-103.29 3.82-50.68 3.83-102.32 13.41-23.31 4.34-38.85 22.23Q220-583.02 220-559.15v154.92q0 34.74 25.19 59.49Q270.39-320 305.77-320ZM60-404.23v-153.08h47.31v153.08H60Zm792.69 0v-153.08H900v153.08h-47.31ZM480-480.38Z" />
            </svg>
          </li>
        </ul>
      </div>
      <div>
        <div className="w-8 h-8"><AvatarParticipant name={profile?.username || "Unknown User"} /></div>
      </div>
    </div>
  );
};

export default StreamSidebar;
