import React, { Children } from 'react'

const Heading2 = (props : any) => {
  const {children,  ...rest} = props;
  return (
    <div className='text-2xl md:text-3xl text-slate-200'>
      <h2 {...rest}>{children}</h2>
    </div>
  )
}

export default Heading2