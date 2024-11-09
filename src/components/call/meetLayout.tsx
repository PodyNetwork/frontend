"use client";
import { useEffect } from "react";
import ControlsMobile from "./widgets/StreamControl/ControlsMobile";
import ChatRoom from "./widgets/ChatRoom";
import Participant from "./widgets/Participant";
import StreamSidebar from "./widgets/StreamSidebar";
import StreamScreen from "./widgets/StreamScreen";
import { useChatContext } from "./utils/ChatContext";
import ParticipantMobileManage from "./widgets/ParticipantManageMobile";
import { ParticipanMenuProvider } from "./utils/ParticipantMenuContext";
import { useFullscreen } from "./utils/FullscreenContext";
import { useParticipantBar } from "./utils/ParticipantBarContext";
import { GiftAnimationProvider } from "./utils/GiftanimationContext";

const MeetLayout = () => {
  const { isFullscreen, exitFullscreen } = useFullscreen();
  const { participantBarIsExpanded, isParticipantBarVisible } =
    useParticipantBar();
  const { isChatOpen } = useChatContext();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--radius",
      isFullscreen ? "0" : null
    );
  }, [isFullscreen]);

  const sidebarClasses = isFullscreen ? "hidden" : "hidden md:block";

  const mainScreenClasses = `md:h-full flex flex-col __main-screen relative float-left w-full ${
    isFullscreen
      ? "w-full h-full bg-black"
      : participantBarIsExpanded || isChatOpen
      ? "md:w-[calc(100vw-25rem)] px-1.5 md:px-5 __pd_bg_gradient dark:bg-pody-dark"
      : "md:w-[calc(100vw-9rem)] px-1.5 md:px-5 __pd_bg_gradient dark:bg-pody-dark"
  }`;

  const participantPanelClasses = `__pd_bg_gradient z-20 dark:bg-pody-dark p-1.5 pt-6 w-full flex flex-col gap-y-2 flex-1 md:flex-none ${
    isFullscreen
      ? participantBarIsExpanded
        ? "relative bottom-0 right-0 z-50 w-full md:w-[20rem] md:h-screen overflow-y-auto __shadow_pody transition-all duration-300 ease-in-out md:py-5 md:p-5"
        : !isParticipantBarVisible
        ? "hidden"
        : "md:w-16 md:p-0 md:py-5 md:px-2 relative"
      : participantBarIsExpanded
      ? "md:w-[20rem] md:py-5 md:p-5 relative"
      : "md:w-16 md:p-0 md:py-5 md:px-2 relative"
  }`;

  return (
    <ParticipanMenuProvider>
      <GiftAnimationProvider>
        <section className="w-full flex flex-col bg-white dark:bg-[#111114]">
          <div className="flex flex-col md:flex-row gap-x-2 h-screen max-h-screen md:justify-between relative">
            {/* Sidebar */}
            <div
              className={`w-16 max-w-16 py-5 __pd_bg_gradient dark:bg-pody-dark h-full ${sidebarClasses}`}
            >
              <StreamSidebar />
            </div>
            {/* Main Stream Screen */}
            <div className={mainScreenClasses}>
              <StreamScreen />
            </div>
            {/* Participant Panel */}
            {!isChatOpen && (
              <div className={participantPanelClasses}>
                <Participant />
              </div>
            )}
            {/* Chat Room */}
            <div
              className={`__pd_bg_gradient z-40 dark:bg-pody-dark overflow-hidden md:w-[20rem] md:py-5 md:p-5 relative flex-col gap-y-2 flex-1 md:flex-none ${
                isChatOpen ? "flex" : "hidden"
              }`}
            >
              <ChatRoom />
            </div>
          </div>
          {/* Mobile Controls */}
          <ControlsMobile />
          <ParticipantMobileManage />
        </section>
      </GiftAnimationProvider>
    </ParticipanMenuProvider>
  );
};

export default MeetLayout;
