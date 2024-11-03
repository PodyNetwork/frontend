"use client";
import ChatTile  from "../livekitcustom/ChatTile";
import { GiftMenuProvider } from "../utils/GiftMenuContext";

const ChatRoom = () => {

  return (
    <GiftMenuProvider>
       <ChatTile />
    </GiftMenuProvider>
  );
};

export default ChatRoom;
