import React from 'react'
import Heading1 from '../../global/heading1'
import Paragraph from '../../global/paragraph'
import ButtonPody from '../../global/button'
import ButtonBorder from '../../global/buttonborder'
import herocard from '../data/herocard.json'

const Hero = () => {
  return (
    <div className='relative w-full px-8 md:px-16'>
        <div className='max-w-5xl mx-auto _hero_wrapper flex flex-col'>
            <div className='max-w-2xl mx-auto flex flex-col gap-y-6'>
                <Heading1 className="text-center font-extrabold">Connect web3 <br /> meeting for everyone</Heading1>
                <Paragraph className="text-center text-slate-400">Connect, interact, and learn from any anywhere with EduVR - The Future of Education on Chain</Paragraph>
                <div className='flex flex-row justify-center gap-3 mt-4 text-sm'>
                    <ButtonPody><span className='text-sm'>Create Meeting</span></ButtonPody>
                    <ButtonBorder>Join Meeting</ButtonBorder>
                </div>
            </div>
            <div className='text-white grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 flex-1 justify-between py-32'>
                {herocard.map((data, index) => (
                    <div className='w-11/12' key={index}>
                        <div className='flex flex-row gap-x-3 items-center'>
                            <div className='w-9 h-9 rounded-md _grad_bg text-pody-primary flex items-center justify-center'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className='w-6 h-6'
                                    viewBox="0 0 24 24"
                                    style={{ msFilter: "" }}
                                    fill="currentColor"
                                    >
                                    <path d={data.svg}></path>
                                </svg>
                            </div>
                            <Paragraph>{data.title}</Paragraph>
                        </div>
                        <p className='text-sm mt-3 text-slate-400'>{data.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Hero