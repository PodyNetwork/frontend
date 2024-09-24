import React from 'react'
import RoadmapHeader from './widgets/roadmapHeader'
import RoadmapTrack from './widgets/roadmapTrack'

const Roadmap = () => {
  return (
    <section className='bg-pody-dark relative text-white py-32 min-h-screen flex flex-col justify-center'>
        <div>
            <div className='max-w-5xl mx-auto'>
                <RoadmapHeader />
                <RoadmapTrack />
            </div>
        </div>
    </section>
  )
}

export default Roadmap