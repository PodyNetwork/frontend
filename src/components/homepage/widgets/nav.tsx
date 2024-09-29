import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import navlink from "../data/link.json"
import logo from "/public/logo/pody logo 1.png"
import ButtonPody from '../../global/button'

const Nav = () => {
  return (
    <div className='w-full flex flex-row items-center text-sm justify-between py-6 px-8 md:px-16 bg-pody-dark text-slate-500' aria-label='Navigation Menu'>
        <ul className='flex flex-row gap-6 items-center' aria-label='Menu'>
            <Link href="/"><Image src={logo} alt='Pody' className='w-16 object-contain' /></Link>
            {navlink.mainLink.map((link, index) => (
                <li key={index} className='hidden md:block hover:text-pody-primary hover:transition-all duration-100'>
                    <Link href={link.url}>{link.title}</Link>
                </li>
            ))}
        </ul>
        <ul className='flex flex-row items-center gap-6'>
            <li className='px-2 hover:text-pody-primary hover:transition-all duration-100'>
                <Link href="/login">Login</Link>
            </li>
            <li><Link href="/"><ButtonPody>Connect Wallet</ButtonPody></Link></li>
        </ul>
    </div>
  )
}

export default Nav