import React, { Children } from 'react'

const Heading1 = (props : any) => {
    const {children, ...rest} = props;
    return (
        <div className="text-5xl md:text-6xl text-slate-200">
            <h1 {...rest}>{children}</h1>
        </div>
    )
}

export default Heading1