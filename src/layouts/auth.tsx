"use client";
import AuthIntro from "@/components/Auth/AuthIntro";
import React, { ReactNode } from "react";

const auth = ({children}: {children: ReactNode}) => {
  return (
    <section className="bg-black/80 w-full">
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="w-full flex flex-col md:flex-row bg-white __shadow_pody mx-auto h-full">
          <AuthIntro />
          <div className="md:w-1/2 lg:w-[35rem] flex flex-col justify-center items-center h-full px-5">
          {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default auth;
