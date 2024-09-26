import Image from "next/image"
import userLogo from '/public/avatar/user.png'

const StreamSidebar = () => {
  return (
        <div className='min-w-16 max-w-16 hidden md:block py-5 flex-1 bg-[#F9FAFB] dark:bg-pody-dark h-full rounded-2xl relative float-left'>
            <div className='h-full flex flex-col justify-between items-center gap-3'>
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className='w-7 h-7 text-pody-dark_secondary'
                        viewBox="0 0 24 24"
                        style={{ msFilter: "" }}
                        fill="currentColor"
                        >
                        <path d="M6 3h2v2H6zm2 16h3v2H8zm8-16h2v2h-2zm-3 16h3v2h-3zm7-8V9h-2V7h-2V5h-2v2h-4V5H8v2H6v2H4v2H2v8h2v-4h2v4h2v-3h8v3h2v-4h2v4h2v-8zm-10 1H8V9h2zm6 0h-2V9h2z"></path>
                    </svg>
                </div>
                <div className='w-full'>
                    <ul className='flex flex-col items-center justify-center gap-y-6'>
                        <li className='w-full justify-center flex py-1'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className='w-6 h-6 text-slate-600'
                                viewBox="0 0 24 24"
                                style={{ msFilter: "" }}
                                fill="currentColor"
                                >
                                <path d="M5 22h14a2 2 0 0 0 2-2v-9a1 1 0 0 0-.29-.71l-8-8a1 1 0 0 0-1.41 0l-8 8A1 1 0 0 0 3 11v9a2 2 0 0 0 2 2zm5-2v-5h4v5zm-5-8.59 7-7 7 7V20h-3v-5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5H5z"></path>
                            </svg>
                        </li>
                        <li className='w-full justify-center flex py-1'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className='w-6 h-6 text-slate-600'
                                viewBox="0 0 24 24"
                                style={{ msFilter: "" }}
                                fill="currentColor"
                                >
                                <path d="M18 7c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-3.333L22 17V7l-4 3.333V7zm-1.998 10H4V7h12l.001 4.999L16 12l.001.001.001 4.999z"></path>
                            </svg>
                        </li>
                        <li className='w-full justify-center flex py-1'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className='w-6 h-6 text-slate-600'
                                viewBox="0 0 24 24"
                                style={{ msFilter: "" }}
                                fill="currentColor"
                                >
                                <circle cx="12.01" cy="12" r="2"></circle><path d="M11.01 22h2l.5-7h-3l.5 7z"></path><path d="M12 2a10 10 0 0 0-2.45 19.68l-.15-2.12a8 8 0 1 1 5.21 0l-.15 2.12A10 10 0 0 0 12 2z"></path><path d="M15.32 9.61a3.44 3.44 0 0 1 .37.68 3.83 3.83 0 0 1 .23.75 3.57 3.57 0 0 1 .09.8 3.66 3.66 0 0 1-.09.81 3.83 3.83 0 0 1-.23.75 3.44 3.44 0 0 1-.37.68 4.7 4.7 0 0 1-.35.43l-.19 2.62a5.33 5.33 0 0 0 .58-.31A5.86 5.86 0 0 0 17 15.2a5.57 5.57 0 0 0 .55-1 5.89 5.89 0 0 0 .35-1.13 6.06 6.06 0 0 0 .1-1.23 6.22 6.22 0 0 0-.13-1.21A6.09 6.09 0 0 0 17 8.49a6.29 6.29 0 0 0-.73-.89 5.67 5.67 0 0 0-.89-.73 6.3 6.3 0 0 0-1-.56A6.17 6.17 0 0 0 13.21 6a6.11 6.11 0 0 0-2.41 0 5.51 5.51 0 0 0-1.13.36 5.57 5.57 0 0 0-1 .55 5.67 5.67 0 0 0-.89.73 6.29 6.29 0 0 0-.78.85 6.09 6.09 0 0 0-.9 2.14 6.21 6.21 0 0 0-.1 1.21 6.06 6.06 0 0 0 .12 1.21 5.89 5.89 0 0 0 .35 1.13 5.57 5.57 0 0 0 .55 1 6.24 6.24 0 0 0 1.62 1.62 5.33 5.33 0 0 0 .58.31L9 14.51a4.7 4.7 0 0 1-.35-.43 3.44 3.44 0 0 1-.37-.68 3.83 3.83 0 0 1-.23-.75 3.65 3.65 0 0 1-.05-.81 3.56 3.56 0 0 1 .08-.8 3.83 3.83 0 0 1 .23-.75 3.44 3.44 0 0 1 .37-.68 4 4 0 0 1 .5-.61 3.87 3.87 0 0 1 .59-.48 3.44 3.44 0 0 1 .68-.37 3.86 3.86 0 0 1 .75-.24 4.36 4.36 0 0 1 1.61 0 3.86 3.86 0 0 1 .75.24 3.58 3.58 0 0 1 1.27.85 3.49 3.49 0 0 1 .49.61z"></path>
                            </svg>
                        </li>
                        <li className='w-full justify-center flex py-1'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className='w-6 h-6 text-slate-600'
                                viewBox="0 0 24 24"
                                style={{ msFilter: "" }}
                                fill="currentColor"
                                >
                                <path d="M20 3H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h4l-1.8 2.4 1.6 1.2 2.7-3.6h3l2.7 3.6 1.6-1.2L16 18h4c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 16V5h16l.001 11H4z"></path><path d="M6 12h4v2H6z"></path>
                            </svg>
                        </li>
                    </ul>
                </div>
                <div>
                    <Image src={userLogo} alt='user icon' className='w-8 h-8 object-contain' />
                </div>
            </div>
        </div>
  )
}

export default StreamSidebar