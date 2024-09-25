import React, { Children } from 'react'

const Paragraph = (props : any) => {
    const {children, ...rest} = props;
    return (
        <div className='text-base text-slate-400'>
            <p {...rest}>{children}</p>
        </div>
    )
}

export default Paragraph