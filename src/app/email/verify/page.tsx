"use client";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import useEmailVerification from "@/hooks/user/useEmailVerification";
import { HeaderNavEmain } from "@/components/email/HeaderNav";

const Page = () => {
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
        <HeaderNavEmain />
        <section className="relative w-full flex-1 h-full flex items-center flex-col justify-center">
          <div className="w-full px-4 md:px-12">
            <div className="w-full xs:max-w-md bg-white p-9 rounded-lg flex-1 flex flex-col gap-y-2.5 __shadow_pody mx-auto relative">
              <h2 className="font-medium text-slate-700 text-xl">
                Verify Your OTP
              </h2>
              <p className="text-sm text-slate-500">
                Please enter the one-time password (OTP) sent to your email to verify your account.
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
                  <button className="bg-pody-dark relative py-2 px-6 h-11 w-full mt-3 text-sm text-white rounded-md hover:opacity-80 hover:transition-all">
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
