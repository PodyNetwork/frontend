import React from 'react'
import ButtonIcon from '../../global/buttonIcon'
import service from '../data/service.json';
import serviceb from '../data/serviceb.json';
import servicec from '../data/servicec.json';

const ReadyToGo = () => {
  return (
    <>
        <div className='_grad_card_main'></div>
        <div className='relative z-50'>
            <h3 className='text-xl font-medium text-slate-200'>Mint On-Chain Passport</h3>
            <p className='text-sm mt-1.5 text-slate-400 leading-relaxed'>Get access to Pody by minting your personal on-chain passport. This digital ID allows you to enter meetings and classrooms securely, while maintaining anonymity.
            </p>
            <div className='flex flex-col gap-y-4 mt-10 pb-8'>
                <div className='flex flex-row gap-x-3 flex-nowrap overflow-hidden'>
                    {service.map((servicedata, index) => (
                        <ButtonIcon key={index} svg={servicedata.icon} special={servicedata.special}>{servicedata.title}</ButtonIcon>
                    ))}
                </div>
                <div className='flex flex-row gap-x-3 flex-nowrap overflow-hidden _start_icon_shuffle'>
                    {serviceb.map((servicedata, index) => (
                        <ButtonIcon key={index} svg={servicedata.icon} special={servicedata.special}>{servicedata.title}</ButtonIcon>
                    ))}
                </div>
                <div className='flex flex-row gap-x-3 flex-nowrap overflow-hidden'>
                    {servicec.map((servicedata, index) => (
                        <ButtonIcon key={index} svg={servicedata.icon} special={servicedata.special}>{servicedata.title}</ButtonIcon>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default ReadyToGo