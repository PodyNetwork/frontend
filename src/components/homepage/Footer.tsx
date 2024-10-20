import Link from 'next/link'
import navlink from "./data/link.json"
import React from 'react'
import Image from 'next/image'
import logo from "/public/logo/pody logo 1.png"
import sociallink from "./data/socails.json"

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <section className='bg-pody-dark_secondary relative py-4 px-4 md:px-0 flex flex-col justify-center text-slate-500 text-sm' aria-label='Footer'>
        <div>
            <div className='max-w-5xl 2xl:max-w-7xl mx-auto'>
                <div className='w-full relative'>
                    <div className='flex md:flex-row flex-col justify-between gap-5 py-7 bg-ed-50'>
                        <Link href="/"><Image src={logo} alt='Pody Logo' className='w-14' /></Link>
                        <ul className='flex flex-row gap-5 flex-wrap items-center' aria-label='Footer Menu'>
                            {navlink.mainLink.map((link, index) => (
                                <li key={index} className='md:px-2 hover:text-pody-primary hover:transition-all duration-100'>
                                    <Link href={link.url}>{link.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr className='border-slate-500/20' />
                    <div className='py-7 flex flexro justify-between gap-3'>
                        <p>PODY NETWORK {year}</p>
                        <ul className='flex flex-row gap-3 items-center'>
                            {sociallink.map((data, index) => (
                                <li key={index} className='hover:text-pody-primary transition-all cursor-pointer'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className='w-6 h-6'
                                        viewBox="0 0 50 50"
                                        style={{ msFilter: "" }}
                                        fill="currentColor"
                                        >
                                        <path d={data.icon}></path>
                                    </svg>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>  
            </div>
        </div>
    </section>
  )
}

export default Footer