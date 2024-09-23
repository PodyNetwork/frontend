import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import navlink from "./data/link.json"
import logo from "../../../public/logo/logo_white.svg"
import Button from '../global/button'

const Nav = () => {
  return (
    <div className='w-full flex flex-row items-center text-sm justify-between py-6 px-16 bg-pody-dark text-pody-gray'>
        <ul className='flex flex-row gap-3 items-center'>
            <Link href="/"><Image src={logo} alt='Pody Logo' className='w-20' /></Link>
            {navlink.mainLink.map((link, index) => (
                <li key={index} className='px-2'>
                    <Link href={link.url}>{link.title}</Link>
                </li>
            ))}
        </ul>
        <ul className='flex flex-row items-center gap-3'>
            <li className='px-2'>Login</li>
            <li><Link href="/test"><Button>Connect Wallet</Button></Link></li>
        </ul>
    </div>
  )
}

export default Nav