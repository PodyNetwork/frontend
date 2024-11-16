"use client";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Image from "next/image";
import logo from "/public/logo/pody logo dark.png";
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import useProfile from "@/hooks/user/useProfile";
import useEmailVerification from "@/hooks/user/useEmailVerification";

const Page = () => {
  const { profile, isLoading, isError } = useProfile();

  const [otp, setOtp] = useState<string>("");
  const { verifyEmail: verifyOtpMutation, errorMessage, loading } = useEmailVerification();

  const handleOtpChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await verifyOtpMutation.mutateAsync({ otp });
    } catch (error) {
      console.error(error)
    }
  }, [otp, verifyOtpMutation]);

  return (
    <main className="w-full relative" aria-label="verify otp">
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
                Verify Your OTP
              </h2>
              <p className="text-sm text-slate-500">
                Enter the OTP sent to your email to verify your account.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mt-2">
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-sm font-medium text-slate-600"
                  >
                    OTP <sup className="text-red-500 font-bold">*</sup>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={handleOtpChange}
                      className="bg-slate-50 border border-slate-300 text-slate-500 text-base rounded-md outline-none block w-full p-2.5"
                      placeholder="Enter OTP"
                    />
                  </div>
                </div>

                <div>
                  <button className="bg-pody-secondary relative py-2 px-6 text-sm text-white rounded-md mt-1 hover:opacity-80 hover:transition-all">
                    {loading ? 'Verifying...' : 'Verify'}
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
