import React, { ReactNode } from "react";
import Image from "next/image";

interface OCButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
}

const OCButton: React.FC<OCButtonProps> = ({
  onClick,
  children,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-[#141BEB] text-white text-sm rounded-md py-3 flex items-center justify-center gap-2"
    >
      <Image
        src="/icon/opencampus-id.png"
        alt="OC ID"
        width={20}
        height={20}
        className="object-contain"
      />
      {children}
    </button>
  );
};

export default OCButton;
