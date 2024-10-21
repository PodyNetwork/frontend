"use client"; // Ensure this component works in client-side rendering

import ScrollContent from './ScrollContent';

const ReadyToGo = () => {

  return (
    <>
      <div className='_grad_card_main'></div>
      <div className='relative z-50'>
        <h3 className='text-xl font-medium text-slate-200'>Advanced Host Management</h3>
        <p className='text-sm mt-2.5 text-slate-400 leading-relaxed'>
        You can remove students from the call or grant them speaking
        privileges.        </p>
        <ScrollContent />
      </div>
    </>
  );
};

export default ReadyToGo;
