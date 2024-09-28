"use client"

import React from 'react'
import Image from 'next/image'
import logo from "/public/logo/logo_white.svg"

import service from '../components/homepage/data/service.json'
import serviceb from '../components/homepage/data/serviceb.json'
import servicec from '../components/homepage/data/servicec.json'
import ButtonIcon from '../components/global/buttonIcon'

const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {    
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
                    {children}
                </div>
            </div>
        </section>
    )
}

export default LoginLayout