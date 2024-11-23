import React from "react";

const StreamScreen = () => {
  return (
    <div className="flex-1">
      <div className="w-full h-full bg-[#1C1E20] rounded-xl relative">
        <button className="bg-blue-600 w-6 h-6 rounded-full top-3 right-3 absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 m-auto text-slate-400"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
          </svg>
        </button>
        <div className="bg-orange-300 bottom-3 left-3 absolute block rounded-full px-5 py-1.5 text-sm">
          John mark
        </div>
      </div>
      {/* <div
        className="relative __video_layout_container_v2 grid grid-cols-1"
        style={
          {
            "--video-count": limitedVideoCount,
          } as CustomCSSProperties
        }
      >
        <div className="__video_controlled_height_v2 bg-teal-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dolor provident nobis voluptas quis, qui tenetur laborum similique doloremque maiores quidem dolorem, nemo earum soluta neque hic. Dolor, excepturi adipisci.
        </div>
      </div> */}
    </div>
  );
};

export default StreamScreen;
