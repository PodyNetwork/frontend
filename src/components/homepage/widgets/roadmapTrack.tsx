import React from 'react'

const RoadmapTrack = () => {
  return (
    <div className='grid md:grid-cols-4 relative'>
       
        <div className='flex flex-col relative'>
            <div className='flex flex-col pt-3'>
                <h2 className='text-lg font-bold ms-2'>MVP</h2>
                <div className='absolute w-full mt-6'>
                    <div className='__ring_map __ring_map_extend  w-10 h-10 rounded-full relative mt-2.5 flex items-center'>
                    </div>
                    <div className='__ring_line'></div>
                </div>
            </div>
            <div className='roadmap_list bg-tel-400 mt-[100px] md:mt-[200px] w-11/12'>
                <ul className='text-sm flex flex-col gap-y-2 __list_ring_small'>
                    <li>Develop initial prototype</li>
                    <li>System improvements</li>
                </ul>
            </div>
        </div>
        <div className='flex flex-col relative'>
            <div className='flex flex-col pt-3'>
                <h2 className='text-lg font-bold ms-2'>Testnet</h2>
                <div className='absolute w-full mt-6'>
                    <div className='__ring_map w-10 h-10 rounded-full relative mt-2.5 flex items-center'>
                    </div>
                    <div className='__ring_line'></div>
                </div>
            </div>
            <div className='roadmap_list bg-tel-400 mt-[100px] w-11/12'>
                <ul className='text-sm flex flex-col gap-y-2 __list_ring_small'>
                    <li>Deploy Beta version</li>
                    <li>System Auditing</li>
                </ul>
            </div>
        </div>
        <div className='flex flex-col relative'>
            <div className='flex flex-col pt-3'>
                <h2 className='text-lg font-bold ms-2'>Mainnet</h2>
                <div className='absolute w-full mt-6'>
                    <div className='__ring_map __ring_map_extend w-10 h-10 rounded-full relative mt-2.5 flex items-center'>
                    </div>
                    <div className='__ring_line'></div>
                </div>
            </div>
            <div className='roadmap_list bg-tel-400 mt-[100px] md:mt-[200px] w-11/12'>
                <ul className='text-sm flex flex-col gap-y-2 __list_ring_small'>
                    <li>Deploy on Mainnet</li>
                    <li>Tokenomics and Token Auditing</li>
                </ul>
            </div>
        </div>
        <div className='flex flex-col relative'>
            <div className='flex flex-col pt-3'>
                <h2 className='text-lg font-bold ms-2'>Reward Distribution</h2>
                <div className='absolute w-full mt-6'>
                    <div className='__ring_map w-10 h-10 rounded-full relative mt-2.5 flex items-center'>
                    </div>
                    <div className='__ring_line'></div>
                </div>
            </div>
            <div className='roadmap_list bg-tel-400 mt-[100px] w-11/12'>
                <ul className='text-sm flex flex-col gap-y-2 __list_ring_small'>
                    <li>Reward Allocation</li>
                    <li>Reward Distribution</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default RoadmapTrack