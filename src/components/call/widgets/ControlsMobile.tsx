import React from 'react'

const ControlsMobile = () => {
  return (
    <div className='md:hidden block absolute z-30 bottom-0 bg-[#F9FAFB] dark:bg-pody-dark shadow-2xl shadow-slate-900 dark:shadow-slate-600 border-t border-pody-gray/20 w-full py-2 px-7 text-sm'>
        <div className='text-slate-500 flex flex-row items-center gap-x-6 justify-center'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className='w-6 h-6'
                viewBox="0 0 24 24"
                style={{ msFilter: "" }}
                fill="currentColor"
                >
                <path d="M18 7c0-1.103-.897-2-2-2H6.414L3.707 2.293 2.293 3.707l18 18 1.414-1.414L18 16.586v-2.919L22 17V7l-4 3.333V7zm-2 7.586L8.414 7H16v7.586zM4 19h10.879l-2-2H4V8.121L2.145 6.265A1.977 1.977 0 0 0 2 7v10c0 1.103.897 2 2 2z"></path>
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className='w-6 h-6'
                viewBox="0 0 24 24"
                style={{ msFilter: "" }}
                fill="currentColor"
                >
                <path d="M20 3H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h7v3H8v2h8v-2h-3v-3h7c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 15V5h16l.001 10H4z"></path><path d="m10 13 5-3-5-3z"></path>
            </svg>
            <div className='w-12 h-12 rounded-full flex justify-center items-center text-white bg-pody-primary relative'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className='w-6 h-6'
                    viewBox="0 0 24 24"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                    >
                    <path d="M16 12V6c0-2.217-1.785-4.021-3.979-4.021a.933.933 0 0 0-.209.025A4.006 4.006 0 0 0 8 6v6c0 2.206 1.794 4 4 4s4-1.794 4-4zm-6 0V6c0-1.103.897-2 2-2a.89.89 0 0 0 .163-.015C13.188 4.06 14 4.935 14 6v6c0 1.103-.897 2-2 2s-2-.897-2-2z"></path><path d="M6 12H4c0 4.072 3.061 7.436 7 7.931V22h2v-2.069c3.939-.495 7-3.858 7-7.931h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6z"></path>
                </svg>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className='w-6 h-6'
                viewBox="0 0 24 24"
                style={{ msFilter: "" }}
                fill="currentColor"
                >
                <path d="M11 7.05V4a1 1 0 0 0-1-1 1 1 0 0 0-.7.29l-7 7a1 1 0 0 0 0 1.42l7 7A1 1 0 0 0 11 18v-3.1h.85a10.89 10.89 0 0 1 8.36 3.72 1 1 0 0 0 1.11.35A1 1 0 0 0 22 18c0-9.12-8.08-10.68-11-10.95zm.85 5.83a14.74 14.74 0 0 0-2 .13A1 1 0 0 0 9 14v1.59L4.42 11 9 6.41V8a1 1 0 0 0 1 1c.91 0 8.11.2 9.67 6.43a13.07 13.07 0 0 0-7.82-2.55z"></path>
            </svg>
            <button className='px-3 bg-pody-primary rounded-full text-white flex flex-row items-center py-1'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className='w-6 h-6 me-1.5'
                    viewBox="0 0 24 24"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                    >
                    <path d="M16 2H8C4.691 2 2 4.691 2 8v12a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 13c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v7z"></path><circle cx="9.5" cy="11.5" r="1.5"></circle><circle cx="14.5" cy="11.5" r="1.5"></circle>
                </svg>
                <span>8</span>
            </button>
        </div>
    </div>
  )
}

export default ControlsMobile