import React from "react";
import ChatRoom from "./ChatRoom";
import GiftTile from "./Gift/GiftTile";
import Participant from "./Participant";
import { useParticipantBar } from "../utils/ParticipantBarContext";
import { useChatContext } from "../utils/ChatContext";
import { useGiftMenu } from "../utils/GiftMenuContext";
import { useFullscreen } from "../utils/FullscreenContext";

const StreamAside = () => {
  const { isParticipantBarVisible, participantBarIsExpanded } =
    useParticipantBar();
  const { isChatOpen } = useChatContext();
  const { isGiftOpen } = useGiftMenu();
  const { isFullscreen, exitFullscreen } = useFullscreen();

  return (
    <div
      className={`__pd_bg_gradient overflow-y-auto md:overflow-visible w-full h-full relative flex-col gap-y-2 flex-1 md:flex-none flex ${
        participantBarIsExpanded || isChatOpen || isGiftOpen
          ? "md:w-[20rem]"
          : !isParticipantBarVisible && isFullscreen
          ? "hidden"
          : "md:w-16"
      }`}
    >
      {/* Participant Panel */}
      <div className={`w-full relative h-full __pd_bg_gradient transition-all duration-300 ease-in-out flex flex-col gap-y-2 flex-1 md:flex-none ${!isParticipantBarVisible && isFullscreen && "hidden"}`}>
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
