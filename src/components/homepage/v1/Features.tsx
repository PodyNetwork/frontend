import React from 'react'
import FeaturesCard from './widgets/featuresCard'
import FeaturesHeader from './widgets/featuresHeader'

const FeaturesSection = () => {
  return (
    <section id="features" className='bg-pody-dark relative text-white py-28 px-5 md:px-16 flex flex-col justify-center' aria-label='features'>
       <div className='max-w-5xl 2xl:max-w-7xl mx-auto'>
        <FeaturesHeader />
        <FeaturesCard />
       </div>
    </section>
  )
}

export default FeaturesSection