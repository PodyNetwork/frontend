import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ButtonPody: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button 
      className={`px-4 py-2 bg-pody-primary text-slate-900 rounded-md hover:bg-pody-primary/80 hover:transition-all}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonPody;
