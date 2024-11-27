"use client";
import AuthIntro from "@/components/Auth/AuthIntro";
import React, { ReactNode } from "react";

const auth = ({children}: {children: ReactNode}) => {
  return (
    <section className="bg-black/80 w-full">
      <div className="h-screen flex flex-col items-center justify-center p-4 xs:p-6 md:p-10">
        <div className="w-full flex flex-col md:flex-row max-w-4xl bg-white __shadow_pody mx-auto rounded-3xl h-full p-4">
          <AuthIntro />
          <div className="md:w-1/2 flex flex-col justify-center items-center flex-1">
          {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default auth;
