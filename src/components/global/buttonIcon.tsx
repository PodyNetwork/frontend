import React from "react";

const ButtonIcon = (props: any) => {
  const {children, svg, special} = props;
  return (
    <button className="px-3 py-1.5 bg-black text-nowrap shadow-md text-slate-300 rounded-md hover:bg-pody-primary/80 hover:transition-all text-sm flex flex-row items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-4 h-4 me-2 ${special && 'text-pody-primary'}`}
        viewBox="0 0 24 24"
        style={{ msFilter: "" }}
        fill="currentColor"
      >
        <path d={svg}></path>
      </svg>
      {children}
    </button>
  );
};

export default ButtonIcon;
