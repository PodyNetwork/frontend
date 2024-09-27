import React from 'react'

export default function Page() {
  return (
    <main className="w-[calc(100%-15rem)] ml-60 bg-white">
        <div className='w-full pl-4 pr-1.5 flex flex-col gap-y-6'>
            <div className='flex flex-col mt-4'>
                <header className='ml-auto'>
                    <ul className='flex flex-row items-s items-stretch text-sm text-slate-500 __dashheader_icon_info'>
                        <li>100H/s</li>
                        <li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className='w-4 h-4'
                                viewBox="0 0 24 24"
                                style={{ msFilter: "" }}
                                fill="currentColor"
                                >
                                <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                            </svg>
                        </li>
                        <li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className='w-4 h-4'
                                viewBox="0 0 24 24"
                                style={{ msFilter: "" }}
                                fill="currentColor"
                                >
                                <path d="M16 2H8C4.691 2 2 4.691 2 8v12a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 13c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v7z"></path><circle cx="9.5" cy="11.5" r="1.5"></circle><circle cx="14.5" cy="11.5" r="1.5"></circle>
                            </svg>
                        </li>
                        <li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className='w-4 h-4'
                                viewBox="0 0 24 24"
                                style={{ msFilter: "" }}
                                fill="currentColor"
                                >
                                <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z"></path>
                            </svg>
                        </li>
                    </ul>
                </header>
            </div>
            <div className='flex flex-row gap-x-5'>
                <div className='w-8/12 rounded-xl __shadow_pody bg-white relative overflow-hidden'>
                    <div className='_dashgrad_card'></div>
                    <div className='w-full p-7 flex flex-col gap-y-8 h-full'>
                        <div className='relative flex flex-col'>
                            <h2 className='text-base text-slate-400'>Dashboard Overview</h2>
                            <h1 className='text-3xl font-bold text-slate-700'>Hello 0x3ax.</h1>
                        </div>
                        <div className='grid grid-cols-2 mt-auto gap-x-6'>
                            <div className='relative z-50 flex justify-center'>
                                <div className='__card_small_dashboard z-10'></div>
                                <div className='bg-slate-50 p-4 rounded-lg w-full z-50'>
                                    <div className='w-6 h-6 bg-slate-400/20 rounded-full flex justify-center items-center mb-2.5'>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className='w-4 h-4 text-slate-400'
                                            viewBox="0 0 24 24"
                                            style={{ msFilter: "" }}
                                            fill="currentColor"
                                            >
                                            <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path><path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
                                        </svg>
                                    </div>
                                    <h2 className='text-xs text-slate-400'>TOTAL MEETING</h2>
                                    <p className='text-3xl font-semibold text-slate-700'>99</p>
                                </div>
                            </div>
                            <div className='relative z-50 flex justify-center'>
                                <div className='__card_small_dashboard z-10'></div>
                                <div className='bg-slate-50 p-4 rounded-lg w-full z-50'>
                                    <div className='w-6 h-6 bg-slate-400/20 rounded-full flex justify-center items-center mb-2.5'>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className='w-4 h-4 text-slate-400'
                                            viewBox="0 0 24 24"
                                            style={{ msFilter: "" }}
                                            fill="currentColor"
                                            >
                                            <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path><path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
                                        </svg>
                                    </div>
                                    <h2 className='text-xs text-slate-400'>ACTIVE MEETING</h2>
                                    <p className='text-3xl font-semibold text-slate-700'>33</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-4/12 rounded-xl __shadow_pody bg-white relative overflow-hidden'>
                    <div className='max-w-xs p-7 mx-auto text-center flex flex-col gap-y-2.5'>
                        <h3 className='text-base text-slate-700 font-medium'>Mining HashRate</h3>
                        <div>
                            <div></div>
                            <div>75%</div>
                        </div>
                        <h2 className='text-lg font-bold'>1020H/s</h2>
                        <p className='text-sm'>You reached 1020H/s from 80H/s</p>
                        <button>Show my Points</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}
