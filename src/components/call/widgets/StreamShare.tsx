import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import useProfile from "@/hooks/user/useProfile";
import { useParams } from "next/navigation";
import React from "react";
import { shareOnMobile } from "react-mobile-share";

const StreamShare = ({children}: {children: React.ReactNode}) => {
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const { profile, isLoading, isError } = useProfile();

    return (
      <div>
        {isLoading ||
          (isError ? (
            <></>
          ) : (
            <button
              onClick={() =>
                shareOnMobile({
                  text: `Hey, ${profile?.username} has invited you to their classroom on Pody`,
                  url: `"${call?.url}"`,
                  title: "Pody Classroom",
                })
              }
            >
              {children}
            </button>
          ))}
      </div>
    );
};

export default StreamShare;
