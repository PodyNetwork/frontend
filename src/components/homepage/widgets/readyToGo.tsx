"use client"; // Ensure this component works in client-side rendering

import ScrollContent from './ScrollContent';

const ReadyToGo = () => {

  return (
    <>
      <div className='_grad_card_main'></div>
      <div className='relative z-50'>
        <h3 className='text-xl font-medium text-slate-200'>Earn Rewards every Seconds</h3>
        <p className='text-sm mt-2.5 text-slate-400 leading-relaxed'>
        The longer you participate in a classroom, the more the points you earn.
        </p>
        <ScrollContent />
      </div>
    </>
  );
};

export default ReadyToGo;
