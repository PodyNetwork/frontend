import React from 'react'

const RoadmapTrack = () => {
  return (
    <div className='grid md:grid-cols-4 relative'>
        <div className='flex flex-col relative'>
            <div className='flex flex-col'>
                <h2 className='text-xl font-bold ms-2'>Q1</h2>
                <div className='absolute w-full mt-6'>
                    <div className='__ring_map w-10 h-10 rounded-full relative mt-2.5 flex items-center'>
                    </div>
                    <div className='__ring_line'></div>
                </div>
            </div>
            <div className='roadmap_list bg-tel-400 mt-[100px] w-11/12'>
                <ul className='text-sm flex flex-col gap-y-2 __list_ring_small'>
                    <li>Lauch project websitey</li>
                    <li>Release whitepaper</li>
                    <li>initial social media presence</li>
                </ul>
            </div>
        </div>
        <div className='flex flex-col relative'>
            <div className='flex flex-col'>
                <h2 className='text-xl font-bold ms-2'>Q2</h2>
                <div className='absolute w-full mt-6'>
                    <div className='__ring_map __ring_map_extend  w-10 h-10 rounded-full relative mt-2.5 flex items-center'>
                    </div>
                    <div className='__ring_line'></div>
                </div>
            </div>
            <div className='roadmap_list bg-tel-400 mt-[100px] md:mt-[200px] w-11/12'>
                <ul className='text-sm flex flex-col gap-y-2 __list_ring_small'>
                    <li>Full platform launch</li>
                    <li>List token on major exchanges</li>
                    <li>Implement staking and rewards program</li>
                </ul>
            </div>
        </div>
        <div className='flex flex-col relative'>
            <div className='flex flex-col'>
                <h2 className='text-xl font-bold ms-2'>Q3</h2>
                <div className='absolute w-full mt-6'>
                    <div className='__ring_map w-10 h-10 rounded-full relative mt-2.5 flex items-center'>
                    </div>
                    <div className='__ring_line'></div>
                </div>
            </div>
            <div className='roadmap_list bg-tel-400 mt-[100px] w-11/12'>
                <ul className='text-sm flex flex-col gap-y-2 __list_ring_small'>
                    <li>Introduce new features</li>
                    <li>Conduct security audits</li>
                    <li>Expand team & advisors</li>
                    <li>Explore additional partnerships</li>
                </ul>
            </div>
        </div>
        <div className='flex flex-col relative'>
            <div className='flex flex-col'>
                <h2 className='text-xl font-bold ms-2'>Q4</h2>
                <div className='absolute w-full mt-6'>
                    <div className='__ring_map __ring_map_extend w-10 h-10 rounded-full relative mt-2.5 flex items-center'>
                    </div>
                    <div className='__ring_line'></div>
                </div>
            </div>
            <div className='roadmap_list bg-tel-400 mt-[100px] md:mt-[200px] w-11/12'>
                <ul className='text-sm flex flex-col gap-y-2 __list_ring_small'>
                    <li>Launch mobile app version</li>
                    <li>Integrate additional blockchains</li>
                    <li>Host developer and community events</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default RoadmapTrack