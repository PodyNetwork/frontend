import React from 'react'

interface ButtonBorderProps {
  children: React.ReactNode;
}

const ButtonBorder:React.FC<ButtonBorderProps> = ({children}) => {
  return (
    <button className='px-4 py-1.5 bg-transparent border border-pody-border text-slate-300 rounded-md  hover:bg-pody-primary hover:text-slate-900 hover:transition-all hover:border-pody-primary'>{children}</button>
  )
}

export default ButtonBorder