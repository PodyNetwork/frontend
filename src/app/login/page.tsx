import React from 'react'
import AuthLayout from '@/layouts/auth'
import Heading2 from '@/components/global/heading2'
import Paragraph from '@/components/global/paragraph'

const Signup = () => {
  return (
    <main className="relative float-left w-full h-full overflow-hidden" aria-label="Homepage">
      <AuthLayout>
        <div className='max-w-72 flex-1'>
          <div className='pb-8'>
            <Heading2 className="font-bold text-slate-800">Hello!</Heading2>
            <Paragraph className="text-slate-400 mt-2">Sign Up to Get Started</Paragraph>
          </div>
          <label htmlFor="username" className='sr-only'></label>
          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className='w-5 h-5 text-slate-400'
                viewBox="0 0 24 24"
                style={{ msFilter: "" }}
                fill="currentColor"
              >
                <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
              </svg>
            </div>
            <input
              type="text"
              id='username'
              placeholder='username'
              aria-labelledby='username'
              className='bg-slate-50 w-full p-3 ps-10 text-base border border-slate-200 rounded-lg text-slate-400 outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent focus:transition-all focus:duration-100 placeholder:text-slate-400'
            />
          </div>
          <button
            className='p-3 bg-pody-dark_secondary w-full rounded-lg text-slate-200 text-sm mt-3 hover:bg-pody-dark_secondary/90'
          >
            Register
          </button>
        </div>
      </AuthLayout>
    </main>
  )
}

export default Signup