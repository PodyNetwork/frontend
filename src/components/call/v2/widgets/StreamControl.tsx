import React from "react";

const StreamControl = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-between gap-x-2">
        <div className="flex flex-col">
          <button className="w-9 h-9 rounded-full bg-[#292B2C]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 m-auto text-slate-400"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="M140-254.62v-59.99h680v59.99H140ZM140-450v-60h680v60H140Zm0-195.39v-59.99h680v59.99H140Z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-row gap-x-2.5">
          <button className="w-10 h-10 rounded-full bg-[#292B2C]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 m-auto text-slate-400"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-[#292B2C]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 m-auto text-slate-400"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-[#292B2C]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 m-auto text-slate-400"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400H276q25 63 80.5 101.5T480-260Zm0 180q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-pody-danger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 m-auto text-slate-100"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="m136-304-92-90q-12-12-12-28t12-28q88-95 203-142.5T480-640q118 0 232.5 47.5T916-450q12 12 12 28t-12 28l-92 90q-11 11-25.5 12t-26.5-8l-116-88q-8-6-12-14t-4-18v-114q-38-12-78-19t-82-7q-42 0-82 7t-78 19v114q0 10-4 18t-12 14l-116 88q-12 9-26.5 8T136-304Zm104-198q-29 15-56 34.5T128-424l40 40 72-56v-62Zm480 2v60l72 56 40-38q-29-26-56-45t-56-33Zm-480-2Zm480 2Z" />
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-[#292B2C]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 m-auto text-slate-400"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-row gap-x-2.5">
          <button className="w-9 h-9 rounded-full bg-[#292B2C]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 m-auto text-slate-400"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-full bg-[#292B2C]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 m-auto text-slate-400"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="M160-280v80h640v-80H160Zm0-440h88q-5-9-6.5-19t-1.5-21q0-50 35-85t85-35q30 0 55.5 15.5T460-826l20 26 20-26q18-24 44-39t56-15q50 0 85 35t35 85q0 11-1.5 21t-6.5 19h88q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720Zm0 320h640v-240H596l84 114-64 46-136-184-136 184-64-46 82-114H160v240Zm200-320q17 0 28.5-11.5T400-760q0-17-11.5-28.5T360-800q-17 0-28.5 11.5T320-760q0 17 11.5 28.5T360-720Zm240 0q17 0 28.5-11.5T640-760q0-17-11.5-28.5T600-800q-17 0-28.5 11.5T560-760q0 17 11.5 28.5T600-720Z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default StreamControl;
