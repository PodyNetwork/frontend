import React from 'react'
import Heading2 from '../global/heading2'
import Button from '../global/button'
import ButtonBorder from '../global/buttonborder'

const Cta = () => {
  return (
    <section className='bg-pody-dark relative text-white py-32 minh-screen flex flex-col justify-center bg-re300' aria-label='cta'>
        <div>
            <div className='max-w-5xl mx-auto'>
                <div className="_radial_container relative z-10">
                    <div className="_radial_bg_cta"></div>
                </div>
                <div className='w-full px-7 py-20 bg-teal-100 rounded-xl __cta_wrapper z-50 relative'>
                    <Heading2 className="text-center font-bold">
                        Sounds very impresive, right? <br /> We know. Join our journey 
                    </Heading2>
                    <div className='flex flex-row justify-center gap-3 mt-8'>
                        <Button><span className='text-sm'>Create Meeting</span></Button>
                        <ButtonBorder>Join Meeting</ButtonBorder>
                    </div>
                </div>  
            </div>
        </div>
    </section>
  )
}

export default Cta