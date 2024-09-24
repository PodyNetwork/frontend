import React from 'react'
import ButtonIcon from '../../global/buttonIcon'
import service from '../data/service.json';
import serviceb from '../data/serviceb.json';
import servicec from '../data/servicec.json';

const FeaturesCard = () => {
  return (
    <>
        <div className='grid grid-cols-2 gap-6 _features_card_x2'>
            <div className='p-7 relative rounded-xl shadow-xl overflow-hidden'>
                <div className='_grad_card_main'></div>
                <div className='relative z-50'>
                    <h3 className='text-xl font-medium'>Ready to Go service</h3>
                    <p className='text-sm mt-1.5 text-slate-400'>Streamlining solutions for swift success</p>
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
            </div>
            <div className='p-7 relative rounded-xl shadow-xl overflow-hidden'>
                <div className='_grad_card_main_2'></div>
                <div className='relative z-50 h-full flex flex-col'>
                    <h3 className='text-xl font-medium'>3D Meeting & Classroom</h3>
                    <p className='text-sm mt-1.5 text-slate-400 flex items-center flex-wrap gap-x-2'>Tailored for Realtime webRTC <small className='bg-pody-primary px-1 rounded-sm text-slate-600'>coming soon</small></p>
                    <div className='flex-1 flex items-center'>
                        <div>
                            <button className='border border-pody-gray/30 px-4 py-2 rounded-full text-sm'>Join Waitlist 😉</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-3 gap-6 mt-6 _features_card_x3'>
            <div className='p-7 relative rounded-xl shadow-xl overflow-hidden bg-red-50'>
                <div className='_grad_card_base'></div>
                <div className='relative z-50'>
                    <h3 className='text-xl font-medium'>Flexible Architecture design</h3>
                    <p className='text-sm mt-1.5 text-slate-400 flex items-center'>Seamlessly integrated WebRTC with Telegram</p>
                    <div className='flex flex-col gap-y-4 mt-8 pb-8 text-sm'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dignissimos quia iusto sint veniam illo rerum, itaque architecto iste, maiores ab nobis saepe, molestiae odit in? Rem itaque consequatur provident.
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default FeaturesCard