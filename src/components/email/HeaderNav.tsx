import React from "react";
import Image from "next/image";
import logo from "/public/logo/pody logo dark.png";
import useProfile from "@/hooks/user/useProfile";
import { AvatarParticipant } from "../Avatar/AvatarParticipant";
import Link from "next/link";

export const HeaderNavEmain = () => {
  const { profile, isLoading, isError } = useProfile();

  return (
    <div className="flex flex-col items-center w-full bg-pody-secondary/5">
      <nav className="flex w-full items-center justify-between py-6 px-4 sm:px-12 gap-x-4 xl:max-w-[1300px]">
        <Link href="/">
          <Image src={logo} className="w-16 object-contain" alt="Pody" />
        </Link>
        <div className="flex flex-row items-center gap-x-2">
          <div className="w-7 h-7 rounded-full bg-black/20">
            <AvatarParticipant name={profile?.username || "unknown user"} />
          </div>
          {isLoading || isError ? (
            <div className="w-24 h-6 bg-slate-300 animate-pulse rounded"></div>
          ) : (
            <h3 className="text-sm text-slate-500">
              Hello, {profile?.username}
            </h3>
          )}
        </div>
      </nav>
    </div>
  );
};
