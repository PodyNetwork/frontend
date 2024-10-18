'use client'

import React from 'react'
import AuthLayout from '@/layouts/auth'
import Heading2 from '@/components/global/heading2'
import Paragraph from '@/components/global/paragraph'
import useSignup from './hooks/useSignup'
import { formOptions, useForm } from '@tanstack/react-form'
import ConnectOrComponent from '@/components/global/ConnectOrComponent'
import Link from 'next/link'

const formOpts = formOptions<{ username: string }>({
    defaultValues: {
        username: '',
    },
})

const Login = () => {

    const { signup, errorMessage } = useSignup();
    const form = useForm<{ username: string }>({
        ...formOpts,
        onSubmit: async ({ value }) => {
            await signup.mutateAsync(value);
        }
    })

    return (
        <main className="relative float-left w-full h-full overflow-hidden" aria-label="Homepage">
            <AuthLayout>
                <div className='max-w-72 flex-1'>
                    <div className='pb-4'>
                        <Heading2 className="font-bold text-slate-800">Hello!</Heading2>
                        <Paragraph className="text-slate-400 mt-2 text-base">Sign Up and start earning rewards</Paragraph>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        void form.handleSubmit()
                    }}>
                        <label htmlFor="username" className='sr-only'>Username</label>
                        <div className='relative'>
                            <form.Field
                                name="username"
                                validators={{
                                    onChange: ({ value }) => {
                                        if (!value) return 'Username is required';
                                        if (value.length > 15) return 'Username is too long';
                                        if (!/^[a-zA-Z]+$/.test(value)) return 'Invalid username';
                                        return undefined;
                                    }
                                }}
                                // eslint-disable-next-line react/no-children-prop
                                children={(field) => (
                                    <>
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
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                        </div>
                                        {field.state.meta.errors && <span className="text-red-500 text-sm mt-1">{field.state.meta.errors[0]}</span>}
                                    </>
                                )}
                            />
                        </div>
                        <div className='mt-3'>
                            <ConnectOrComponent>
                                <button
                                    type="submit"
                                    disabled={form.state.isSubmitting}
                                    className='p-3 bg-pody-dark_secondary w-full rounded-lg text-slate-200 text-sm hover:bg-pody-dark_secondary/90'
                                >
                                    {form.state.isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                        <svg aria-hidden="true" className="w-4 h-4 text-slate-200 animate-spin dark:text-slate-600 fill-pody-primary me-1.5" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                        <span>Registering...</span>
                                    </div>
                                    ) : (
                                        'Register'
                                    )}
                                </button>
                            </ConnectOrComponent>
                        </div>
                    </form>
                    {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage.message}</div>}
                    <div className='text-sm mt-2'><span>Minted pody passport?</span>{" "}<Link className='text-blue-500' href="/login">Login</Link></div>
                </div>
            </AuthLayout>
        </main>
    )
}

export default Login