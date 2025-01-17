"use client";
import StreamSidebar from "./widgets/StreamSidebar";
import StreamScreen from "./widgets/StreamScreen";
import ParticipantMobileManage from "./widgets/Participants/ParticipantManageMobile";
import { ParticipanMenuProvider } from "./utils/ParticipantMenuContext";
import { useFullscreen } from "./utils/FullscreenContext";
import { GiftAnimationProvider } from "./utils/GiftanimationContext";
import { UnreadMessageProvider } from "./utils/unreadMessageCount";
import StreamAside from "./widgets/StreamAside";
import { useChatContext } from "./utils/ChatContext";
import { useGiftMenu } from "./utils/GiftMenuContext";
import { useParticipantBar } from "./utils/ParticipantBarContext";
import { DialogProvider } from "./utils/DialogContext";
import { HandRaiseProvider } from "./utils/HandRaiseContext";

const MeetLayout = () => {
  const { isFullscreen } = useFullscreen();
  const sidebarClasses = isFullscreen ? "hidden" : "hidden md:block";
  const { participantBarIsExpanded } = useParticipantBar();
  const { isChatOpen } = useChatContext();
  const { isGiftOpen } = useGiftMenu();

  return (
    <UnreadMessageProvider>
      <ParticipanMenuProvider>
        <GiftAnimationProvider>
          <HandRaiseProvider>
            <DialogProvider>
              <section className={`w-full flex flex-col select-none ${isFullscreen ? "bg-[#181A1D]" : "bg-white dark:bg-[#111114]"}`}>
                <div className={`flex flex-col md:flex-row h-screen max-h-screen md:justify-between relative ${isFullscreen ? "gap-x-0" : "gap-x-2"}`}>
                  {/* Sidebar */}
                  <div
                    className={`w-16 max-w-16 py-5 bg-[#F7F7F7] dark:bg-pody-dark h-full ${sidebarClasses}`}
                  >
                    <StreamSidebar />
                  </div>
                  {/* Main Stream Screen */}
                  <div
                    className={`md:h-full flex flex-col __main-screen relative float-left w-full px-1.5 md:px-5" ${
                      isFullscreen
                        ? "bg-[#181A1D]"
                        : "bg-[#F7F7F7] dark:bg-pody-dark"
                    } ${
                      (participantBarIsExpanded || isChatOpen || isGiftOpen) &&
                      !isFullscreen
                        ? "md:w-[calc(100vw-25rem)]"
                        : isFullscreen
                        ? "md:w-full px-1.5 md:px-5 h-full"
                        : "md:w-[calc(100vw-9rem)]"
                    }`}
                  >
                    <StreamScreen />
                  </div>
                  {/* stream aside */}
                  <StreamAside />
                </div>
                <ParticipantMobileManage />
              </section>
            </DialogProvider>
          </HandRaiseProvider>
        </GiftAnimationProvider>
      </ParticipanMenuProvider>
    </UnreadMessageProvider>
  );
};

export default MeetLayout;
