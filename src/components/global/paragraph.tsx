import React from 'react'

interface ParagraphProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}   
  
const Paragraph:React.FC<ParagraphProps> = ({children, ...rest} ) => {
    return (
        <div className='text-base text-slate-400'>
            <p {...rest}>{children}</p>
        </div>
    )
}

export default Paragraph