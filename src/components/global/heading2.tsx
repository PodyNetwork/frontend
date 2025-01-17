import React from 'react';

interface Heading2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const Heading2: React.FC<Heading2Props> = ({ children, ...rest }) => {
  return (
    <div className='text-2xl xs:text-3xl text-slate-200'>
      <h2 {...rest}>{children}</h2>
    </div>
  );
}

export default Heading2;
