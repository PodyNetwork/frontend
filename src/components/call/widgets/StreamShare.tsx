import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import useProfile from "@/hooks/user/useProfile";
import { useParams } from "next/navigation";
import React from "react";
import { shareOnMobile } from "react-mobile-share";


const StreamShare = () => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const { profile, isLoading, isError } = useProfile();

  return (
    <div>
      {!isLoading ||
        (!isError && (
          <button
            onClick={() =>
              shareOnMobile({
                text: `"Hey ${profile?.username} invited you to their call"`,
                url: `"https://pody.network/${call?.url}"`,
                title: "Pody Meeting"
              })
            }
          >
            <p className="w-7 h-7 flex items-center justify-center bg-slate-800 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-slate-600"
                viewBox="0 -960 960 960"
                style={{ msFilter: "" }}
                fill="currentColor"
              >
                <path d="M730-420v-120H610v-40h120v-120h40v120h120v40H770v120h-40Zm-370-84.62q-49.5 0-84.75-35.25T240-624.62q0-49.5 35.25-84.75T360-744.62q49.5 0 84.75 35.25T480-624.62q0 49.5-35.25 84.75T360-504.62ZM80-215.38v-65.85q0-24.77 14.42-46.35 14.43-21.57 38.81-33.5 56.62-27.15 113.31-40.73 56.69-13.57 113.46-13.57 56.77 0 113.46 13.57 56.69 13.58 113.31 40.73 24.38 11.93 38.81 33.5Q640-306 640-281.23v65.85H80Zm40-40h480v-25.85q0-13.31-8.58-25-8.57-11.69-23.73-19.77-49.38-23.92-101.83-36.65-52.45-12.73-105.86-12.73t-105.86 12.73Q201.69-349.92 152.31-326q-15.16 8.08-23.73 19.77-8.58 11.69-8.58 25v25.85Zm240-289.24q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 369.24Z" />
              </svg>
            </p>
          </button>
        ))}
    </div>
  );
};

export default StreamShare;
