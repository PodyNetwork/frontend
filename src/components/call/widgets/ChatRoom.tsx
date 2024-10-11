"use client";
import ChatTile  from "../livekitcustom/ChatTile";

interface props {
  chatToggleState: boolean;
}

const ChatRoom: React.FC<props> = ({chatToggleState}) => {

  return (
    <>
        <ChatTile ChatToggleSet={chatToggleState} />
    </>
  );
};

export default ChatRoom;
