import React from 'react'
import Heading2 from '../global/heading2'
import ButtonPody from '../global/button'
import ButtonBorder from '../global/buttonborder'

const Cta = () => {
  return (
    <section className='bg-pody-dark relative text-white py-32 px-8 md:px-16 flex flex-col justify-center overflow-hidden' aria-label='cta'>
        <div>
            <div className='max-w-5xl 2xl:max-w-7xl mx-auto'>
                <div className='w-full px-7 py-20 rounded-xl __cta_wrapper z-50 relative'>
                    <Heading2 className="text-center font-bold">
                        Experience a new way of having <br /> virtual classrooms. 
                    </Heading2>
                    <div className='flex flex-row flex-wrap justify-center gap-3 mt-8 text-sm'>
                        <ButtonPody><span>Create Classroom</span></ButtonPody>
                        <ButtonBorder>Join Classroom</ButtonBorder>
                    </div>
                </div>  
            </div>
        </div>
    </section>
  )
}

export default Cta