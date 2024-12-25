import useProfile from "@/hooks/user/useProfile";
import React from "react";
import { shareOnMobile } from "react-mobile-share";

interface StreamShareProps {
  children: React.ReactNode;
  url: string;
}

const StreamShareUrl = ({ children, url }: StreamShareProps) => {
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
                text: `Hey, ${profile?.username} has invited you to their Classroom on Pody`,
                url: `https://pody.network/classroom/${url}`,
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

export default StreamShareUrl;
