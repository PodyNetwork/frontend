"use client"
import React from 'react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import Controls from './widgets/Controls'
import ControlsMobile from './widgets/ControlsMobile'
import ChatRoom from './widgets/ChatRoom'
import Participant from './widgets/Participant'
import StreamSidebar from './widgets/StreamSidebar'

const MeetLayout = () => {
    return (
        <section className='w-full flex flex-col bg-[#181A20]'>
            <div className='md:p-4 flex flex-col md:flex-row gap-x-4 h-screen max-h-screen md:justify-between relative'>
                <StreamSidebar />
                <div className='bg-[#F9FAFB dark:bg-pody-dark md:h-full md:rounded-2xl pt-5 md:pt-5 md:py-5 px-7 flex flex-col gap-4 __main-screen relative float-left'>
                    <div className='relative flex flex-col gap-y-2'>
                        <h2 className='font-bold text-lg md:text-xl text-slate-600 dark:text-slate-300'>0x3ax on social impact of Nigeria Education</h2>
                        <div className='text-sm flex flex-row flex-wrap justify-between gap-x-3 items-center'>
                            <p className='text-slate-500 dark:text-slate-400'>25 Sep 2024</p>
                            <button className='px-2 md:px-4 py-1 md:py-1.5 text-xs md:text-sm whitespace-nowrap bg-pody-primary text-slate-900 rounded-md hover:bg-pody-primary/80 hover:transition-all hidden md:block'>Share meeting link</button>
                        </div>
                    </div>
                    <div className='w-full flex flex-wrap gap-3'>
                        <div className='__video_box'>
                            <video src="/video/test.mov" className='object-contain w-full h-full' autoPlay loop muted></video>
                        </div>
                    </div>
                    {/* controls */}
                    <Controls />
                </div>
                <div className='bg-[#F9FAFB] dark:bg-pody-dark pb-[85px] md:pb-5 overflow-y-auto md:overflow-hidden p-5 __participant_and_chat flex-1 relative flex flex-col gap-y-2 md:rounded-2xl'>
                    <Participant />
                    <ChatRoom /> 
                </div>
            </div>
            <ControlsMobile />
        </section>
    )
}

export default MeetLayout