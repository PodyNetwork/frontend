"use client"
import React from 'react'
import Image from 'next/image'
import userLogo from '/public/avatar/user.png'
import user1 from '/public/avatar/user1.webp'
import user2 from '/public/avatar/user2.webp'
import Button from '../global/button'
import participantList from "../meet/data/participant.json"

import { useState, useRef, useEffect } from 'react'
import Controls from './widgets/Controls'

const MeetLayout = () => {
    return (
        <section className='w-full flex flex-col'>
            <div className='md:p-4 flex flex-col md:flex-row gap-x-4 h-screen max-h-screen md:justify-between relative'>
                <div className='min-w-16 max-w-16 hidden md:block py-5 flex-1 bg-[#F9FAFB] h-full rounded-2xl relative float-left'>
                    <div className='h-full flex flex-col justify-between items-center gap-3'>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className='w-7 h-7 text-pody-dark_secondary'
                                viewBox="0 0 24 24"
                                style={{ msFilter: "" }}
                                fill="currentColor"
                                >
                                <path d="M6 3h2v2H6zm2 16h3v2H8zm8-16h2v2h-2zm-3 16h3v2h-3zm7-8V9h-2V7h-2V5h-2v2h-4V5H8v2H6v2H4v2H2v8h2v-4h2v4h2v-3h8v3h2v-4h2v4h2v-8zm-10 1H8V9h2zm6 0h-2V9h2z"></path>
                            </svg>
                        </div>
                        <div className='w-full'>
                            <ul className='flex flex-col items-center justify-center gap-y-6'>
                                <li className='w-full justify-center flex py-1'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className='w-6 h-6 text-slate-600'
                                        viewBox="0 0 24 24"
                                        style={{ msFilter: "" }}
                                        fill="currentColor"
                                        >
                                        <path d="M5 22h14a2 2 0 0 0 2-2v-9a1 1 0 0 0-.29-.71l-8-8a1 1 0 0 0-1.41 0l-8 8A1 1 0 0 0 3 11v9a2 2 0 0 0 2 2zm5-2v-5h4v5zm-5-8.59 7-7 7 7V20h-3v-5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5H5z"></path>
                                    </svg>
                                </li>
                                <li className='w-full justify-center flex py-1'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className='w-6 h-6 text-slate-600'
                                        viewBox="0 0 24 24"
                                        style={{ msFilter: "" }}
                                        fill="currentColor"
                                        >
                                        <path d="M18 7c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-3.333L22 17V7l-4 3.333V7zm-1.998 10H4V7h12l.001 4.999L16 12l.001.001.001 4.999z"></path>
                                    </svg>
                                </li>
                                <li className='w-full justify-center flex py-1'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className='w-6 h-6 text-slate-600'
                                        viewBox="0 0 24 24"
                                        style={{ msFilter: "" }}
                                        fill="currentColor"
                                        >
                                        <circle cx="12.01" cy="12" r="2"></circle><path d="M11.01 22h2l.5-7h-3l.5 7z"></path><path d="M12 2a10 10 0 0 0-2.45 19.68l-.15-2.12a8 8 0 1 1 5.21 0l-.15 2.12A10 10 0 0 0 12 2z"></path><path d="M15.32 9.61a3.44 3.44 0 0 1 .37.68 3.83 3.83 0 0 1 .23.75 3.57 3.57 0 0 1 .09.8 3.66 3.66 0 0 1-.09.81 3.83 3.83 0 0 1-.23.75 3.44 3.44 0 0 1-.37.68 4.7 4.7 0 0 1-.35.43l-.19 2.62a5.33 5.33 0 0 0 .58-.31A5.86 5.86 0 0 0 17 15.2a5.57 5.57 0 0 0 .55-1 5.89 5.89 0 0 0 .35-1.13 6.06 6.06 0 0 0 .1-1.23 6.22 6.22 0 0 0-.13-1.21A6.09 6.09 0 0 0 17 8.49a6.29 6.29 0 0 0-.73-.89 5.67 5.67 0 0 0-.89-.73 6.3 6.3 0 0 0-1-.56A6.17 6.17 0 0 0 13.21 6a6.11 6.11 0 0 0-2.41 0 5.51 5.51 0 0 0-1.13.36 5.57 5.57 0 0 0-1 .55 5.67 5.67 0 0 0-.89.73 6.29 6.29 0 0 0-.78.85 6.09 6.09 0 0 0-.9 2.14 6.21 6.21 0 0 0-.1 1.21 6.06 6.06 0 0 0 .12 1.21 5.89 5.89 0 0 0 .35 1.13 5.57 5.57 0 0 0 .55 1 6.24 6.24 0 0 0 1.62 1.62 5.33 5.33 0 0 0 .58.31L9 14.51a4.7 4.7 0 0 1-.35-.43 3.44 3.44 0 0 1-.37-.68 3.83 3.83 0 0 1-.23-.75 3.65 3.65 0 0 1-.05-.81 3.56 3.56 0 0 1 .08-.8 3.83 3.83 0 0 1 .23-.75 3.44 3.44 0 0 1 .37-.68 4 4 0 0 1 .5-.61 3.87 3.87 0 0 1 .59-.48 3.44 3.44 0 0 1 .68-.37 3.86 3.86 0 0 1 .75-.24 4.36 4.36 0 0 1 1.61 0 3.86 3.86 0 0 1 .75.24 3.58 3.58 0 0 1 1.27.85 3.49 3.49 0 0 1 .49.61z"></path>
                                    </svg>
                                </li>
                                <li className='w-full justify-center flex py-1'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className='w-6 h-6 text-slate-600'
                                        viewBox="0 0 24 24"
                                        style={{ msFilter: "" }}
                                        fill="currentColor"
                                        >
                                        <path d="M20 3H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h4l-1.8 2.4 1.6 1.2 2.7-3.6h3l2.7 3.6 1.6-1.2L16 18h4c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 16V5h16l.001 11H4z"></path><path d="M6 12h4v2H6z"></path>
                                    </svg>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <Image src={userLogo} alt='user icon' className='w-8 h-8 object-contain' />
                        </div>
                    </div>
                </div>
                <div className='bg-[#F9FAFB] md:h-full md:rounded-2xl pt-5 md:pt-0 md:py-5 px-7 flex flex-col gap-4 __main-screen relative float-left'>
                    <div className='relative flex flex-col gap-y-2'>
                        <h2 className='font-bold text-lg md:text-xl'>0x3ax on social impact of Nigeria Education</h2>
                        <div className='text-sm flex flex-row flex-wrap justify-between gap-x-3 items-center'>
                            <p>25 Sep 2024</p>
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
                <div className='bg-[#F9FAFB] pb-[85px] mb:pb-0 __participant_message_container flex-1 md:h-full md:rounded-2xl p-5 __participant_and_chat relative flex flex-col gap-y-2'>
                    <div className='w-full flex-1'>
                        <div className='hidden md:flex flex-row justify-between mb-3.5'>
                            <h3 className='text-base'><span className='font-bold text-slate-800'>Participant</span> {" "} <span className='text-slate-500'>(3)</span></h3>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className='w-5 h-5 text-slate-600'
                                viewBox="0 0 24 24"
                                style={{ msFilter: "" }}
                                fill="currentColor"
                                >
                                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                            </svg>
                        </div>
                        <div className='grid grid-cols-4 gap-1.5 md:gap-0 md:flex flex-row flex-wrap md:flex-col relative justify-evenl justify-start __participant_list'>
                            {participantList.map((data, index) => (
                                <div className='md:flex flex-row justify-between md:gap-x-2 py-0 md:py-2 text-sm' key={index}>
                                    <div className='flex md:flex-row flex-col items-center'>
                                        <Image src={user2} alt='user icon' className='w-[70px] h-[70px] md:w-7 md:h-7 object-cover rounded-full' />
                                        <div className='md:ms-2.5 flex flex-col items-center text-sm'>
                                            <p><span className='text-slate-500 leading-none font-semibold'>{data.name}</span></p>
                                            {data.host && <p className='block md:hidden text-xs text-slate-300 leading-none'><span>Host</span></p>}
                                        </div>
                                    </div>
                                    <div className='hidden md:flex flex-row items-center text-slate-500 gap-x-2'>
                                        <p>Host</p>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className='w-5 h-5'
                                            viewBox="0 0 24 24"
                                            style={{ msFilter: "" }}
                                            fill="currentColor"
                                            >
                                            <path d="M16 12V6c0-2.217-1.785-4.021-3.979-4.021a.933.933 0 0 0-.209.025A4.006 4.006 0 0 0 8 6v6c0 2.206 1.794 4 4 4s4-1.794 4-4zm-6 0V6c0-1.103.897-2 2-2a.89.89 0 0 0 .163-.015C13.188 4.06 14 4.935 14 6v6c0 1.103-.897 2-2 2s-2-.897-2-2z"></path><path d="M6 12H4c0 4.072 3.061 7.436 7 7.931V22h2v-2.069c3.939-.495 7-3.858 7-7.931h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6z"></path>
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className='w-5 h-5'
                                            viewBox="0 0 24 24"
                                            style={{ msFilter: "" }}
                                            fill="currentColor"
                                            >
                                            <path d="M18 7c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-3.333L22 17V7l-4 3.333V7zm-1.998 10H4V7h12l.001 4.999L16 12l.001.001.001 4.999z"></path>
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='md:block hidden w-full h-[350px] bg-white shadow-xl shadow-pody-primary/10 rounded-xl'>
                        <div className='p-5'>
                            <div className='flex flex-row justify-between items-center mb-5 text-slate-800'>
                                <h2 className='font-bold text-base'>Chat room</h2>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className='w-5 h-5 text-slate-600'
                                    viewBox="0 0 24 24"
                                    style={{ msFilter: "" }}
                                    fill="currentColor"
                                    >
                                    <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                </svg>
                            </div>
                            <div className='flex flex-col gap-y-3.5'>
                                <div className='gap-x-3 __sender_chat'>
                                    <Image src={userLogo} alt='user icon' className='w-7 h-7 object-contain self-end' />
                                    <div className='text-xs bg-slate-100 w-full px-3.5 py-2.5 __message_chat flex items-center text-slate-700'>
                                        Can you hear my voice Eax
                                    </div>
                                </div>
                                <div className='gap-x-3 __receiver_chat'>
                                    <Image src={userLogo} alt='user icon' className='w-7 h-7 object-contain self-end' />
                                    <div className='text-xs bg-slate-100 w-full px-3.5 py-2.5 __message_chat_sender flex items-center text-slate-700'>
                                        Yeah i can hear you asshole ORx proceed with caution to the meeting
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='md:hidden block absolute bottom-0 bg-black w-full py-7 px-7 text-sm'>
                <div className='text-slate-300 flex flex-row items-center gap-x-5'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className='w-5 h-5'
                        viewBox="0 0 24 24"
                        style={{ msFilter: "" }}
                        fill="currentColor"
                        >
                        <path d="M16 12V6c0-2.217-1.785-4.021-3.979-4.021a.933.933 0 0 0-.209.025A4.006 4.006 0 0 0 8 6v6c0 2.206 1.794 4 4 4s4-1.794 4-4zm-6 0V6c0-1.103.897-2 2-2a.89.89 0 0 0 .163-.015C13.188 4.06 14 4.935 14 6v6c0 1.103-.897 2-2 2s-2-.897-2-2z"></path><path d="M6 12H4c0 4.072 3.061 7.436 7 7.931V22h2v-2.069c3.939-.495 7-3.858 7-7.931h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6z"></path>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className='w-5 h-5'
                        viewBox="0 0 24 24"
                        style={{ msFilter: "" }}
                        fill="currentColor"
                        >
                        <path d="M18 7c0-1.103-.897-2-2-2H6.414L3.707 2.293 2.293 3.707l18 18 1.414-1.414L18 16.586v-2.919L22 17V7l-4 3.333V7zm-2 7.586L8.414 7H16v7.586zM4 19h10.879l-2-2H4V8.121L2.145 6.265A1.977 1.977 0 0 0 2 7v10c0 1.103.897 2 2 2z"></path>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className='w-5 h-5'
                        viewBox="0 0 24 24"
                        style={{ msFilter: "" }}
                        fill="currentColor"
                        >
                        <path d="M20 3H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h7v3H8v2h8v-2h-3v-3h7c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 15V5h16l.001 10H4z"></path><path d="m10 13 5-3-5-3z"></path>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className='w-5 h-5'
                        viewBox="0 0 24 24"
                        style={{ msFilter: "" }}
                        fill="currentColor"
                        >
                        <path d="M6 10v4c0 1.103.897 2 2 2h3v-2H8v-4h3V8H8c-1.103 0-2 .897-2 2zm7 0v4c0 1.103.897 2 2 2h3v-2h-3v-4h3V8h-3c-1.103 0-2 .897-2 2z"></path><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 18V6h16l.002 12H4z"></path>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className='w-5 h-5'
                        viewBox="0 0 24 24"
                        style={{ msFilter: "" }}
                        fill="currentColor"
                        >
                        <path d="M11 7.05V4a1 1 0 0 0-1-1 1 1 0 0 0-.7.29l-7 7a1 1 0 0 0 0 1.42l7 7A1 1 0 0 0 11 18v-3.1h.85a10.89 10.89 0 0 1 8.36 3.72 1 1 0 0 0 1.11.35A1 1 0 0 0 22 18c0-9.12-8.08-10.68-11-10.95zm.85 5.83a14.74 14.74 0 0 0-2 .13A1 1 0 0 0 9 14v1.59L4.42 11 9 6.41V8a1 1 0 0 0 1 1c.91 0 8.11.2 9.67 6.43a13.07 13.07 0 0 0-7.82-2.55z"></path>
                    </svg>
                    <button className='px-3 bg-pody-primary rounded-full text-white flex flex-row items-center py-1'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className='w-5 h-5 me-1.5'
                            viewBox="0 0 24 24"
                            style={{ msFilter: "" }}
                            fill="currentColor"
                            >
                            <path d="M16 2H8C4.691 2 2 4.691 2 8v12a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 13c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v7z"></path><circle cx="9.5" cy="11.5" r="1.5"></circle><circle cx="14.5" cy="11.5" r="1.5"></circle>
                        </svg>
                        <span>8</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default MeetLayout