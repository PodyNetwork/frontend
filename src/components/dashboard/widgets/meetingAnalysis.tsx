import React from "react";

const MeetingAnalysis = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <h2 className="text-xl text-slate-800">Meeting Links</h2>
        <p className="text-sm">Here you can see total and active link</p>
      </div>
      <div className="flex flex-row items-center">
        <div className="aspect-square w-8 h-8 bg-pody-primary/20 rounded-full flex items-center justify-center text-slate-600 me-3 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            style={{ msFilter: "" }}
            fill="currentColor"
          >
            <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
            <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
          </svg>
        </div>
        <div className="flex flex-row gap-x-1.5 items-center justify-between text-sm">
          <h3 className="text-slate-800">Total Link Created</h3>
          <span>-</span>
          <p>99</p>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="aspect-square w-8 h-8 bg-pody-primary/20 rounded-full flex items-center justify-center text-slate-600 me-3 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            style={{ msFilter: "" }}
            fill="currentColor"
          >
            <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
            <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
          </svg>
        </div>
        <div className="flex flex-row gap-x-1.5 items-center justify-between text-sm">
          <h3 className="text-slate-800">Active Link</h3>
          <span>-</span>
          <p>4</p>
        </div>
      </div>
      <div>
        <button className="text-xs bg-pody-primary/40 px-3.5 py-1.5 rounded-full">
          Show All
        </button>
      </div>
    </div>
  );
};

export default MeetingAnalysis;
