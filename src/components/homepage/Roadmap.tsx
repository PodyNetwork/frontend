import React from 'react'
import RoadmapHeader from './widgets/roadmapHeader'
import RoadmapTrack from './widgets/roadmapTrack'

const Roadmap = () => {
  return (
    <section id='roadmap' className='bg-pody-dark relative text-white py-28 px-5 md:px-16 flex flex-col justify-center' aria-label='roadmapo'>
        <div>
            <div className='max-w-5xl 2xl:max-w-7xl mx-auto'>
                <RoadmapHeader />
                <RoadmapTrack />
            </div>
        </div>
    </section>
  )
}

export default Roadmap