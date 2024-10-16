"use client";
import Controls from "./StreamControl/Controls";
import "@livekit/components-styles";
import StreamVideo from "./StreamVideo";
import StreamInfo from "./StreamInfo";


const StreamScreen = () => {

  return (
    <>
      <StreamInfo />
      <StreamVideo />
      <Controls />
    </>
  );
};

export default StreamScreen;
