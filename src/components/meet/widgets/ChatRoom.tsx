import React, { useState } from 'react'
import Image from 'next/image'
import userLogo from '/public/avatar/user.png'
const ChatRoom = () => {
    const [getChat, setChat] = useState(false);

    const openChat = () => {
        setChat(!getChat);
    }


    return (
        <div className={`fixed hidden md:block bottom-0 z-50 left-0 md:relative w-full h-[70%] md:max-h-[350px] md:min-h-[350px] bg-white dark:bg-[#131316] shadow-xl shadow-pody-primary/10 rounded-xl ${getChat ? 'hidden md:block' : ''}`}>
            <div className='px-7 p-5'>
                <div className='flex flex-row justify-between items-center mb-5 text-slate-800'>
                    <h2 className='font-bold text-base'>Chat room</h2>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className='w-7 h-7 text-slate-600'
                        viewBox="0 0 24 24"
                        style={{ msFilter: "" }}
                        fill="currentColor"
                        onClick={openChat}
                        >
                        <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                    </svg>
                </div>
                <div className='flex flex-col gap-y-3.5'>
                    <div className='gap-x-3 __sender_chat'>
                        <Image src={userLogo} alt='user icon' className='w-7 h-7 object-contain self-end' />
                        <div className='text-sm bg-slate-100 w-9/12 md:w-full p-3.5 __message_chat flex items-center text-slate-700'>
                            Can you hear my voice Eax
                        </div>
                    </div>
                    <div className='gap-x-3 __receiver_chat'>
                        <Image src={userLogo} alt='user icon' className='w-7 h-7 object-contain self-end' />
                        <div className='text-sm bg-slate-100 w-9/12 md:w-full p-3.5 __message_chat_sender flex items-center text-slate-700'>
                            Yeah i can hear you asshole ORx proceed with caution to the meeting
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom