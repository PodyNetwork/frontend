"use client"

import React from 'react'
import AuthLayout from '@/layouts/auth'
import Heading2 from '@/components/global/heading2'
import Paragraph from '@/components/global/paragraph'
import { useForm } from '@tanstack/react-form'
import useLogin from './hooks/useLogin'
import ConnectOrComponent from '@/components/global/ConnectOrComponent'

const Login = () => {

  const { login, errorMessage } = useLogin();
  const form = useForm<"">({
    onSubmit: async () => {
      await login.mutateAsync();
    }
  })

  return (
    <main className="relative float-left w-full h-full overflow-hidden" aria-label="Homepage">
      <AuthLayout>
        <div className='max-w-72 flex-1'>
          <div className='pb-8'>
            <Heading2 className="font-bold text-slate-800">Hello!</Heading2>
            <Paragraph className="text-slate-400 mt-2">Login to Get Started</Paragraph>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            void form.handleSubmit()
          }}>
            <ConnectOrComponent>
              <button
                className='p-3 bg-pody-dark_secondary w-full rounded-lg text-slate-200 text-sm mt-3 hover:bg-pody-dark_secondary/90'
                disabled={login.isPending}
              >
                {login.isPending ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-slate-200 rounded-full animate-spin"></div>
                    <span className="ml-2">Logging in...</span>
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </ConnectOrComponent>
            {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage.message}</div>}
          </form>
        </div>
      </AuthLayout>
    </main>
  )
}

export default Login