"use client"

import AuthIntro from '@/components/Auth/AuthIntro'
import React from 'react'

const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {    
    return (
        <section className='bg-pody-dark_secondary w-full'>
            <div className='flex flex-col md:flex-row relative min-h-screen'>
                <AuthIntro />
                <div className='w-full order-1 md:w-1/2 lg:w-[38rem] bg-white flex-1 md:min-h-screen md:h-screen flex items-center justify-center px-6 py-16 md:p-10'>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default LoginLayout