"use client";

import AuthLayout from "@/layouts/auth";
import useSignup from "./hooks/useSignup";
import { formOptions, useForm } from "@tanstack/react-form";
import ConnectOrComponent from "@/components/global/ConnectOrComponent";
import AuthHeader from "@/components/Auth/AuthHeader";
import { useNavigate } from "@/components/utils/PageRouter";
import Loader from "@/components/preloader/Loader";
import { useState, useEffect } from "react";
import Image from "next/image";
import LoginButton from "@/components/ocid/LoginButton";

const formOpts = formOptions<{ username: string; referralCode: string }>({
  defaultValues: {
    username: "",
    referralCode: "",
  },
});

const SignUp = () => {
  const { signup, errorMessage } = useSignup();
  const [referralCode, setReferralCode] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [flowType, setFlowType] = useState<"ocid" | "podyid" | null>(null);
  const [authButton, SetAuthButton] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const refParam = queryParams.get("ref");
    if (refParam) {
      setReferralCode(refParam);
    }
  }, []);

  const form = useForm<{ username: string; referralCode: string }>({
    ...formOpts,
    defaultValues: {
      username: "",
      referralCode: referralCode,
    },
    onSubmit: async ({ value }) => {
      await signup.mutateAsync(value);
    },
  });

  useEffect(() => {
    if (referralCode) {
      form.setFieldValue("referralCode", referralCode);
    }
  }, [referralCode, form]);

  const { handleClick, isPending } = useNavigate();

  const handleOCIDClick = () => {
    setFlowType("ocid");
  };

  const handleNewUserClick = () => {
    setFlowType("podyid");
    SetAuthButton(false);
  };

  const { authState, ocAuth } = useOCAuth();

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  if (authState.error) {
    return <div>Error: {authState.error.message}</div>;
  }

  if (authState.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main
      className="relative float-left w-full h-full overflow-hidden"
      aria-label="Homepage"
    >
      {isPending && <Loader />}
      <AuthLayout>
        <div className="w-full max-w-96 md:px-6 text-ceter">
          <AuthHeader />
          {authButton && (
            <div className="flex flex-col">
              <LoginButton />
              <div className="flex items-center my-4">
                <div className="w-full h-[.5px] bg-slate-300"></div>
                <span className="px-4 text-sm text-slate-500 font-semibold">
                  OR
                </span>
                <div className="w-full h-[.5px] bg-slate-300"></div>
              </div>
              <button
                onClick={handleNewUserClick}
                className="bg-pody-dark_secondary text-white text-sm rounded-md py-3"
              >
                Create a new Username
              </button>
            </div>
          )}
          {((flowType === "ocid" && isAuth) || flowType === "podyid") && (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  void form.handleSubmit();
                }}
              >
                <div className="relative">
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <form.Field
                    name="username"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value) return "Username is required";
                        if (value.length > 15) return "Username is too long";
                        if (!/^[a-zA-Z]+$/.test(value))
                          return "Invalid username";
                        return undefined;
                      },
                    }}
                  >
                    {(field) => (
                      <>
                        <div className="relative">
                          <label htmlFor="username" className="sr-only">
                            Username
                          </label>
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 text-slate-400"
                              viewBox="0 -960 960 960"
                              fill="currentColor"
                            >
                              <path d="M480-492.31q-57.75 0-98.87-41.12Q340-574.56 340-632.31q0-57.75 41.13-98.87 41.12-41.13 98.87-41.13 57.75 0 98.87 41.13Q620-690.06 620-632.31q0 57.75-41.13 98.88-41.12 41.12-98.87 41.12ZM180-187.69v-88.93q0-29.38 15.96-54.42 15.96-25.04 42.66-38.5 59.3-29.07 119.65-43.61 60.35-14.54 121.73-14.54t121.73 14.54q60.35 14.54 119.65 43.61 26.7 13.46 42.66 38.5Q780-306 780-276.62v88.93H180Zm60-60h480v-28.93q0-12.15-7.04-22.5-7.04-10.34-19.11-16.88-51.7-25.46-105.42-38.58Q534.7-367.69 480-367.69q-54.7 0-108.43 13.11-53.72 13.12-105.42 38.58-12.07 6.54-19.11 16.88-7.04 10.35-7.04 22.5v28.93Zm240-304.62q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 384.62Z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            aria-labelledby="username"
                            className="bg-slate-50 w-full p-3 ps-10 h-12 text-base border border-slate-200 rounded-lg text-slate-400 outline-none placeholder:text-slate-400"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        </div>
                        {field.state.meta.errors && (
                          <div className="text-red-500 text-xs mt-1">
                            {field.state.meta.errors[0]}
                          </div>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>

                {/* Referral Code field */}
                <div className="relative mt-3">
                  <label htmlFor="referralCode" className="sr-only">
                    Referral Code
                  </label>
                  <form.Field name="referralCode">
                    {(field) => (
                      <>
                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 text-slate-400"
                              viewBox="0 -960 960 960"
                              fill="currentColor"
                            >
                              <path d="M432.31-298.46H281.54q-75.34 0-128.44-53.1Q100-404.65 100-479.98q0-75.33 53.1-128.44 53.1-53.12 128.44-53.12h150.77v60H281.54q-50.39 0-85.96 35.58Q160-530.38 160-480q0 50.38 35.58 85.96 35.57 35.58 85.96 35.58h150.77v60ZM330-450v-60h300v60H330Zm197.69 151.54v-60h150.77q50.39 0 85.96-35.58Q800-429.62 800-480q0-50.38-35.58-85.96-35.57-35.58-85.96-35.58H527.69v-60h150.77q75.34 0 128.44 53.1Q860-555.35 860-480.02q0 75.33-53.1 128.44-53.1 53.12-128.44 53.12H527.69Z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="referralCode"
                            placeholder="Referral ID"
                            aria-labelledby="referralCode"
                            value={field.state.value || referralCode}
                            onChange={(e) => field.handleChange(e.target.value)}
                            readOnly={!!referralCode}
                            className="bg-slate-50 w-full p-3 ps-10 h-12 text-base border border-slate-200 rounded-lg text-slate-400 outline-none placeholder:text-slate-400"
                          />
                        </div>
                      </>
                    )}
                  </form.Field>
                </div>

                <div className="mt-3">
                  <ConnectOrComponent>
                    <button
                      type="submit"
                      disabled={form.state.isSubmitting}
                      className="p-3 h-12 bg-pody-dark_secondary w-full rounded-lg text-slate-200 text-sm hover:bg-pody-dark_secondary/90"
                    >
                      {form.state.isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg
                            aria-hidden="true"
                            className="w-4 h-4 text-slate-200 animate-spin dark:text-slate-600 fill-pody-primary me-1.5"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span>Minting...</span>
                        </div>
                      ) : (
                        "Mint Passport"
                      )}
                    </button>
                  </ConnectOrComponent>
                </div>
              </form>
            </div>
          )}
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2 text-left">
              {errorMessage.message}
            </div>
          )}
          <div className="text-sm mt-4 text-slate-500">
            <div>
              <span>Minted pody passport?</span>{" "}
              <button
                className="text-blue-500"
                onClick={() => handleClick("/login")}
              >
                Login
              </button>
            </div>
            {/* <div>
              <span>Trouble minting your passport?</span>{" "}
              <button
                className="text-blue-500"
                onClick={() => handleClick("/help/mintpassport")}
              >
                Help!
              </button>
            </div> */}
          </div>
          <p className="text-xs mt-6 text-slate-500">
            By minting a Pody Passport, you agree to Pody Network{" "}
            <button
              className="text-blue-500"
              onClick={() => handleClick("/terms")}
            >
              Terms
            </button>
            ,{" "}
            <button
              className="text-blue-500"
              onClick={() => handleClick("/privacy")}
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </AuthLayout>
    </main>
  );
};

export default SignUp;
