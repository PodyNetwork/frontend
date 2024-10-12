"use client";
import MeetLayout from "@/components/call/meetLayout";
import Loader from "@/components/preloader/Loader";
import React, { Suspense } from "react";

const Meet = () => {
  return (
    <main
      className="relative float-left w-full h-full overflow-hidden"
      aria-label="Meeting"
    >
      <MeetLayout />
    </main>
  );
};

export default Meet;
