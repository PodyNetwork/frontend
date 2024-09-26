import React from 'react'
import RoadmapHeader from './widgets/roadmapHeader'
import RoadmapTrack from './widgets/roadmapTrack'

const Roadmap = () => {
  return (
    <section className='bg-pody-dark relative text-white py-32 px-8 md:px-16 min-h-screen flex flex-col justify-center' aria-label='roadmapo'>
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