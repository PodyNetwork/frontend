import React from 'react'

interface Heading1Props extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

const Heading1:React.FC<Heading1Props> = ({children, ...rest}) => {
    return (
        <div className="text-5xl md:text-6xl text-slate-200">
            <h1 {...rest}>{children}</h1>
        </div>
    )
}

export default Heading1