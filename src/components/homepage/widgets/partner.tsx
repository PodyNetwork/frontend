import React from 'react'
import Image from 'next/image'
import partner from "../data/partner.json"
import Paragraph from '../../global/paragraph'

const Partner = () => {
  return (
    <div className='max-w-5xl mx-auto' aria-label='Partner'>
        <div className='text-center'>
            <div>
                <Paragraph className="font-bold">Blockchain & Partner</Paragraph>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-row gap-x-16'>
                    {partner.map((partnerdata, index) => (
                        <Image src={partnerdata.src} alt={partnerdata.name} width={300} height={300} className='object-contain w-28 _partner_img grayscale hover:grayscale-0 hover:transition-all mt-5' key={index} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Partner