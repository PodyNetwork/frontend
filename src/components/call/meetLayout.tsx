"use client";
import { useState } from "react";
import ControlsMobile from "./widgets/ControlsMobile";
import ChatRoom from "./widgets/ChatRoom";
import Participant from "./widgets/Participant";
import StreamSidebar from "./widgets/StreamSidebar";
import StreamScreen from "./widgets/StreamScreen";

const MeetLayout = () => {
  const [participantBarIsExpanded, setParticipantbarIsExpanded] = useState(true);

  const toggleWidth = () => {
    setParticipantbarIsExpanded((prev) => !prev);
  };

  return (
    <section className="w-full flex flex-col bg-white dark:bg-[#111114]">
      <div className="flex flex-col md:flex-row gap-x-2 h-screen max-h-screen md:justify-between relative">
        <div className="w-16 max-w-16 hidden md:block py-5 bg-pody-primary/10 dark:bg-pody-dark h-full relative float-left">
          <StreamSidebar />
        </div>
        <div className={`bg-pody-primary/10 dark:bg-pody-dark md:h-full pt-5 md:pt-5 md:py-5 px-3.5 flex flex-col gap-4 __main-screen relative float-left w-full ${participantBarIsExpanded ? "md:w-[calc(100vw-25rem)]" : "md:w-[calc(100vw-9rem)]"}`}>
          <StreamScreen />
        </div>
        <div className={`bg-pody-primary/10 z-20 dark:bg-pody-dark pb-[100px] md:pb-5 overflow-y-auto md:overflow-hidden p-3.5 pt-6 w-full  relative flex flex-col gap-y-2 flex-1 md:flex-none ${participantBarIsExpanded ? 'md:w-[20rem] md:py-5 md:p-5 ' : 'md:w-16 md:p-0 md:py-5 md:px-2'}`}>
          <Participant participantBarToggle={toggleWidth} participantBarToggleExpanded={participantBarIsExpanded} />
        </div>
        <ChatRoom />
      </div>
      <ControlsMobile />
    </section>
  );
};

export default MeetLayout;
