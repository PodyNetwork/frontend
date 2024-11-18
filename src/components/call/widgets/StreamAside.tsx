import React from "react";
import ChatRoom from "./chat/ChatRoom";
import GiftTile from "./Gift/GiftTile";
import Participant from "./Participants/Participant";
import { useParticipantBar } from "../utils/ParticipantBarContext";
import { useChatContext } from "../utils/ChatContext";
import { useGiftMenu } from "../utils/GiftMenuContext";
import { useFullscreen } from "../utils/FullscreenContext";

const StreamAside = () => {
  const { isParticipantBarVisible, participantBarIsExpanded } =
    useParticipantBar();
  const { isChatOpen } = useChatContext();
  const { isGiftOpen } = useGiftMenu();
  const { isFullscreen } = useFullscreen();

  return (
    <div
      className={`bg-[#F7F7F7] overflow-y-auto md:overflow-visible w-full h-full relative flex-col gap-y-2 flex-1 md:flex-none flex ${
        (isParticipantBarVisible && participantBarIsExpanded && isFullscreen) ||
        (participantBarIsExpanded && !isFullscreen) ||
        isChatOpen ||
        isGiftOpen
          ? "md:w-[20rem]"
          : (isFullscreen && !isParticipantBarVisible) 
          ? "hidden"
          : "md:w-16"
      }`}
    >
      {/* Participant Panel */}
      <div
        className={`w-full relative h-full bg-[#F7F7F7] dark:bg-pody-dark __shadow_pody transition-all duration-300 ease-in-out flex flex-col gap-y-2 flex-1 md:flex-none ${
          !isParticipantBarVisible && isFullscreen && "hidden"
        }`}
      >
        <Participant />
      </div>
      {/* Chat Room */}
      <div
        className={`md:absolute fixed right-0 z-30 top-0 w-[20rem] __chat_full h-full ${
          isChatOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <ChatRoom />
      </div>
      {/* Gift Tile */}
      {isGiftOpen && <GiftTile />}
    </div>
  );
};

export default StreamAside;
