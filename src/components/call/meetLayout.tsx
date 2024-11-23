"use client";
import { ParticipanMenuProvider } from "./utils/ParticipantMenuContext";
import { GiftAnimationProvider } from "./utils/GiftanimationContext";
import { UnreadMessageProvider } from "./utils/unreadMessageCount";
import Aside from "./v2/Aside";
import Mainscreen from "./v2/Mainscreen";

const MeetLayout = () => {
  return (
    <UnreadMessageProvider>
      <ParticipanMenuProvider>
        <GiftAnimationProvider>
          <section
            className="w-full h-screen max-h-screen relative bg-[#101214] overflow-hidden"
            aria-label="stream layout"
          >
            <div className="w-full h-full flex flex-row px-4 gap-x-4">
              <div className="w-[calc(100%-21rem)] h-full relative flex flex-col">
                <Mainscreen />
              </div>
              <div className="w-[20rem]">
                <Aside />
              </div>
            </div>
          </section>
        </GiftAnimationProvider>
      </ParticipanMenuProvider>
    </UnreadMessageProvider>
  );
};

export default MeetLayout;
