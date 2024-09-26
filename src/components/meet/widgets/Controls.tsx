import React from 'react'

const Controls = () => {
  return (
    <div className='hidden mt-auto h-10 md:flex flex-wrap justify-center items-center gap-x-4 text-sm' aria-label='controls'>
        <div className='bg-pody-danger h-10 w-10 rounded-full flex justify-center items-center text-slate-100'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className='w-5 h-5'
                viewBox="0 0 24 24"
                style={{ msFilter: "" }}
                fill="currentColor"
                >
                <path d="M18 7c0-1.103-.897-2-2-2H6.414L3.707 2.293 2.293 3.707l18 18 1.414-1.414L18 16.586v-2.919L22 17V7l-4 3.333V7zm-2 7.586L8.414 7H16v7.586zM4 19h10.879l-2-2H4V8.121L2.145 6.265A1.977 1.977 0 0 0 2 7v10c0 1.103.897 2 2 2z"></path>
            </svg>
        </div>
        <div className='bg-white h-10 w-10 rounded-full flex justify-center items-center text-slate-400'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className='w-5 h-5'
                viewBox="0 0 24 24"
                style={{ msFilter: "" }}
                fill="currentColor"
                >
                <path d="M16 12V6c0-2.217-1.785-4.021-3.979-4.021a.933.933 0 0 0-.209.025A4.006 4.006 0 0 0 8 6v6c0 2.206 1.794 4 4 4s4-1.794 4-4zm-6 0V6c0-1.103.897-2 2-2a.89.89 0 0 0 .163-.015C13.188 4.06 14 4.935 14 6v6c0 1.103-.897 2-2 2s-2-.897-2-2z"></path><path d="M6 12H4c0 4.072 3.061 7.436 7 7.931V22h2v-2.069c3.939-.495 7-3.858 7-7.931h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6z"></path>
            </svg>
        </div>
        {/* <div className='bg-pody-danger h-10 px-3.5 rounded-full flex justify-center items-center text-slate-100'>
            <span>Leave meeting</span>
        </div> */}
        <div className='bg-white h-10 w-10 rounded-full flex justify-center items-center text-slate-400'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className='w-5 h-5'
                viewBox="0 0 24 24"
                style={{ msFilter: "" }}
                fill="currentColor"
                >
                <path d="M20 3H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h7v3H8v2h8v-2h-3v-3h7c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 15V5h16l.001 10H4z"></path><path d="m10 13 5-3-5-3z"></path>
            </svg>
        </div>
        <div className='bg-white h-10 w-10 rounded-full flex justify-center items-center text-slate-400'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className='w-5 h-5'
                viewBox="0 0 24 24"
                style={{ msFilter: "" }}
                fill="currentColor"
                >
                <path d="M6 10v4c0 1.103.897 2 2 2h3v-2H8v-4h3V8H8c-1.103 0-2 .897-2 2zm7 0v4c0 1.103.897 2 2 2h3v-2h-3v-4h3V8h-3c-1.103 0-2 .897-2 2z"></path><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 18V6h16l.002 12H4z"></path>
            </svg>
        </div>
    </div>
  )
}

export default Controls