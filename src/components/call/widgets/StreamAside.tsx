import React from "react";
import ChatRoom from "./ChatRoom";
import GiftTile from "./Gift/GiftTile";
import Participant from "./Participant";
import { useParticipantBar } from "../utils/ParticipantBarContext";
import { useChatContext } from "../utils/ChatContext";
import { useGiftMenu } from "../utils/GiftMenuContext";

const StreamAside = () => {
  const { isParticipantBarVisible, participantBarIsExpanded } =
    useParticipantBar();
  const { isChatOpen } = useChatContext();
  const { isGiftOpen } = useGiftMenu();

  const participantPanelClasses = `z-50 w-full relative h-full bg-white dark:bg-pody-dark __shadow_pody transition-all duration-300 ease-in-out w-full flex flex-col gap-y-2 flex-1 md:flex-none`;

  return (
    <div
      className={`__pd_bg_gradient z-40 dark:bg-pody-dark h-full relative flex-col gap-y-2 flex-1 md:flex-none flex ${
        participantBarIsExpanded || isChatOpen || isGiftOpen
          ? "md:w-[20rem]"
          : "md:w-16"
      }`}
    >
      {/* Participant Panel */}
      {isParticipantBarVisible && (
        <div className={participantPanelClasses}>
          <Participant />
        </div>
      )}
      {/* Chat Room */}
      <div className={`absolute top-0 w-full h-full ${isChatOpen ? "translate-y-0" : "translate-y-full"}`}>
        <ChatRoom />
      </div>
      {/* Gift Tile */}
      {isGiftOpen && <GiftTile />}
    </div>
  );
};

export default StreamAside;
