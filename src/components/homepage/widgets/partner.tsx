import React from 'react'
import Image from 'next/image'
import partner from "../data/partner.json"
import Paragraph from '../../global/paragraph'

const Partner = () => {
  return (
    <div className='max-w-5xl 2xl:max-w-7xl mx-auto py-12' aria-label='Partner'>
        <div className='text-center'>
            <div>
                <Paragraph className="font-bold text-xl mb-8">Blockchain & Partner</Paragraph>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-row flex-wrap gap-x-16 gap-y-8 items-center justify-center px-8'>
                    {partner.map((partnerdata, index) => (
                        <Image src={partnerdata.src} alt={partnerdata.name} width={300} height={300} className='object-contain w-32 md:w-36 _partner_img grayscale hover:grayscale-0 hover:transition-all' key={index} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Partner