import React from "react";

interface ButtonIconProps{
  children: React.ReactNode;
  svg: string;
  special: boolean;
}

const ButtonIcon:React.FC<ButtonIconProps> = ({children, svg, special} ) => {
  return (
    <button className="px-3 py-1.5 bg-pody-secondary/10 text-nowrap shadow-md text-slate-400 hover:text-slate-200 rounded-md hover:bg-pody-secondary hover:transition-all text-xs flex flex-row items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-3.5 h-3.5 me-2 ${special && 'text-pody-primary'}`}
        viewBox="0 -960 960 960"
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
