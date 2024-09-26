import React from 'react'
import participantList from "../../meet/data/participant.json"
import Image from 'next/image'

const Participant = () => {
  return (
    <div className='w-full md:h-[calc(100%-300px)] md:overflow-y-auto'>
        <div className='hidden md:flex flex-row justify-between mb-3.5'>
            <h3 className='text-base'><span className='font-semibold text-slate-600 dark:text-slate-400'>Participant</span> {" "} <span className='text-slate-500'>(3)</span></h3>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className='w-5 h-5 text-slate-500'
                viewBox="0 0 24 24"
                style={{ msFilter: "" }}
                fill="currentColor"
                >
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
        </div>
        <div className='grid grid-cols-4 gap-2.5 md:gap-0 md:flex flex-row flex-wrap md:flex-col relative __participant_list'>
            {participantList.map((data, index) => (
                <div className='md:flex flex-row justify-between md:gap-x-2 py-0 md:py-2 text-sm text-slate-500' key={index}>
                    <div className='flex md:flex-row flex-col items-center'>
                        <Image src={data.avatar} alt='user icon' width={200} height={200} className='w-[70px] h-[70px] md:w-7 md:h-7 object-cover rounded-full' />
                        <div className='md:ms-2.5 flex flex-col items-center text-sm'>
                            <p><span className='leading-none font-semibold'>{data.name}</span></p>
                            {data.host && <p className='block md:hidden text-xs text-slate-300 leading-none'><span>Host</span></p>}
                        </div>
                    </div>
                    <div className='hidden md:flex flex-row items-center gap-x-2.5'>
                        {data.host && <p className='hidden md:block text-xs'><span>Host</span></p>}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className='w-5 h-5'
                            viewBox="0 0 24 24"
                            style={{ msFilter: "" }}
                            fill="currentColor"
                            >
                            <path d="M16 12V6c0-2.217-1.785-4.021-3.979-4.021a.933.933 0 0 0-.209.025A4.006 4.006 0 0 0 8 6v6c0 2.206 1.794 4 4 4s4-1.794 4-4zm-6 0V6c0-1.103.897-2 2-2a.89.89 0 0 0 .163-.015C13.188 4.06 14 4.935 14 6v6c0 1.103-.897 2-2 2s-2-.897-2-2z"></path><path d="M6 12H4c0 4.072 3.061 7.436 7 7.931V22h2v-2.069c3.939-.495 7-3.858 7-7.931h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6z"></path>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className='w-5 h-5'
                            viewBox="0 0 24 24"
                            style={{ msFilter: "" }}
                            fill="currentColor"
                            >
                            <path d="M18 7c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-3.333L22 17V7l-4 3.333V7zm-1.998 10H4V7h12l.001 4.999L16 12l.001.001.001 4.999z"></path>
                        </svg>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Participant