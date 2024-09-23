import React from 'react'
import Heading1 from '../global/heading1'
import Paragraph from '../global/paragraph'
import Button from '../global/button'
import ButtonBorder from '../global/buttonborder'

const Hero = () => {
  return (
    <div className='relative w-full px-16'>
        <div className='max-w-4xl mx-auto _hero_wrapper flex flex-col'>
            <div className='max-w-2xl mx-auto flex flex-col gap-y-6'>
                <Heading1 className="text-center font-extrabold">Connect web3 <br /> meeting for everyone</Heading1>
                <Paragraph className="text-center">Connect, interact, and learn from any anywhere with EduVR - The Future of Education on Chain</Paragraph>
                <div className='flex flex-row justify-center gap-3 mt-4'>
                    <Button><span className='text-sm'>Sign Up</span></Button>
                    <ButtonBorder>Passport</ButtonBorder>
                </div>
            </div>
            <div className='text-white grid grid-cols-3'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate dignissimos quo omnis labore, obcaecati maxime minima autem dolorem maiores, rem quisquam amet corporis quos dolore eum itaque, nostrum adipisci ratione.
            </div>
        </div>
    </div>
  )
}

export default Hero