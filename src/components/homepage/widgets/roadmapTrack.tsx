import React from 'react'

const RoadmapTrack = () => {
  return (
    <div className='grid md:grid-cols-4 relative'>
        <div className='flex flex-col relative'>
            <div className='flex flex-col'>
                <h2 className='text-lg font-bold ms-2'>Prototype</h2>
                <div className='absolute w-full mt-6'>
                    <div className='__ring_map w-10 h-10 rounded-full relative mt-2.5 flex items-center'>
                    </div>
                    <div className='__ring_line'></div>
                </div>
            </div>
            <div className='roadmap_list bg-tel-400 mt-[100px] w-11/12'>
                <ul className='text-sm flex flex-col gap-y-2 __list_ring_small'>
                    <li>Initial tests</li>
                    <li>Testnet</li>
                    <li>Point accumulation</li>
                    <li>Proof-of-concept</li>
                    <li>Core feature development</li>
                </ul>
            </div>
        </div>
        <div className='flex flex-col relative'>
            <div className='flex flex-col'>
                <h2 className='text-lg font-bold ms-2'>MVP</h2>
                <div className='absolute w-full mt-6'>
                    <div className='__ring_map __ring_map_extend  w-10 h-10 rounded-full relative mt-2.5 flex items-center'>
                    </div>
                    <div className='__ring_line'></div>
                </div>
            </div>
            <div className='roadmap_list bg-tel-400 mt-[100px] md:mt-[200px] w-11/12'>
                <ul className='text-sm flex flex-col gap-y-2 __list_ring_small'>
                    <li>Expanding user base</li>
                    <li>Adding enhanced functionalities</li>
                    <li>Refining the reward system.</li>
                </ul>
            </div>
        </div>
        <div className='flex flex-col relative'>
            <div className='flex flex-col'>
                <h2 className='text-lg font-bold ms-2'>Beta Test</h2>
                <div className='absolute w-full mt-6'>
                    <div className='__ring_map w-10 h-10 rounded-full relative mt-2.5 flex items-center'>
                    </div>
                    <div className='__ring_line'></div>
                </div>
            </div>
            <div className='roadmap_list bg-tel-400 mt-[100px] w-11/12'>
                <ul className='text-sm flex flex-col gap-y-2 __list_ring_small'>
                    <li>Beta release</li>
                    <li>Gathering user feedback</li>
                    <li>Optimizing the reward system</li>
                </ul>
            </div>
        </div>
        <div className='flex flex-col relative'>
            <div className='flex flex-col'>
                <h2 className='text-lg font-bold ms-2'>Full Launch</h2>
                <div className='absolute w-full mt-6'>
                    <div className='__ring_map __ring_map_extend w-10 h-10 rounded-full relative mt-2.5 flex items-center'>
                    </div>
                    <div className='__ring_line'></div>
                </div>
            </div>
            <div className='roadmap_list bg-tel-400 mt-[100px] md:mt-[200px] w-11/12'>
                <ul className='text-sm flex flex-col gap-y-2 __list_ring_small'>
                <li>Public launch with full features</li>
                    <li>Tokenomics system</li>
                    <li>New features integration</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default RoadmapTrack