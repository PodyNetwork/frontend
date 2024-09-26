import React from "react";

interface ButtonIconProps{
  children: React.ReactNode;
  svg: string;
  special: boolean;
}

const ButtonIcon:React.FC<ButtonIconProps> = ({children, svg, special} ) => {
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
