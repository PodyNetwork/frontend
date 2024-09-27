"use client"

import React from 'react'
import Image from 'next/image'
import logo from "/public/logo/logo_white.svg"

import service from '../homepage/data/service.json';
import serviceb from '../homepage/data/serviceb.json';
import servicec from '../homepage/data/servicec.json';
import ButtonIcon from '../global/buttonIcon';
import Paragraph from '../global/paragraph';
import Heading2 from '../global/heading2';
import useLogin from '@/hooks/useLogin';



const LoginLayout = () => {
    const {login} = useLogin()
    
    return (
        <section className='bg-pody-dark_secondary w-full min-h-screen'>
            <div className='flex flex-row relative'>
                <div className='flex-1 flex justify-center items-center relative'>
                    <div className='_grad_card_main_login'></div>
                    <div className='max-w-lg bg--200 flex-1'>
                        <Image src={logo} alt='Pody Logo' className='w-28 object-contain mb-14' />
                        <div className='relative z-50'>
                            <h3 className='text-xl font-medium text-slate-200'>Ready to Go service</h3>
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
                </div>
                <div className='__login_side h-screen flex items-center justify-center'>
                    <div className='max-w-72 flex-1'>
                        <div className='pb-8'>
                            <Heading2 className="font-bold text-slate-800">Hello!</Heading2>
                            <Paragraph className="text-slate-400 mt-2">Sign Up to Get Started</Paragraph>
                        </div>
                        <label htmlFor="username" className='sr-only'></label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className='w-5 h-5 text-slate-400'
                                    viewBox="0 0 24 24"
                                    style={{ msFilter: "" }}
                                    fill="currentColor"
                                >
                                    <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                                </svg>
                            </div>
                            <input type="text" id='username' placeholder='username' aria-labelledby='username' className='bg-slate-50 w-full p-3 ps-10 text-base border border-slate-200 rounded-lg text-slate-400 outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent focus:transition-all focus:duration-100 placeholder:text-slate-400' />
                        </div>
                        <button onClick={() => {
                             login.mutate({
                                walletAddress: "string",
                                signature: "string",
                                timestamp: 1000000
                           })
                        } } className='p-3 bg-pody-dark_secondary w-full rounded-lg text-slate-200 text-sm mt-3 hover:bg-pody-dark_secondary/90'>Register</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginLayout