"use client"; // Ensure this component works in client-side rendering

import ScrollContent from './ScrollContent';

const ReadyToGo = () => {

  return (
    <>
      <div className='_grad_card_main'></div>
      <div className='relative z-50'>
        <h3 className='text-xl font-medium text-slate-200'>Mint On-Chain Passport</h3>
        <p className='text-sm mt-1.5 text-slate-400 leading-relaxed'>
          Get access to Pody by minting your personal on-chain passport. This digital ID allows you to enter classrooms securely while maintaining anonymity.
        </p>
        <ScrollContent />
      </div>
    </>
  );
};

export default ReadyToGo;
