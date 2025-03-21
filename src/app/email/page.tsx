"use client";
import Link from "next/link";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import useProfile from "@/hooks/user/useProfile";
import useSetEmail from "@/hooks/user/useSetEmail";
import { HeaderNavEmain } from "@/components/email/HeaderNav";

const Page = () => {
  const { profile } = useProfile();

  const [email, setEmail] = useState<string>("");
  const { setEmail: setEmailMutation, errorMessage, loading } = useSetEmail();

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await setEmailMutation.mutateAsync({ email });
      } catch (error) {
        console.error(error);
      }
    },
    [email, setEmailMutation]
  );

  return (
    <main className="w-full relative" aria-label="set email">
      <div className="flex flex-col relative min-h-screen">
        <HeaderNavEmain />
        <section className="relative w-full flex-1 h-full flex items-center flex-col justify-center">
          <div className="w-full px-4 md:px-12">
            <div className="w-full xs:max-w-md bg-white p-9 rounded-lg flex-1 flex flex-col gap-y-2.5 __shadow_pody mx-auto relative">
              <h2 className="font-medium text-slate-700 text-xl">
                Set Your Email
              </h2>
              <p className="text-sm text-slate-500">
                Don&apos;t miss out on 10,000 bonus points! Verify your email now to secure your rewards and unlock exclusive benefits.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mt-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-slate-600"
                  >
                    Email Address{" "}
                    <sup className="text-red-500 font-bold">*</sup>
                  </label>
                  <div className="flex flex-row gap-2">
                    <div className="relative flex-1">
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
                        disabled={!profile?.walletAddress}
                        onChange={handleEmailChange}
                        className="bg-slate-50 border h-11 border-slate-300 text-slate-500 text-base rounded-md outline-none block w-full ps-10 p-2.5"
                        placeholder="name@hello.com"
                      />
                    </div>
                  </div>
                  {profile?.walletAddress ? <button className="bg-pody-dark relative py-2 px-6 h-11 w-full mt-3 text-sm text-white rounded-md hover:opacity-80 hover:transition-all">
                      {loading ? "Submitting..." : "Submit"}
                    </button> : <Link href={'/signup'}><button className="bg-pody-dark relative py-2 px-6 h-11 w-full mt-3 text-sm text-white rounded-md hover:opacity-80 hover:transition-all">Signup to Verify</button></Link>}
                </div>
                {errorMessage && (
                  <p className="text-sm mt-2 text-pody-danger font-medium">{errorMessage.message}</p>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
