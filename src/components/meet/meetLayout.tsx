"use client"
import React from 'react'
import ControlsMobile from './widgets/ControlsMobile'
import ChatRoom from './widgets/ChatRoom'
import Participant from './widgets/Participant'
import StreamSidebar from './widgets/StreamSidebar'
import StreamScreen from './widgets/StreamScreen'

const MeetLayout = () => {
    return (
        <section className='w-full flex flex-col bg-white dark:bg-[#111114]'>
            <div className='md:p-4 flex flex-col md:flex-row gap-x-4 h-screen max-h-screen md:justify-between relative'>
                <StreamSidebar />
                <StreamScreen />
                <div className='bg-pody-primary/10 z-50 dark:bg-pody-dark pb-[100px] md:pb-5 overflow-y-auto md:overflow-hidden p-8 md:p-5 __participant_and_chat relative flex flex-col gap-y-2 md:rounded-2xl'>
                    <Participant />
                </div>
                <ChatRoom /> 
            </div>
            <ControlsMobile />
        </section>
    )
}

export default MeetLayout