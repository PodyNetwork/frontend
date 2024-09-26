import React from 'react'
import arcimage from "/public/misc/web_arc.png"
import ecosystem from '../data/ecosystem.json'
import support from '../data/support.json'
import Image from 'next/image';
import ReadyToGo from './readyToGo';

const FeaturesCard = () => {
  return (
    <>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 _features_card_x2'>
            <div className='p-7 relative rounded-xl shadow-xl overflow-hidden'>
                <ReadyToGo />
            </div>
            <div className='p-7 relative rounded-xl shadow-xl overflow-hidden'>
                <div className='_grad_card_main_2'></div>
                <div className='relative z-50 h-full flex flex-col'>
                    <h3 className='text-xl font-medium text-slate-200'>3D Meeting & Classroom</h3>
                    <p className='text-sm mt-1.5 text-slate-400 flex items-center flex-wrap gap-x-2'>Tailored for Realtime webRTC <small className='bg-pody-primary px-1 rounded-sm text-slate-600'>coming soon</small></p>
                    <div className='flex-1 flex items-center'>
                        <div>
                            <button className='border border-pody-gray/30 px-4 py-2 rounded-full text-sm'>Join Waitlist 😉</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 _features_card_x3'>
            <div className='p-7 relative rounded-xl shadow-xl overflow-hidden bg-red-50'>
                <div className='_grad_card_base'></div>
                <div className='relative z-50'>
                    <h3 className='text-xl font-medium text-slate-200'>Flexible Architecture design</h3>
                    <p className='text-sm mt-1.5 text-slate-400 flex items-center'>Seamlessly integrated WebRTC with Telegram</p>
                    <div className='flex flex-col gap-y-4 mt-8 pb-8 text-sm'>
                        <Image src={arcimage} className='object-cover h-52' alt="architecture design" />
                    </div>
                </div>
            </div>
            <div className='p-7 relative rounded-xl shadow-xl overflow-hidden bg-red-50'>
                <div className='_grad_card_base'></div>
                <div className='relative z-50'>
                    <h3 className='text-xl font-medium text-slate-200'>The best Ecosystem</h3>
                    <p className='text-sm mt-1.5 text-slate-400 flex items-center'>Join the unique ecosystem in decentralized solution</p>
                    <div className='flex flex-col gap-y-4 mt-8 pb-8 text-sm'>
                       <div className='ic_cr_container mx-auto flex-wrap animate-pulse'>
                            {ecosystem.map((ecosystemdata, index) => (
                                <div className='w-[40px] h-[40px] rounded-full flex items-center justify-center ic_cr_icon' style={{'background' : ecosystemdata.color ? ecosystemdata.color : '#000000'  }} key={index}>
                                    <Image src={ecosystemdata.url} alt={ecosystemdata.name} className='w-6 h-6 object-contain' width={200} height={200} />
                                </div>
                            ))}
                       </div>
                    </div>
                </div>
            </div>
            <div className='p-7 relative rounded-xl shadow-xl overflow-hidden bg-red-50'>
                <div className='_grad_card_base'></div>
                <div className='relative z-50'>
                    <h3 className='text-xl font-medium text-slate-200'>3D & 2D Support</h3>
                    <p className='text-sm mt-1.5 text-slate-400 flex items-center'>integrated WebRTC with realtime data</p>
                    <div className='flex flex-row gap-4 mt-8 pb-8 text-sm flex-wrap'>
                        {support.map((supportdata, index) => (
                            <button className='px-3 py-2 text-nowrap rounded-full border border-pody-border/30' key={index}>{supportdata.title}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default FeaturesCard