import React from 'react'
import arcimage from "/public/misc/web_arc.png"
import ecosystem from '../data/ecosystem.json'
import support from '../data/support.json'
import Image from 'next/image';
import ReadyToGo from './readyToGo';

const FeaturesCard = () => {
  return (
    <>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 _features_card_x2'>
            <div className='p-7 relative rounded-xl shadow-xl overflow-hidden'>
                <ReadyToGo />
            </div>
            <div className='p-7 relative rounded-xl shadow-xl overflow-hidden'>
                <div className='_grad_card_main_2'></div>
                <div className='relative z-50 h-full flex flex-col'>
                    <h3 className='text-xl font-medium text-slate-200'>Create 2D Classrooms</h3>
                    <p className='text-sm mt-1.5 text-slate-400 flex items-center flex-wrap gap-x-2 leading-relaxed'>Easily set up your own virtual 2D meeting or classroom. Invite participants and enjoy interactive features like screen sharing and real-time streaming.</p>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 _features_card_x3'>
            <div className='p-7 relative rounded-xl shadow-xl overflow-hidden'>
                <div className='_grad_card_base'></div>
                <div className='relative z-50 flex flex-col h-full'>
                    <h3 className='text-xl font-medium text-slate-200'>Earn Rewards for Participation</h3>
                    <p className='text-sm mt-1.5 text-slate-400 flex items-center leading-relaxed'>
                        Get rewarded for your time. The longer you participate, the more points you earn. These points can be converted to tokens, creating real value for your time in the classroom.
                    </p>
                    <div className='flex-grow'></div>
                    <div className='flex flex-col gap-y-4 text-sm pt-8'>
                        <Image src={arcimage} className='object-cover h-52' alt="architecture design" />
                    </div>
                </div>
            </div>
            <div className='p-7 relative rounded-xl shadow-xl overflow-hidden'>
                <div className='_grad_card_base'></div>
                <div className='relative z-50 flex flex-col h-full'>
                    <h3 className='text-xl font-medium text-slate-200'>Host Reward Mechanism</h3>
                    <p className='text-sm mt-1.5 text-slate-400 flex items-center leading-relaxed'>The more participants you attract and the more engaged they are, the more you earn. Create meaningful classrooms that reward both you and your participants.</p>
                    <div className='flex flex-col gap-y-4 text-sm mt-auto pt-8'>
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
            <div className='p-7 relative rounded-xl shadow-xl overflow-hidden'>
                <div className='_grad_card_base'></div>
                <div className='relative z-50 h-full flex flex-col'>
                    <h3 className='text-xl font-medium text-slate-200'>Decentralized and Private Classroom</h3>
                    <p className='text-sm mt-1.5 text-slate-400 flex items-center'>Pody runs on decentralized peer-to-peer technology using WebRTC, ensuring privacy and security for all users. No data harvesting, no AI interference.</p>
                    <div className='flex flex-row gap-4 mt-auto pt-8 text-sm flex-wrap'>
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