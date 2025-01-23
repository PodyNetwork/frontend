import React from 'react'
import Image from 'next/image'

export const MainnetInfo = () => {
  return (
    <div className='flex flex-row justify-center py-2 bg-pody-oilblack text-slate-300'>
        <p className='flex flex-row items-center text-sm web3-gradient-text font-medium gap-1.5'>Pody Network Mainnet is Live on{" "}<Image src="/partner/educhain-logo.svg" width={100} height={70} alt='EDU Chain' className='w-11' /></p>
    </div>
  )
}
