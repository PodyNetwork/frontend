"use client";
import Controls from "./Controls";
import "@livekit/components-styles";
import StreamVideo from "./StreamVideo";
import StreamInfo from "./StreamInfo";

interface Props {
  ToggleChat: () => void;
}

const StreamScreen = ({ToggleChat} : Props) => {

  return (
    <>
      <StreamInfo />
      <StreamVideo />
      <Controls handleChatClick={ToggleChat} />
    </>
  );
};

export default StreamScreen;
