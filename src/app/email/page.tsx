"use client";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Image from "next/image";
import logo from "/public/logo/pody logo dark.png";
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import useProfile from "@/hooks/user/useProfile";
import useSetEmail from "@/hooks/user/useSetEmail";

const Page = () => {
  const { profile, isLoading, isError } = useProfile();

  const [email, setEmail] = useState<string>("");
  const { setEmail: setEmailMutation, errorMessage, loading } = useSetEmail();

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await setEmailMutation.mutateAsync({ email });
    } catch (error) {
      console.error(error)
    }
  }, [email]);

  return (
    <main className="w-full relative" aria-label="set email">
      <div className="flex flex-col relative min-h-screen">
        <div className="flex flex-col items-center w-full bg-pody-secondary/5">
          <nav className="flex w-full items-center justify-between py-6 px-4 sm:px-12 gap-x-4 xl:max-w-[1300px]">
            <Link href="/">
              <Image src={logo} className="w-16 object-contain" alt="Pody" />
            </Link>
            <div className="flex flex-row items-center gap-x-2">
              <div className="w-7 h-7 rounded-full bg-black/20">
                <AvatarParticipant name={profile?.username || "unknown user"} />
              </div>
              {isLoading || isError ? (
                <div className="w-24 h-6 bg-slate-300 animate-pulse rounded"></div>
              ) : (
                <h3 className="text-sm text-slate-500">
                  Hello, {profile?.username}
                </h3>
              )}
            </div>
          </nav>
        </div>
        <section className="relative w-full flex-1 h-full flex items-center flex-col justify-center">
          <div className="w-full px-4 md:px-12">
            <div className="w-full xs:max-w-md bg-white p-7 rounded-lg flex-1 flex flex-col gap-y-2.5 __shadow_pody mx-auto relative">
              <h2 className="font-medium text-slate-700 text-xl">
                Set Your Email
              </h2>
              <p className="text-sm text-slate-500">
                A certified email address guarantees secure and authenticated
                communication with a digital signature.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mt-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-slate-600"
                  >
                    Email Address <sup className="text-red-500 font-bold">*</sup>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 -960 960 960"
                      >
                        <path d="M172.31-180Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21h615.38Q818-780 839-759q21 21 21 51.31v455.38Q860-222 839-201q-21 21-51.31 21H172.31ZM480-457.69 160-662.31v410q0 5.39 3.46 8.85t8.85 3.46h615.38q5.39 0 8.85-3.46t3.46-8.85v-410L480-457.69Zm0-62.31 313.85-200h-627.7L480-520ZM160-662.31V-720v467.69q0 5.39 3.46 8.85t8.85 3.46H160v-422.31Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      className="bg-slate-50 border border-slate-300 text-slate-500 text-base rounded-md outline-none block w-full ps-10 p-2.5"
                      placeholder="name@hello.com"
                    />
                  </div>
                </div>

                <div>
                  <button className="bg-pody-secondary relative py-2 px-6 text-sm text-white rounded-md mt-1 hover:opacity-80 hover:transition-all">
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage.message}</p>}
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;