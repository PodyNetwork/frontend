"use client";
import React from "react";
import ControlsMobile from "./widgets/ControlsMobile";
import ChatRoom from "./widgets/ChatRoom";
import Participant from "./widgets/Participant";
import StreamSidebar from "./widgets/StreamSidebar";
import StreamScreen from "./widgets/StreamScreen";

const MeetLayout = () => {
  return (
    <section className="w-full flex flex-col bg-white dark:bg-[#111114]">
      <div className="flex flex-col md:flex-row gap-x-2 h-screen max-h-screen md:justify-between relative">
        <div className="w-16 max-w-16 hidden md:block py-5 bg-pody-primary/10 dark:bg-pody-dark h-full relative float-left">
          <StreamSidebar />
        </div>
        <div className="bg-pody-primary/10 dark:bg-pody-dark md:h-full pt-5 md:pt-5 md:py-5 px-7 flex flex-col gap-4 __main-screen relative float-left w-full md:w-[calc(100vw-25rem)]">
          <StreamScreen />
        </div>
        <div className="bg-pody-primary/10 z-20 dark:bg-pody-dark pb-[100px] md:pb-5 overflow-y-auto md:overflow-hidden p-8 md:p-5 w-full md:w-[20rem] relative flex flex-col gap-y-2 flex-1 md:flex-auto">
          <Participant />
        </div>
        <ChatRoom />
      </div>
      <ControlsMobile />
    </section>
  );
};

export default MeetLayout;
