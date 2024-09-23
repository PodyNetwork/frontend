import React from 'react'

const Button = ({children} : any) => {
  return (
    <button className='px-4 py-1.5 bg-pody-primary text-slate-900 rounded-md hover:bg-pody-primary/80 hover:transition-all'>{children}</button>
  )
}

export default Button