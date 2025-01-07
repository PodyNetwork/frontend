import { useRef, useState } from "react";

const CustomPip = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCustomPip, setIsCustomPip] = useState(false);

  const handleEnterPip = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.requestPictureInPicture();
      } catch (error) {
        console.error("Error entering PiP:", error);
      }
    }
  };

  const handleCustomPip = () => {
    setIsCustomPip(true);
  };

  const handleExitCustomPip = () => {
    setIsCustomPip(false);
  };

  return (
    <div className="relative">
      {/* Main Video */}
      <video
        ref={videoRef}
        className={`w-full h-64 ${isCustomPip ? "hidden" : "block"}`}
        controls
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      />

      {/* Button Controls */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleEnterPip}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Enter True PiP
        </button>
        <button
          onClick={handleCustomPip}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Enter Custom PiP
        </button>
      </div>

      {/* Custom PiP Window */}
      {isCustomPip && (
        <div className="fixed bottom-4 right-4 w-64 h-40 bg-gray-900 shadow-lg text-white rounded flex flex-col">
          <div className="p-2 flex justify-between items-center border-b border-gray-700">
            <span>Custom PiP</span>
            <button
              onClick={handleExitCustomPip}
              className="text-red-400 font-bold"
            >
              ×
            </button>
          </div>
          <video
            ref={videoRef}
            className="flex-1"
            autoPlay
            muted
            src="https://www.w3schools.com/html/mov_bbb.mp4"
          />
          <div className="p-2 text-center">
            <button
              onClick={() => videoRef.current?.play()}
              className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
            >
              Play
            </button>
            <button
              onClick={() => videoRef.current?.pause()}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Pause
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPip;
