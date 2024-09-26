import React from 'react'
import FeaturesCard from './widgets/featuresCard'
import FeaturesHeader from './widgets/featuresHeader'

const FeaturesSection = () => {
  return (
    <section className='bg-pody-dark relative text-white py-32 px-8 md:px-16 min-h-screen flex flex-col justify-center' aria-label='features'>
       <div className='max-w-5xl mx-auto'>
        <FeaturesHeader />
        <FeaturesCard />
       </div>
    </section>
  )
}

export default FeaturesSection