"use client"

import React from 'react'
import Image from 'next/image'
import logo from "/public/logo/pody logo 1.png"

import service from '../components/homepage/data/service.json'
import serviceb from '../components/homepage/data/serviceb.json'
import servicec from '../components/homepage/data/servicec.json'
import ButtonIcon from '../components/global/buttonIcon'

const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {    
    return (
        <section className='bg-pody-dark_secondary w-full min-h-screen'>
            <div className='flex flex-col md:flex-row relative'>
                <div className='flex-1 md:w-1/2 flex justify-center items-center relative p-6 md:p-10'>
                    <div className='_grad_card_main_login hidden md:block'></div>
                    <div className='w-full max-w-lg bg--200 flex-1'>
                        <Image src={logo} alt='Pody Logo' className='w-16 sm:w-16 md:w-20 object-contain mb-6 sm:mb-8 md:mb-14' />
                        <div className='relative z-50'>
                            <h3 className='text-base sm:text-lg md:text-xl font-medium text-slate-200'>Ready to Go service</h3>
                            <p className='text-xs sm:text-sm md:text-base mt-1.5 text-slate-400'>Streamlining solutions for swift success</p>
                            <div className='flex flex-col gap-y-3 sm:gap-y-4 mt-4 sm:mt-6 md:mt-10 pb-6 sm:pb-8'>
                                <div className='flex flex-row gap-x-2 sm:gap-x-3 flex-nowrap overflow-x-auto md:overflow-hidden'>
                                    {service.map((servicedata, index) => (
                                        <ButtonIcon key={index} svg={servicedata.icon} special={servicedata.special}>{servicedata.title}</ButtonIcon>
                                    ))}
                                </div>
                                <div className='flex flex-row gap-x-2 sm:gap-x-3 flex-nowrap overflow-x-auto md:overflow-hidden _start_icon_shuffle'>
                                    {serviceb.map((servicedata, index) => (
                                        <ButtonIcon key={index} svg={servicedata.icon} special={servicedata.special}>{servicedata.title}</ButtonIcon>
                                    ))}
                                </div>
                                <div className='flex flex-row gap-x-2 sm:gap-x-3 flex-nowrap overflow-x-auto md:overflow-hidden'>
                                    {servicec.map((servicedata, index) => (
                                        <ButtonIcon key={index} svg={servicedata.icon} special={servicedata.special}>{servicedata.title}</ButtonIcon>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full order-1 md:w-1/2 lg:w-[38rem] bg-white min-h-screen md:h-screen flex items-center justify-center p-6 md:p-10'>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default LoginLayout